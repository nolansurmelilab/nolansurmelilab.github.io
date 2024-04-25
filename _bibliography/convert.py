
import bibtexparser
import requests
from bibtexparser.bwriter import BibTexWriter


def get_publication_date(doi):
    url = f"https://api.crossref.org/works/{doi}"
    response = requests.get(url)
    data = response.json()
    return data['message']['published']['date-parts'][0]


def add_field_if_author_in_entry(bibtex_path, pis):
    with open(bibtex_path) as bibtex_file:
        bib_database = bibtexparser.load(bibtex_file)
    for entry in bib_database.entries:
        if 'abbr' not in entry and 'author' in entry:
            entry["abbr"] = "<br>x<br>".join(
                [pi_label for pi, pi_label in pis.items() if pi in entry['author']])

        if 'doi' in entry:
            if entry['doi'].startswith('http'):
                entry['website'] = entry['doi']
            else:
                entry['website'] = f"https://doi.org/{entry['doi']}"

        if 'journal' in entry and entry['journal'].isupper():
            entry['journal'] = entry['journal'].title()

        if 'type' in entry:
            entry.pop('type')

        pub_date = get_publication_date(
            entry["doi"].replace("https://doi.org/", ""))
        entry["year"] = str(pub_date[0])
        if len(pub_date) > 1:
            entry["month"] = str(pub_date[1])

    class CustomBibTexWriter(BibTexWriter):
        def write(self, bib_database):
            """Write the `BibDatabase` object as a string in the BibTeX file format."""
            bibtex = ''
            for entry in bib_database.entries:
                bibtex += self._entry_to_bibtex(entry)
            return bibtex

    from datetime import datetime

    # Sort the entries by date
    sorted_entries = sorted(
        bib_database.entries,
        key=lambda entry: datetime.strptime(
            entry['year'] + ' ' + entry['month'], '%Y %m'),
        reverse=True
    )

    # Create a new BibDatabase object with the sorted entries
    from bibtexparser.bibdatabase import BibDatabase
    sorted_bib_database = BibDatabase()
    sorted_bib_database.entries = sorted_entries

    # Use the custom writer
    writer = CustomBibTexWriter()
    with open("papers.bib", 'w') as bibtex_file:
        bibtex_file.write(writer.write(sorted_bib_database))


# Usage
add_field_if_author_in_entry(
    'papers.bib', {"Matt": "NOLAN", "Gulsen": "SÜRMELI", "Gülşen": "SÜRMELI"})

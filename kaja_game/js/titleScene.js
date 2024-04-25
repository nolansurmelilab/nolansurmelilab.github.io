class titleScene extends Phaser.Scene {
  constructor (){
    super({key: 'titleScene'});
    this.titleScenebackgroundimage = null
    this.startButton = null
  }

  preload(){
    console.log("title")
    this.load.image( 'titleScenebackgroundimage', '/assets/img/game/titlebackground.png');
    this.load.image('startButton', '/assets/img/game/start_button.png')
  }
  create (data){
    this.titleScenebackgroundimage = this.add.sprite(0,0, 'titleScenebackgroundimage').setOrigin(0,0);;
    this.resizeBackgroundImage(this.scale.gameSize);
    this.startButton = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'startButton').setScale(.8).setInteractive({useHandCursor:true});
    this.startButton.on('pointerdown', () => this.scene.start('dayScene'))

    this.scale.on('resize', this.resizeBackgroundImage, this);
  }

  resizeBackgroundImage(gameSize) {
    let width = gameSize.width;
    let height = gameSize.height;

    // Scale the image based on the size of the game
    this.titleScenebackgroundimage.setScale(width / this.titleScenebackgroundimage.width, height / this.titleScenebackgroundimage.height);
    }
}
export default titleScene
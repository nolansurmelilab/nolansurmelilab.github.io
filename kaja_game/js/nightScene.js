class nightScene extends Phaser.Scene {
  constructor (){
    super({key: 'nightScene'});
  }

  preload(){
    this.load.image("nightbg", "/assets/img/game/night_background_real.png");
    this.load.image("player", "/assets/img/game/casper_asleep.png");
  }
  create (data){
  this.nightbg = this.add.sprite(0, 0, "nightbg").setOrigin(0,0);
  this.player = this.physics.add.sprite(1050, 400, "player").setScale(.3);
  this.player.setCollideWorldBounds(true);
    this.textBox = this.add.text(100, 820, "A thunderstorm hit and your tent flooded!", { fontFamily: 'Arial', fontSize: 22, color: '#000000' });
    this.textBox = this.add.text(100, 850, "Quick, get back to your car!", { fontFamily: 'Arial', fontSize: 22, color: '#000000' });
  }
  update(time, delta){
    const keyLeftObj = this.input.keyboard.addKey('LEFT');
    const keyRightObj = this.input.keyboard.addKey('RIGHT');
    const keyUpObj = this.input.keyboard.addKey('UP');
    const keyDownObj = this.input.keyboard.addKey('DOWN');
    if (keyLeftObj.isDown) {
    this.player.setScale(-0.3,0.3)
    this.player.x -= 5;
    }
    if (keyRightObj.isDown) {
    this.player.setScale(0.3,0.3)
    this.player.x += 5;
    }
    if (keyUpObj.isDown) {
      this.player.y -= 5;
    }
    if (keyDownObj.isDown) {
      this.player.y += 5;
    }
    if (this.player.x < 80 && this.player.y < 400 && this.player.y > 250 ) {
      this.scene.switch('endScene')
    }
    }

  }

export default nightScene
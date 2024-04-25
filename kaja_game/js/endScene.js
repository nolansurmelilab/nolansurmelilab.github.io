class endScene extends Phaser.Scene {
  constructor (){
    super({key: 'endScene'});
  }

  preload(){
    this.load.image("endbg", "/assets/img/game/end_scene.png");
  }
  create(data){
    this.endbg = this.add.sprite(0, 0, "endbg").setOrigin(0,0);
  }
  update(time, delta){
    }
  }
export default endScene
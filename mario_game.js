

//Every state will be an object.
var MarioLevel = {
    //Hidden Fields like camera, physics, load etc
    
    init: function () {
        //Initialise Game Level Settings
        console.log("In Init");
        
    },
    preload: function () {
        //Load the assets before your game begins
        console.log("In Preload");
        this.load.image('background','images/background.jpg');
		this.load.image('ground','images/ground.png');
		this.load.image('platform','images/platform.png');
		this.load.image('platform2','images/platform.png');
		this.load.spritesheet('player','images/player_spritesheet.png',28,30,5,1,1);
    },
    create: function () {
        //Draws and creates the objects when game starts
        this.add.sprite(0,0,'background');
		
		
		/*this.background=this.background.scale.setTo(.25,.25);
        /*console.log("In Create");
        console.log(this); */
		
		this.ground= this.add.sprite(0,350,'ground');
		
		this.player= this.add.sprite(100,100,'player',3);
		this.platform= this.add.sprite(200,250,'platform');
		this.platform2= this.add.sprite(100,100,'platform');
		//Enable physics in our game
		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.game.physics.arcade.gravity.y=1000;
		
		this.game.physics.enable(this.player);
		
		this.game.physics.enable(this.ground);
		
		this.game.physics.enable(this.platform);
		
		this.game.physics.enable(this.platform2);
		
		this.ground.body.allowGravity=false;
		this.ground.body.immovable=true;
		
		this.platform.body.allowGravity=false;
		this.platform.body.immovable=true;
		
		
		this.platform2.body.allowGravity=false;
		this.platform2.body.immovable=true;
		this.player.scale.setTo(2,2);
		
		//Implement Cursors
		 
		 this.cursors= this.game.input.keyboard.createCursorKeys();
		
				
    },
    update: function () {
    
        //It gets called everytime automatically(Game loop)
        console.log("In Update");
		
		this.game.physics.arcade.collide(this.player,this.ground);
		this.game.physics.arcade.collide(this.player,this.platform);
		this.game.physics.arcade.collide(this.player,this.platform2);
		
		
		this.player.body.velocity.x=0;
		
		if(this.cursors.left.isDown){
			console.log("You pressed left");
			this.player.body.velocity.x = -100;
		}
		else if(this.cursors.right.isDown){
			console.log("You pressed right");
			this.player.body.velocity.x = +100;
		}
		if(this.cursors.up.isDown && this.player.body.touching.down){
			console.log("You pressed up");
			this.player.body.velocity.y = -700;
			
			}
		
		if(this.player.x>=800){
			alert("GAme Over");
			MarioGame.state.start('Level1');
		}
		
    },
    
};


var MarioGame =new Phaser.Game(700 , 400 , Phaser.CANVAS);
MarioGame.state.add('Level1', MarioLevel);
MarioGame.state.start('Level1');	
//Every State will be an object.
var MarioLevel = { 
    //Hidden Objects like Load,Game,Add,Camera,Physics etc.
    
   
    preload:function(){
        // Load the assets before your game begins
        console.log("In Preload");
        this.load.image('background','images/background.jpg');
        this.load.image('ground','images/ground.png');
       this.load.image('platform','images/platform.png');
        this.load.spritesheet('player','images/player_spritesheet.png',28,30,5,1,1);
    
    },
    create:function(){
        // Draws and creates the objects when game starts 
        this.add.sprite(0,0,'background');
        this.ground = this.add.sprite(0,750,'ground');
        this.player = this.add.sprite(100,100,'player',3);
        this.platform = this.add.sprite(200,550,'platform');
        this.platform2 = this.add.sprite(100,400,'platform');
        this.player.scale.setTo(2,2);
        
        this.game.world.setBounds(0,0,1000,800);
        
    //Enable Physics in our Game and set Gravity
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;
    //this.player.collideWorldBounds = true;
    
    //Enable physics on our player
    this.game.physics.enable(this.player);
    this.game.physics.enable(this.ground);
    this.game.physics.enable(this.platform);
    this.game.physics.enable(this.platform2);
        
    //Disallow Gravity on ground
    this.ground.body.allowGravity = false;
    this.ground.body.immovable =true;
        
    this.platform.body.allowGravity = false;
    this.platform.body.immovable = true;
        
    this.platform2.body.allowGravity = false;
    this.platform2.body.immovable = true;
    // Implement Cursors
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
    //Camera
        this.game.camera.follow(this.player);
        
        
    },
    update:function(){
        // Its called everytime automatically (Game Loop )
        console.log("in Update");
        this.game.physics.arcade.collide(this.player,this.ground);
        
        this.game.physics.arcade.collide(this.player,this.platform);
         this.game.physics.arcade.collide(this.player,this.platform2);
        this.player.body.velocity.x = 0;
        
        if(this.cursors.left.isDown){
            this.player.body.velocity.x = -100;
        }
        else if(this.cursors.right.isDown){
            this.player.body.velocity.x = +100;
        }
        if(this.cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -700;
        }
        if(this.player.x>=800){
            alert("Game Over");
            MarioGame.state.start('Level1');
            
        }
        
        
    }
};



var MarioGame = new Phaser.Game(700,400,Phaser.AUTO);
MarioGame.state.add('Level1',MarioLevel);
MarioGame.state.start('Level1');
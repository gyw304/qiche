MyGame.Game = function(game) {
	this.speed = 500;
	this.gameRun = false;
	this.playGravity = 2000;
	game.score = 0;
	this.rnd = 0;
	this.createTime = 0;
	this.doubleJump = 0;
	this.dely = 0;
};
var birdchance;
var hinderchance;
var bird;
var ruds;
MyGame.Game.prototype = {
    create: function() {
        this.stage.backgroundColor = '#4b6687';
        this.add.image(0,0,'gameBg_'+this.rnd.integerInRange(0,2)+'');
        
        
        ruds = this.rnd.integerInRange(0,build.length - 1);

		this.lou = this.add.tileSprite(0,264,1414,579,'lou_'+ruds+'');
		
		
		
		this.PAI_330_125 = this.add.image(build[ruds].ad[0].x,611,'PAI_330_125');
		this.PAI_205_75 = this.add.image(build[ruds].ad[1].x,696,'PAI_205_75');
		
		this.AD_330_125 = this.add.sprite(7,5,'AD_330_125'+selectID+'');
		this.AD_205_75 = this.add.sprite(5,5,'AD_205_75_'+selectID+'');
		
		this.PAI_330_125.addChild(this.AD_330_125)
		this.PAI_205_75.addChild(this.AD_205_75)
		
		/*this.lou.addChild(this.AD_330_125);
		this.lou.addChild(this.AD_205_75);*/
		
		
		

		this.road = this.add.tileSprite(0,game.world.height-207 - 157,game.world.width,207,'road');
		game.physics.enable(this.road,Phaser.Physics.ARCADE);
		this.road.body.immovable = true;
		this.road.body.setSize(game.world.width, 100, 0, 105);
		
		
		this.player = this.add.sprite(120,944, 'player');
	    this.player.anchor.set(0.4,1);
	    this.player.animations.add('player');
	    
	    //this.player.animations.stop();
		
		this.player.jump = false;
		game.physics.enable(this.player,Phaser.Physics.ARCADE); 
        this.player.body.gravity.y = 0; 
        this.player.body.setSize(100, 155, 10, 0);
        this.player.enableBody = true;
        
        game.input.onTap.add(this.playerJump, this);
        
        GameUI.Game_element();//GameUI
        
        this.hinderGroup = game.add.group();
        this.hinderGroup.enableBody = true;
        
        this.proName = this.add.text(game.world.width/2,46,proName+'\n∆Ô––∑Ω’Û',{font: "bold 38px Microsoft YaHei", fill: "#5b3716",align:'center'})
        this.proName.anchor.set(0.5,0);
        this.proName.setShadow(-2, -2, '#fce64a', 0);
        
        
        this.birdGroup = game.add.group();
        this.birdGroup.enableBody = true;
        
        this.playWayGroup = this.add.group();
        this.playWayGroup.x = 80;
        this.playWayGroup.y = 200;
        this.playWayGroup.create(0, 0, 'play_way');
        
       	this.startBtn = this.add.button(120,370,'ico',function(){
       		this.playWayGroup.visible = false;
       		this.startGame()
       	},this);
        this.startBtn.frameName = 'start.png';
        
        this.playWayGroup.addChild(this.startBtn);
        
        //this.playWayGroup.visible = false;
       
        GameUI.cutscenes();
        
    },
    
    startGame : function(){
    	this.gameRun = true;
    	this.player.animations.play('player',7,true);
    	this.player.body.gravity.y = this.playGravity;
    	this.road.autoScroll(-this.speed,0);
		this.lou.autoScroll(-this.speed/10,0);
    },
    update: function() {
    	game.physics.arcade.collide(this.player,this.road, this.hitRoad, null, this); //ºÏ≤‚”Î¬Ωµÿ≈ˆ◊≤
    	if(!this.gameRun) return;
    	this.createHinder();
    	this.createBrid();
    	game.scoreText.setText((game.score++)/1000+' Km');
		game.physics.arcade.overlap(this.player, this.hinderGroup, this.hitHider, null, this);
		game.physics.arcade.overlap(this.player, this.birdGroup, this.hitBird, null, this);

		if(this.PAI_330_125.x<=-(game.world.width + build[ruds].ad[0].x))
		{
			this.PAI_330_125.x = game.world.width + build[ruds].ad[0].x;
		}
		else
		{
			this.PAI_330_125.x -= 0.83
		}
		
		if(this.PAI_205_75.x<=-(game.world.width + build[ruds].ad[1].x))
		{
			this.PAI_205_75.x = game.world.width + build[ruds].ad[1].x;
		}
		else
		{
			this.PAI_205_75.x -= 0.83
		}
		
    },
    playerJump : function(){
    	if(!this.player.jump && this.gameRun)
    	{
    		this.player.body.velocity.y = -1000;
    		game.add.tween(this.player).to({angle:-30}, 100, Phaser.Easing.Linear.None, true,0);
    		if(this.doubleJump>=1)
    		{
    			this.player.jump = true;
    		}
    		else
    		{
    			++this.doubleJump
    		}
    	}
    },
    hitRoad : function(){
    	game.add.tween(this.player).to({angle:0}, 30, Phaser.Easing.Linear.None, true,0);
    	this.doubleJump = 0;
    	this.player.jump = false;
    },
    createHinder : function(){
    	hinderchance= Math.random() * 1000;
    	if(hinderchance < 5)
    	{
    		var hinder = this.hinderGroup.create(game.world.width, 890, 'ico');
    		hinder.frameName = 'obstacle.png';
    	}
    	
    	this.hinderGroup.setAll('body.velocity.x', -this.speed);
    	this.hinderGroup.forEach(function(i){
    		i.body.setSize(36, 50, 10, 0);
    		if(i.x<=0)
    		{
    			i.destroy()
    		}
    	})
    },
    createBrid : function(){
    	birdchance= Math.random() * 1000;
    	if(birdchance < 2)
    	{
    		this.birdGroup.create(game.world.width,800, 'bird',0);
	    	this.birdGroup.setAll('checkWorldBounds',true); 
		    this.birdGroup.setAll('outOfBoundsKill',true); 
		    this.birdGroup.setAll('body.velocity.x', -this.rnd.integerInRange(400,800));
		    this.birdGroup.callAll('animations.add', 'animations', 'spin', [0, 1], 10, true);
		    this.birdGroup.callAll('animations.play', 'animations', 'spin');
    	}
    },
    gameover : function(){
    	this.gameRun = false;
    	this.player.animations.stop();
    	this.road.autoScroll(0,0);
		this.lou.autoScroll(0,0);
		this.player.body.velocity.y = 0;
		this.hinderGroup.setAll('body.velocity.x', 0);
		this.birdGroup.setAll('body.velocity.x', 0);
		this.hinderGroup.setAll('body.velocity.y', 0);
		this.birdGroup.setAll('body.velocity.y', 0);
		game.time.events.add(Phaser.Timer.SECOND*2,function(){
			game.state.start('Result')
		}, this);
    },
    hitHider : function(i,itm){
    	this.gameover()
    	itm.body.velocity.x = 1000;
    	itm.body.velocity.y = -50; 
    },
    hitBird : function(i,item){
    	this.gameover()
    	item.body.velocity.x = 1000;
		item.body.velocity.y = -50;
    },
    render : function() {

	    //game.debug.body(this.player);
	    /*game.debug.body(this.road);
	    this.hinderGroup.forEach(function(i){
	    		game.debug.body(i);
	    })*/
	    //game.debug.body(sprite2);
	
	}
};


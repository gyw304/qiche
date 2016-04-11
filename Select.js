MyGame.Select = function(game) {

};

MyGame.Select.prototype = {
    create: function() {
        this.add.image(0,0,'select_bg');
        
        var style = {font: "32px Microsoft YaHei", fill: "#3e3e3e"};
        
        var selectGroup = this.add.group();
        
        game.rankBoxHeight = 150*selectPro.length;
        
        game.siderBox = game.add.graphics(0, 0);
        game.siderBox.beginFill(0xfff000);
        game.siderBox.drawRect(0, 0, game.world.width,game.rankBoxHeight);
        game.siderBox.endFill();
        
        game.siderBoxCover = game.add.graphics(0, 0);
        game.siderBoxCover.beginFill(0xff0000,.2);
        game.siderBoxCover.drawRect(0, 0, game.world.width,930);
        game.siderBoxCover.endFill();

        game.siderBox.y = game.siderBoxCover.y = 200;
        
        game.siderBox.mask = game.siderBoxCover;
        
        for(var i=0;i<=selectPro.length-1;i++)
        {
        	if(i%2==0)
        	{
        		var proPic = this.add.button(430,Math.floor(i/2)%2*400,'pro_'+i+'',this.selects,this);
        		selectGroup.addChild(proPic);
        	}
        	else
        	{
        		var proPic = this.add.button(40,Math.floor(i/2)%2*400,'pro_'+i+'',this.selects,this)
        		
        	}
        }
        //game.siderBox.addChild(selectGroup);
        
        console.log(game.siderBox)
        
        game.siderBox.inputEnabled = true;
        
        
       /* game.siderBox.setAll('inputEnabled', true);

    //  Now using the power of callAll we can add the same input event to all coins in the group:
	    game.siderBox.callAll('events.onInputDown.add', 'events.onInputDown', function(){
	    	
	    });*/
        
        
        game.siderBox.inputEnabled = true;
        game.siderBox.input.enableDrag();
        game.siderBox.input.allowHorizontalDrag = false;
        //game.rankBox.events.onDragUpdate.add(this.dragUpdate);
        
        GameUI.cutscenes()
    },
    selects : function(i){
    	alert(i.key)
    },
    dragUpdate : function(i){
		if(i.y>=game.rankBoxCover.y) i.y = game.rankBoxCover.y;
		if(i.y<=game.rankBoxCover.y-(game.rankBoxHeight - 930)) i.y = game.rankBoxCover.y-(game.rankBoxHeight - 930);
	}
};
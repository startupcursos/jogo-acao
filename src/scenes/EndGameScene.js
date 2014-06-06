var EndGameScene = cc.Scene.extend({
	onEnter : function() {
		this._super();
		
		/*this.canvas = cc.Director.getInstance().getWinSize();
		this.labelLife = cc.LabelTTF.create("THE END", "Algerian", 100);        
        this.labelLife.setPosition(this.canvas.width / 2, this.canvas.height / 2);
        this.addChild(this.labelLife);*/
        
		cc.MenuItemFont.setFontName("Algerian");
		cc.MenuItemFont.setFontSize(100);
		var title1 = cc.MenuItemFont.create("GAME OVER");
		title1.setEnabled(false);

		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(26);
		var label = cc.LabelTTF.create("Go to Menu!", "Arial", 20);
		var back = cc.MenuItemLabel.create(label, this.onMainMenuCallback);
		back.setScale(0.8);

		var menu = cc.Menu.create(title1, back);
		menu.alignItemsInColumns(1, 1);
		this.addChild(menu);

		back.setPositionY(back.getPositionY() - 50);
	},
	onMainMenuCallback : function(pSender) {
		GAME.LIFES = 3;
		cc.Director.getInstance().popScene();
	},

        
		/*cc.MenuItemFont.setFontName("Algerian");
		cc.MenuItemFont.setFontSize(48);
		cc.MenuItemFont.setPosition(this.canvas.width - 60, this.canvas.height - 30);
		var itemMenuPlay = cc.MenuItemFont.create("Click here to Try Again!", this.onMainMenu);*/
        
		/*this.labelScore = cc.LabelTTF.create("Click here to go Menu", "Impact", 14);
        this.labelScore.setPosition(this.canvas.width - 60, this.canvas.height - 30);
        this.addChild(this.labelScore);*/
	


});

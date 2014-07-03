var GameOverScene = cc.Scene.extend({
	onEnter : function() {
		this._super();
		
		cc.MenuItemFont.setFontName("Arial");
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
	}
});

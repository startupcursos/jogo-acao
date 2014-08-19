var MainmenuScene = cc.Scene.extend({
	onEnter : function() {
		this._super();
		var size = cc.Director.getInstance().getWinSize();
		var bgMainMenu = cc.Sprite.create(s_bg_mainmenu);
		bgMainMenu.setPosition(size.width / 2, size.height / 2);
		this.addChild(bgMainMenu, -1);

		// ItemImage
	 	var itemMenuPlay = cc.MenuItemImage.create(s_bplay, s_bplay, this.onPlay, this);
		var itemMenuHS = cc.MenuItemImage.create(s_bhighscore, s_bhighscore, this.onHighScore, this);
		var itemMenuSettings = cc.MenuItemImage.create(s_bsettings, s_bsettings, this.onSettings, this);
		var itemMenuCredits = cc.MenuItemImage.create(s_bcredits, s_bcredits, this.onCredits, this);
		var itemMenuQuit = cc.MenuItemImage.create(s_bquit, s_bquit, this.onQuit, this);
		
		var menu = cc.Menu.create(itemMenuPlay, itemMenuHS, itemMenuSettings, itemMenuCredits, itemMenuQuit);
		menu.setPosition (400,190);
		menu.alignItemsVerticallyWithPadding(10);
		this.addChild(menu);
	},
	onPlay : function() {
		cc.log("Play pressed");
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new PlanetmenuScene())); 
	},
	onHighScore : function() {
		cc.log("HighScore pressed");
	},
	onSettings : function() { 
		cc.log("Settings pressed");
		var transition = cc.TransitionFade.create(1, new SettingsScene());
		cc.Director.getInstance().pushScene(transition);
	},
	onCredits : function() {
		cc.log("Credits pressed");
	},
	onQuit : function() {
		cc.log("Quit pressed");
		cc.Director.getInstance().end();
	}
});

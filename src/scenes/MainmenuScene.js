var MainmenuScene = cc.Scene.extend({
	onEnter : function() {
		this._super();
		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(48);
		var itemMenuPlay = cc.MenuItemFont.create("Play", this.onPlay);
		var itemMenuHS = cc.MenuItemFont.create("HighScore", this.onHighScore);
		var itemMenuSettings = cc.MenuItemFont.create("Settings", this.onSettings);
		var itemMenuCredits = cc.MenuItemFont.create("Credits", this.onCredits);
		var itemMenuQuit = cc.MenuItemFont.create("Quit", this.onQuit);
		var menu = cc.Menu.create(itemMenuPlay, itemMenuHS, itemMenuSettings, itemMenuCredits, itemMenuQuit);
		menu.alignItemsVerticallyWithPadding(15);
		this.addChild(menu);
	},
	onPlay : function() {
		cc.log("Play pressed");
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new LevelTwoScene())); //LevelOneScene LevelTwoScene LevelElevenScene LevelTwelveScene
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

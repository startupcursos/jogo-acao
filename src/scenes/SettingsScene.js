var SettingsScene = cc.Scene.extend({
	onEnter : function() {
		this._super();
		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(18);
		var title1 = cc.MenuItemFont.create("Sound");
		title1.setEnabled(false);

		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(26);
		var item1 = cc.MenuItemToggle.create(cc.MenuItemFont.create("On"), cc.MenuItemFont.create("Off"));
		item1.setCallback(this.onSoundControl);
		var state = GAME.SOUND ? 0 : 1;
		item1.setSelectedIndex(state);

		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(26);
		var label = cc.LabelTTF.create("Go back", "Arial", 20);
		var back = cc.MenuItemLabel.create(label, this.onBackCallback);
		back.setScale(0.8);

		var menu = cc.Menu.create(title1, item1, back);
		menu.alignItemsInColumns(2, 1);
		this.addChild(menu);

		back.setPositionY(back.getPositionY() - 50);
	},
	onBackCallback : function(pSender) {
		cc.Director.getInstance().popScene();
	},
	onSoundControl : function() {
		GAME.SOUND = !GAME.SOUND;
	}
});

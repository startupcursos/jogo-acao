var Cut7NetunoScene = cc.Scene.extend({
	onEnter : function() {
		this._super();
		var size = cc.Director.getInstance().getWinSize();

		var nomeDoPlaneta = cc.LabelTTF.create("NEPTUNE", "Impact", 48);
		nomeDoPlaneta.setPosition(size.width / 2, size.height * 3 / 4);
		this.addChild(nomeDoPlaneta, 1);
		
		cc.MenuItemFont.setFontName("Impact");
		cc.MenuItemFont.setFontSize(48);
		var go = cc.MenuItemFont.create("GO", this.onGo);
		go.setPosition(size.width / 2, size.height / 5);
		var menu = cc.Menu.create(go);
		menu.setPosition(0, 0);
		this.addChild(menu, 1);

		var clickToPlay = cc.LabelTTF.create("Jonathan Campos - Level Design\nJonathan Campos - Landscape Art", "Arial", 24);
		clickToPlay.setPosition(size.width / 2, size.height / 2);
		this.addChild(clickToPlay, 1);

		var imagemDoPlaneta = cc.Sprite.create(s_netuno_cut_image);
		imagemDoPlaneta.setPosition(size.width / 2, size.height / 2);
		this.addChild(imagemDoPlaneta, 0);

	},
	onGo : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Level7NetunoScene()));
	}
});

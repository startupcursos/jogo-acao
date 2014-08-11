var Cut5SaturnoScene = cc.Scene.extend({
	onEnter : function() {
		this._super();
		var size = cc.Director.getInstance().getWinSize();

		var nomeDoPlaneta = cc.LabelTTF.create("SATURN", "Impact", 48);
		nomeDoPlaneta.setPosition(size.width / 2, size.height * 3 / 4);
		this.addChild(nomeDoPlaneta, 1);
		nomeDoPlaneta.setFontFillColor(cc.c4f(0,0,0));
		
		cc.MenuItemFont.setFontName("Impact");
		cc.MenuItemFont.setFontSize(48);
		var go = cc.MenuItemFont.create("GO", this.onGo);
		go.setPosition(size.width / 2, size.height / 5);
		go.setColor(cc.c4f(0,0,0,0.2));
		
		var menu = cc.Menu.create(go);
		menu.setPosition(0, 0);
		this.addChild(menu, 1);
		

		var clickToPlay = cc.LabelTTF.create("Jonadabe Campos - Level Design\nJonadabe Campos - Landscape Art", "Arial", 24);
		clickToPlay.setPosition(size.width / 2, size.height / 2);
		this.addChild(clickToPlay, 1);
		clickToPlay.setFontFillColor(cc.c4f(0,0,0));
		
		var imagemDoPlaneta = cc.Sprite.create(s_saturno_cut_image);
		imagemDoPlaneta.setPosition(size.width / 2, size.height / 2);
		this.addChild(imagemDoPlaneta, 0);
		

	},
	onGo : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Level5SaturnoScene()));
	}
});

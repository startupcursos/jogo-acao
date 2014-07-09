var Cut4JupiterScene = cc.Scene.extend({
	onEnter : function() {
		this._super();
		var size = cc.Director.getInstance().getWinSize();        
		var imagemDoPlaneta = cc.MenuItemImage.create(s_jupiter_cut_image, s_jupiter_cut_image, function() {
			cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Level4JupiterScene()));
		}, this);
		imagemDoPlaneta.setPosition(size.width / 2, size.height / 2);
        var menu = cc.Menu.create(imagemDoPlaneta);
        menu.setPosition(0, 0);
        this.addChild(menu, 1);
        var nomeDoPlaneta = cc.LabelTTF.create("JUPITER", "Impact", 38);
        nomeDoPlaneta.setPosition(size.width / 2, size.height * 3 / 4);
        this.addChild(nomeDoPlaneta, 1);
        var clickToPlay = cc.LabelTTF.create("Click to Play", "Impact", 38);
        clickToPlay.setPosition(size.width / 2, size.height * 1 / 4);
        this.addChild(clickToPlay, 1);
	}
});

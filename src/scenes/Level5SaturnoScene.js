var Level5SaturnoScene = cc.Scene.extend({
	player: null,
	gamelayer: null,
	canvas: null,
	onEnter : function() {
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();

		var layerCeu = new SaturnoCeuLayer();
		this.addChild(layerCeu, layerCeu.zOrder);
		layerCeu.init();
		
		var layerMontanhaLonge = new SaturnoMontanhaLayer();
		this.addChild(layerMontanhaLonge, layerMontanhaLonge.zOrder);
		layerMontanhaLonge.init();

		var layerCity = new SaturnoCityLayer();
		this.addChild(layerCity, layerCity.zOrder);
		layerCity.init();
		
		this.gamelayer = new GameLayer();
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		var spriteGround = new Ground(0, 0, s_saturno_chao);
		this.gamelayer.init(spriteGround,  s_bgm_saturno);
		
		
		
		this.enemyPlacement();
		this.player = this.gamelayer.player;
		
			var hudLayer = new HudLayer();
		hudLayer.init();
		this.addChild(hudLayer, hudLayer.zOrder);
		GAME.LASTLEVEL = new Level5SaturnoScene();
	},
	enemyPlacement : function() {
		this.gamelayer.addChild(new Mina(1200, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(1250, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(1800, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(1850, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(2500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new UfoA(3500, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new Stone(4000, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(4500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new UfoA(6000, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new Mina(6500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(6550, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(7500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(8500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(9000, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(9500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(10000, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(10050, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(10100, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(10150, this.canvas.height / 9.5));
	
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Cut6UranoScene()));
	}

});

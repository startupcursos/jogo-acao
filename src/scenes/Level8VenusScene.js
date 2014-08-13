var Level8VenusScene = cc.Scene.extend({
	player: null,
	gamelayer: null,
	canvas: null,
	onEnter : function() {
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();

		var layerCeu = new VenusCeuLayer();
		this.addChild(layerCeu, layerCeu.zOrder);
		layerCeu.init();
		
		var layerMontanhaLonge = new VenusMontanhaLongeLayer();
		this.addChild(layerMontanhaLonge, layerMontanhaLonge.zOrder);
		layerMontanhaLonge.init();

		var layerMontanhaPerto = new VenusMontanhaPertoLayer();
		this.addChild(layerMontanhaPerto, layerMontanhaPerto.zOrder);
		layerMontanhaPerto.init();

		this.gamelayer = new GameLayer();
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		var spriteGround = new Ground(0, 0, s_venus_chao);
		this.gamelayer.init(spriteGround, s_bgm_venus);
		

		this.enemyPlacement();
		this.player = this.gamelayer.player;
		
		var hudLayer = new HudLayer();
		hudLayer.init();
		this.addChild(hudLayer, hudLayer.zOrder);
		
		GAME.LASTLEVEL = new Level8VenusScene();
		GAME.MUSICDURATIONINSEC = 70;
	},
	enemyPlacement : function() {
		

		this.gamelayer.addChild(new NaveSeguidora(-500, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		this.gamelayer.addChild(new BigStone(800, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		this.gamelayer.addChild(new Planta(1000, this.canvas.width / 60, this.canvas.height / 2));
		this.gamelayer.addChild(new Planta(1400, this.canvas.width / 60, this.canvas.height / 2));
		this.gamelayer.addChild(new UfoA(1300,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(1800,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoA(2100,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(3000,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new RollingStone(3500, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		this.gamelayer.addChild(new RollingStone(4500, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		this.gamelayer.addChild(new RollingStone(5000, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		this.gamelayer.addChild(new Mina(6000, this.canvas.height * GAME.GROUND_HEIGHT_PERC));
		this.gamelayer.addChild(new Mina(7000, this.canvas.height * GAME.GROUND_HEIGHT_PERC));
		this.gamelayer.addChild(new UfoC(8000,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new Mina(9000, this.canvas.height * GAME.GROUND_HEIGHT_PERC));
		this.gamelayer.addChild(new Planta(10000, this.canvas.width / 60, this.canvas.height / 2));
		this.gamelayer.addChild(new Tank(11000, this.canvas.height / 4));

		
		
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Cut4JupiterScene()));
	}

});

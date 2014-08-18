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
		
		GAME.MUSICDURATIONINSEC = 70;
		var hudLayer = new HudLayer();
		hudLayer.init();
		this.addChild(hudLayer, hudLayer.zOrder);
		
		//Armazeno a última fase carregada
		GAME.LASTLEVEL = new Level8VenusScene();		
	},
	enemyPlacement : function() {
		
		//this.gamelayer.addChild(new NaveSeguidora(-500, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		//this.gamelayer.addChild(new Tank(1000, this.canvas.height / 6));
		//this.gamelayer.addChild(new Stone(2000, this.canvas.height * (GAME.GROUND_HEIGHT_PERC - 0.05)));
		//this.gamelayer.addChild(new Planta(2300, this.canvas.width / 60, this.canvas.height / 2));
		//this.gamelayer.addChild(new Planta(2800, this.canvas.width / 60, this.canvas.height / 2));
		//this.gamelayer.addChild(new BigStone(3000, this.canvas.height * (GAME.GROUND_HEIGHT_PERC - 0.05)));
		this.gamelayer.addChild(new UfoA(3200,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(3500,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoA(4000,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(4400,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new RollingStone(5000, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		this.gamelayer.addChild(new RollingStone(6000, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		this.gamelayer.addChild(new RollingStone(7000, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		this.gamelayer.addChild(new RollingStone(7500, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		this.gamelayer.addChild(new RollingStone(7700, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		this.gamelayer.addChild(new Mina(7800, this.canvas.height * GAME.GROUND_HEIGHT_PERC));
		this.gamelayer.addChild(new Mina(8100, this.canvas.height * GAME.GROUND_HEIGHT_PERC));
		this.gamelayer.addChild(new Mina(9000, this.canvas.height * GAME.GROUND_HEIGHT_PERC));
		this.gamelayer.addChild(new UfoC(10000,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoA(11000,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new BigStone(12000, this.canvas.height * GAME.GROUND_HEIGHT_PERC - 0.05));
		this.gamelayer.addChild(new UfoA(13000,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoC(14000,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new Planta(15000, this.canvas.width / 60, this.canvas.height / 2));
		this.gamelayer.addChild(new Planta(16500, this.canvas.width / 60, this.canvas.height / 2));
		this.gamelayer.addChild(new Mina(17000, this.canvas.height * GAME.GROUND_HEIGHT_PERC));
		this.gamelayer.addChild(new Mina(17300, this.canvas.height * GAME.GROUND_HEIGHT_PERC));
		this.gamelayer.addChild(new UfoC(18000,  5 / 6 * this.canvas.height));
		

		
		
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Cut4JupiterScene()));
	}

});

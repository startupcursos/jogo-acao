<<<<<<< HEAD
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
		this.gamelayer.init(spriteGround);

		this.enemyPlacement();
		this.player = this.gamelayer.player;
		
		var hudLayer = new HudLayer();
		hudLayer.init();
		this.addChild(hudLayer, hudLayer.zOrder);
		GAME.LASTLEVEL = new Level8VenusScene();
	},
	enemyPlacement : function() {
		this.gamelayer.addChild(new RollingStone(2000, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		this.gamelayer.addChild(new RollingStone(3000, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		this.gamelayer.addChild(new RollingStone(4000, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.05)));
		this.gamelayer.addChild(new Mina(2500, this.canvas.height * GAME.GROUND_HEIGHT_PERC));
		this.gamelayer.addChild(new Mina(3500, this.canvas.height * GAME.GROUND_HEIGHT_PERC));
		this.gamelayer.addChild(new Mina(4500, this.canvas.height * GAME.GROUND_HEIGHT_PERC));
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Level7NetunoScene()));
	}

});
=======
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

		var layerCity = new VenusCityLayer();
		this.addChild(layerCity, layerCity.zOrder);
		layerCity.init();

		this.gamelayer = new GameLayer();
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		var spriteGround = new Ground(0, 0, s_venus_chao);
		this.gamelayer.init(spriteGround);
		
		this.enemyPlacement();
		this.player = this.gamelayer.player;
		GAME.LASTLEVEL = new Level8VenusScene();
	},
	enemyPlacement : function() {
		// this.gamelayer.addChild(new HoleSmall(1000, this.canvas.height / 6.5));
		// this.gamelayer.addChild(new HoleBig(2000, this.canvas.height / 6.5));
		this.gamelayer.addChild(new UfoB(4200, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(4500, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(4900, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new Stone(5200, this.canvas.height / 3.5));		
		this.gamelayer.addChild(new UfoC(7500, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoC(8500, 5 / 6 * this.canvas.height));			
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new TheEndScene()));
	}

});

>>>>>>> master
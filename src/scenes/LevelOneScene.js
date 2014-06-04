var LevelOneScene = cc.Scene.extend({
	player: null,
	gamelayer: null,
	canvas: null,
	onEnter : function() {
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();

		var layerLandscape2 = new Landscape2Layer();
		this.addChild(layerLandscape2, layerLandscape2.zOrder);
		layerLandscape2.init();
		
		var layerLandscape1 = new Landscape1Layer();
		this.addChild(layerLandscape1, layerLandscape1.zOrder);
		layerLandscape1.init();
		
		this.gamelayer = new GameLayer();
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		this.gamelayer.init();
		this.enemyPlacement();
		this.player = this.gamelayer.player;
		
		var hudLayer = new HudLayer();
		hudLayer.init();
		this.addChild(hudLayer, hudLayer.zOrder);
		GAME.SCORE = 0;
		
		var lifeLayer = new LifeLayer();
		lifeLayer.init();		
		this.addChild(lifeLayer, lifeLayer.zOrder);
		GAME.LIFES;
		
		//Armazeno a última fase carregada
		GAME.LASTLEVEL = new LevelOneScene();
	},
	enemyPlacement : function() {
		this.gamelayer.addChild(new NaveSeguidora(-500, this.canvas.height / 3.5));
		this.gamelayer.addChild(new UfoA(800,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(1200,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new Stone(1600, this.canvas.height / 3.5));
		this.gamelayer.addChild(new LittleStone(2400, this.canvas.height / 4));
		this.gamelayer.addChild(new BigStone(3200, this.canvas.height / 3.3));
		this.gamelayer.addChild(new SmallRollingStone(10000, this.canvas.height / 4));
		this.gamelayer.addChild(new RollingStone(11000, this.canvas.height / 3.5));
		this.gamelayer.addChild(new HoleSmall(4000, this.canvas.height / 6.5));
		this.gamelayer.addChild(new HoleBig(4800, this.canvas.height / 6.5));
		this.gamelayer.addChild(new Mina1(5600, this.canvas.height / 4.5));
		//this.gamelayer.addChild(new Planta1(6400, this.canvas.height / 6.5));
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new LevelTwoScene()));
	}
});

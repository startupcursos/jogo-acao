var LevelSixScene = cc.Scene.extend({
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
		GAME.SCORE;
		
		var lifeLayer = new LifeLayer();
		lifeLayer.init();		
		this.addChild(lifeLayer, lifeLayer.zOrder);
		GAME.LIFE;
		
		GAME.LASTLEVEL = new LevelSixScene();
	},
	enemyPlacement : function() {
		this.gamelayer.addChild(new UfoC(700, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoC(1000, 5 / 6 * this.canvas.height));		
		this.gamelayer.addChild(new UfoB(3800, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(4100, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new HoleSmall(6000, this.canvas.height / 6.5));
		this.gamelayer.addChild(new Stone(8000, this.canvas.height / 3.5));
						
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new LevelSevenScene()));
	}

});

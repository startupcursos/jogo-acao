var LevelFiveScene = cc.Scene.extend({
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
		GAME.LASTLEVEL = new LevelFiveScene();
	},
	enemyPlacement : function() {
		this.gamelayer.addChild(new UfoA(2000, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoA(2400, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new Stone(5500, this.canvas.height / 3.5));
		this.gamelayer.addChild(new HoleBig(8500, this.canvas.height / 6.5));				
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new LevelSixScene()));
	}

});


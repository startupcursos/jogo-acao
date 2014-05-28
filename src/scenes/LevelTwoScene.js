var LevelTwoScene = cc.Scene.extend({
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
	},
	enemyPlacement : function() {
		this.gamelayer.addChild(new RollingStone(2000, this.canvas.height / 3.5));
		this.gamelayer.addChild(new RollingStone(3000, this.canvas.height / 3.5));
		this.gamelayer.addChild(new RollingStone(4000, this.canvas.height / 3.5));
		this.gamelayer.addChild(new RollingStone(6000, this.canvas.height / 3.5));
		this.gamelayer.addChild(new RollingStone(7000, this.canvas.height / 3.5));
		this.gamelayer.addChild(new RollingStone(8000, this.canvas.height / 3.5));
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new LevelThreeScene()));
	}

});

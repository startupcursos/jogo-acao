var LevelThirteenScene = cc.Scene.extend({
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
		this.gamelayer.addChild(new Mina1(700, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(1100, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(1700, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(2000, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(2300, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(2600, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(2900, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(3300, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(3600, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(4000, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(4300, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(4600, this.canvas.height / 4.5));
		
		
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new LevelEightScene()));
	}

});

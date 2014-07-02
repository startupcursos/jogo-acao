var LevelTwelveScene = cc.Scene.extend({
	player: null,
	gamelayer: null,
	canvas: null,
	onEnter : function() {
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();

		var layerLandscape1 = new Neptune_Layer1();
		this.addChild(layerLandscape1, layerLandscape1.zOrder);
		layerLandscape1.init();
		
		var layerLandscape2 = new Neptune_Layer2();
		this.addChild(layerLandscape2, layerLandscape2.zOrder);
		layerLandscape2.init();
		
		var layerSky = new Neptune_Sky();
		this.addChild(layerSky, layerSky.zOrder);
		layerSky.init();
		
		var layerGround = new Neptune_Ground();
		this.addChild(layerGround, layerGround.zOrder);
		layerGround.init();
		
				
		this.gamelayer = new GameLayer();
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		this.gamelayer.init();
		this.enemyPlacement();
		this.player = this.gamelayer.player;
	},
	enemyPlacement : function() {
		this.gamelayer.addChild(new Stone(1600, this.canvas.height / 3.5));
		this.gamelayer.addChild(new Mina1(600, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(1300, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(1800, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(2300, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(3300, this.canvas.height / 4.5));
	
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new LevelTwelveScene()));
	}

});
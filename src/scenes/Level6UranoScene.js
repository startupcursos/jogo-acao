var Level6UranoScene = cc.Scene.extend({
	player: null,
	gamelayer: null,
	canvas: null,
	onEnter : function() {
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();

		var layerCeu = new UranoCeuLayer();
		this.addChild(layerCeu, layerCeu.zOrder);
		layerCeu.init();
		
		var layerMontanhaLonge = new UranoMontanhaLongeLayer();
		this.addChild(layerMontanhaLonge, layerMontanhaLonge.zOrder);
		layerMontanhaLonge.init();

		var layerMontanhaPerto = new UranoMontanhaPertoLayer();
		this.addChild(layerMontanhaPerto, layerMontanhaPerto.zOrder);
		layerMontanhaPerto.init();

		this.gamelayer = new GameLayer();
		var spriteGround = new Ground(0, 0, s_urano_chao);
		this.gamelayer.ground = spriteGround; 
		this.gamelayer.addChild(spriteGround, spriteGround.zOrder);

		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		this.gamelayer.init();
		this.enemyPlacement();
		this.player = this.gamelayer.player;
		
		var hudLayer = new HudLayer();
		hudLayer.init();
		this.addChild(hudLayer, hudLayer.zOrder);
		GAME.LASTLEVEL = new Level6UranoScene();
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

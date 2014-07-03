var Level7NetunoScene = cc.Scene.extend({
	player: null,
	gamelayer: null,
	canvas: null,
	onEnter : function() {
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();

		var layerCeu = new NetunoCeuLayer();
		this.addChild(layerCeu, layerCeu.zOrder);
		layerCeu.init();
		
		var layerMontanhaLonge = new NetunoMontanhaLongeLayer();
		this.addChild(layerMontanhaLonge, layerMontanhaLonge.zOrder);
		layerMontanhaLonge.init();

		var layerMontanhaPerto = new NetunoMontanhaPertoLayer();
		this.addChild(layerMontanhaPerto, layerMontanhaPerto.zOrder);
		layerMontanhaPerto.init();
		
		this.gamelayer = new GameLayer();
		var spriteGround = new Ground(0, 0, s_netuno_chao);
		this.gamelayer.ground = spriteGround; 
		this.gamelayer.addChild(spriteGround, spriteGround.zOrder);
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		
		this.gamelayer.init();
		this.enemyPlacement();
		this.player = this.gamelayer.player;
		GAME.LASTLEVEL = new Level7NetunoScene();
	},
	enemyPlacement : function() {
		this.gamelayer.addChild(new HoleSmall(1000, this.canvas.height / 6.5));
		this.gamelayer.addChild(new HoleBig(2000, this.canvas.height / 6.5));
		this.gamelayer.addChild(new UfoB(4200, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(4500, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(4900, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new Stone(5200, this.canvas.height / 3.5));		
		this.gamelayer.addChild(new UfoC(7500, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoC(8500, 5 / 6 * this.canvas.height));			
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new LevelFiveScene()));
	}

});


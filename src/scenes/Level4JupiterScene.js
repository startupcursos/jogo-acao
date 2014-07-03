var Level4JupiterScene = cc.Scene.extend({
	player: null,
	gamelayer: null,
	canvas: null,
	onEnter : function() {
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();

		var layerCeu = new JupiterCeuLayer();
		this.addChild(layerCeu, layerCeu.zOrder);
		layerCeu.init();
		
		var layerMontanhaLonge = new JupiterMontanhaLongeLayer();
		this.addChild(layerMontanhaLonge, layerMontanhaLonge.zOrder);
		layerMontanhaLonge.init();

		var layerMontanhaPerto = new JupiterMontanhaPertoLayer();
		this.addChild(layerMontanhaPerto, layerMontanhaPerto.zOrder);
		layerMontanhaPerto.init();
		
		this.gamelayer = new GameLayer();
		var spriteGround = new Ground(0, 0, s_jupiter_chao);
		this.gamelayer.ground = spriteGround; 
		this.gamelayer.addChild(spriteGround, spriteGround.zOrder);
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		
		this.gamelayer.init();
		this.enemyPlacement();
		this.player = this.gamelayer.player;
		GAME.LASTLEVEL = new Level4JupiterScene();
	},
	enemyPlacement : function() {
		
		this.gamelayer.addChild(new UfoA(800,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(1200,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoA(2800,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(5000,  5 / 6 * this.canvas.height));
	
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new LevelTenScene()));
	}

});

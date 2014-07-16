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
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		var spriteGround = new Ground(0, 0, s_jupiter_chao);
		this.gamelayer.init(spriteGround, s_bgm_jupiter);

		var hudLayer = new HudLayer();
		hudLayer.init();
		this.addChild(hudLayer, hudLayer.zOrder);
		this.player = this.gamelayer.player;
		this.enemyPlacement();
		GAME.LASTLEVEL = new Level4JupiterScene();
	},
	enemyPlacement : function() {
		//Introdução da Mina (Surpresa)
		//Encurtando a distância (Skill: Pulo)
		this.gamelayer.addChild(new Mina(1000, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(1700, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(2400, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(3100, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(4100, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(4600, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(5100, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(5600, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(6000, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(6400, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(6700, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(7200, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(7400, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(7700, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(8000, this.canvas.height / 9.5));
		//Introdução da Pedra (Surpresa)
		//Encurtando a distância (Skill: Pulo, Tiro)

		// this.gamelayer.addChild(new UfoA(800,  5 / 6 * this.canvas.height));
		// this.gamelayer.addChild(new UfoB(1200,  5 / 6 * this.canvas.height));
		// this.gamelayer.addChild(new UfoA(2800,  5 / 6 * this.canvas.height));
		// this.gamelayer.addChild(new UfoB(5000,  5 / 6 * this.canvas.height));
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Cut3MarteScene()));
	}

});

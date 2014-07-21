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
		// Primeiro Segmento de 10K
		//Introdução da Mina (Surpresa)
		//Encurtando a distância (Skill: Pulo)
		this.gamelayer.addChild(new Mina(1200, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(1700, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(2200, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(2600, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(3000, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(3300, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(3800, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(4000, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(4300, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(4600, this.canvas.height / 9.5));
		//Introdução da Pedra (Surpresa)
		//Encurtando a distância (Skill: Pulo, Tiro)
		this.gamelayer.addChild(new Stone(5100, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(5600, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(5900, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(6400, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(6800, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(7300, this.canvas.height / 9.5));
		this.gamelayer.addChild(new UfoA(7800, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new Stone(8200, this.canvas.height / 9.5));
		this.gamelayer.addChild(new UfoA(8500, this.canvas.height * 5 / 6));

	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Cut3MarteScene()));
	}

});

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
		GAME.MUSICDURATIONINSEC = 83;
	},
	enemyPlacement : function() {
		// Primeiro Segmento de 10K
		//Surpresa: Mina 
		//Skill: Pulo
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
		//Surpresa: Pedra, UfoA
		//Skill: Pulo, Tiro
		this.gamelayer.addChild(new Stone(5100, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(5600, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(5900, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(6400, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(6800, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(7300, this.canvas.height / 9.5));
		this.gamelayer.addChild(new UfoA(7800, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new Stone(8200, this.canvas.height / 9.5));
		this.gamelayer.addChild(new UfoA(8500, this.canvas.height * 5 / 6));

		//Segundo Segmento de 10K
		//Surpresa:RollingStone, SmallRollingStone
		this.gamelayer.addChild(new RollingStone(10200, this.canvas.height / 9.0));
		this.gamelayer.addChild(new RollingStone(10800, this.canvas.height / 9.0));
		this.gamelayer.addChild(new UfoA(9000, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new SmallRollingStone(11400, this.canvas.height / 9.0));
		this.gamelayer.addChild(new SmallRollingStone(11900, this.canvas.height / 9.0));
		this.gamelayer.addChild(new UfoA(11000, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new Stone(12300, this.canvas.height / 9.5));
		this.gamelayer.addChild(new SmallRollingStone(12800, this.canvas.height / 9.0));
		this.gamelayer.addChild(new SmallRollingStone(12900, this.canvas.height / 9.0));
		this.gamelayer.addChild(new SmallRollingStone(13000, this.canvas.height / 9.0));
		this.gamelayer.addChild(new UfoA(12400, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new Mina(13950, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(14000, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(14050, this.canvas.height / 9.5));
		this.gamelayer.addChild(new UfoA(13500, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new UfoA(13800, this.canvas.height * 4 / 6));
		
		//Surpresa:UfoB, Planta
		this.gamelayer.addChild(new Planta(15000, this.canvas.height / 10));
		this.gamelayer.addChild(new Stone(15600, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(15900, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Planta(16400, this.canvas.height / 10));
		this.gamelayer.addChild(new Mina(16800, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Planta(17300, this.canvas.height / 10));
		this.gamelayer.addChild(new UfoA(17800, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new Stone(18200, this.canvas.height / 9.5));
		this.gamelayer.addChild(new UfoA(15500, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new UfoB(16000, this.canvas.height * 4 / 6));
		this.gamelayer.addChild(new UfoB(16300, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new UfoB(16600, this.canvas.height * 4 / 6));
		

	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Cut3MarteScene()));
	}

});

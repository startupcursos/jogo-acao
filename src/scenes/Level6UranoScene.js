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
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		var spriteGround = new Ground(0, 0, s_urano_chao);
		this.gamelayer.init(spriteGround, s_bgm_urano);

		var hudLayer = new HudLayer();
		hudLayer.init();
		this.addChild(hudLayer, hudLayer.zOrder);
		this.player = this.gamelayer.player;
		this.enemyPlacement();
		GAME.LASTLEVEL = new Level6UranoScene();
			},
			
	enemyPlacement : function() {
		
		this.gamelayer.addChild(new Stone(1200, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(1250, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(1800, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(1850, this.canvas.height / 9.5));
		this.gamelayer.addChild(new UfoA(2500, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new Stone(2450, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(1500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(1900, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(3200, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(3600, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(2500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new UfoA(3500, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new Stone(4000, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(4500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new UfoA(6000, this.canvas.height * 5 / 6));
		this.gamelayer.addChild(new Mina(6500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(6550, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(7500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(8500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(9000, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(9500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(10000, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Tank(7000, this.canvas.height / 7));
		
			},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Cut7NetunoScene()));
	}

});

var Level1TerraScene = cc.Scene.extend({
	player: null,
	gamelayer: null,
	canvas: null,
	onEnter : function() {		
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();

		var ceuLayer = new TerraCeuLayer();
		this.addChild(ceuLayer, ceuLayer.zOrder);
		ceuLayer.init();

		var solLayer = new TerraSolLayer();
		this.addChild(solLayer, solLayer.zOrder);
		solLayer.init();

		var nuvemLayer = new TerraNuvemLayer();
		this.addChild(nuvemLayer, nuvemLayer.zOrder);
		nuvemLayer.init();
		
		var montanhaLayer = new TerraMontanhaLayer();
		this.addChild(montanhaLayer, montanhaLayer.zOrder);
		montanhaLayer.init();
		
		var desertoLayer = new TerraDesertoLayer();
		this.addChild(desertoLayer, desertoLayer.zOrder);
		desertoLayer.init();
		
		this.gamelayer = new GameLayer();
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		var spriteGround = new Ground(0, 0, s_terra_chao);
		this.gamelayer.init(spriteGround, s_bgm_terra);

		this.enemyPlacement();
		this.player = this.gamelayer.player;
		
		GAME.MUSICDURATIONINSEC = 86;		
		var hudLayer = new HudLayer();
		hudLayer.init();
		this.addChild(hudLayer, hudLayer.zOrder);
		GAME.SCORE = 0;
		
		//Armazeno a última fase carregada
		GAME.LASTLEVEL = new Level1TerraScene();
			
	},
	enemyPlacement : function() {
		this.gamelayer.addChild(new Tank(6000, this.canvas.height / 4));
		this.gamelayer.addChild(new NaveSeguidora(-500, this.canvas.height / 3.5));
		this.gamelayer.addChild(new UfoA(800,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(1200,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new Stone(1600, this.canvas.height / 3.5));
		this.gamelayer.addChild(new LittleStone(2400, this.canvas.height / 4));
		this.gamelayer.addChild(new BigStone(3200, this.canvas.height / 3.3));
		this.gamelayer.addChild(new SmallRollingStone(10000, this.canvas.height / 4));
		this.gamelayer.addChild(new RollingStone(11000, this.canvas.height / 3.5));
		// this.gamelayer.addChild(new HoleSmall(4000, this.canvas.height / 6.5));
		// this.gamelayer.addChild(new HoleBig(4800, this.canvas.height / 6.5));
		this.gamelayer.addChild(new Mina(5600, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Planta(6400, this.canvas.height / 6.5));
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Level1TerraScene()));
	}
});

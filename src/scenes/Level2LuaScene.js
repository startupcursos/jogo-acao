var Level2LuaScene = cc.Scene.extend({
	player: null,
	gamelayer: null,
	canvas: null,
	onEnter : function() {
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();

		var layerCeu = new LuaCeuLayer();
		this.addChild(layerCeu, layerCeu.zOrder);
		layerCeu.init();
		
		var layerMontanhaLonge = new LuaMontanhaLongeLayer();
		this.addChild(layerMontanhaLonge, layerMontanhaLonge.zOrder);
		layerMontanhaLonge.init();

		var layerMontanhaPerto = new LuaMontanhaPertoLayer();
		this.addChild(layerMontanhaPerto, layerMontanhaPerto.zOrder);
		layerMontanhaPerto.init();

		this.gamelayer = new GameLayer();
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		var spriteGround = new Ground(0, 0, s_lua_chao);
		this.gamelayer.init(spriteGround,  s_bgm_lua);
				
		this.enemyPlacement();
		this.player = this.gamelayer.player;
		
		GAME.MUSICDURATIONINSEC = 103;
		var hudLayer = new HudLayer();
		hudLayer.init(230,176,46);
		this.addChild(hudLayer, hudLayer.zOrder);
		
		//Armazeno a última fase carregada
		GAME.LASTLEVEL = new Level2LuaScene();		
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
		this.gamelayer.addChild(new HoleSmall(4000, this.canvas.height / 6.5));
		this.gamelayer.addChild(new HoleBig(4800, this.canvas.height / 6.5));
		this.gamelayer.addChild(new Mina(5600, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Planta(6400, this.canvas.height / 6.5));
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Cut3MarteScene()));
	}

});

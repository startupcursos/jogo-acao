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
		var spriteGround = new Ground(0, 0, s_lua_chao);
		this.gamelayer.ground = spriteGround; 
		this.gamelayer.addChild(spriteGround, spriteGround.zOrder);
		this.addChild(this.gamelayer, this.gamelayer.zOrder);

		this.gamelayer.init();
		this.enemyPlacement();
		this.player = this.gamelayer.player;
		
		var hudLayer = new HudLayer();
		hudLayer.init();
		this.addChild(hudLayer, hudLayer.zOrder);
		GAME.LASTLEVEL = new Level2LuaScene();
	},
	enemyPlacement : function() {
		this.gamelayer.addChild(new HoleSmall(1000, this.canvas.height / 6.5));
		this.gamelayer.addChild(new Stone(2000, this.canvas.height / 3.8));
		this.gamelayer.addChild(new UfoA(800,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(1200,  5 / 6 * this.canvas.height));
	
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new LevelNineScene()));
	}

});

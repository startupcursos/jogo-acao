var Level5SaturnoScene = cc.Scene.extend({
	player: null,
	gamelayer: null,
	canvas: null,
	onEnter : function() {
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();

		var layerCeu = new SaturnoCeuLayer();
		this.addChild(layerCeu, layerCeu.zOrder);
		layerCeu.init();
		
		var layerMontanhaLonge = new SaturnoMontanhaLayer();
		this.addChild(layerMontanhaLonge, layerMontanhaLonge.zOrder);
		layerMontanhaLonge.init();

		var layerCity = new SaturnoCityLayer();
		this.addChild(layerCity, layerCity.zOrder);
		layerCity.init();
		
		this.gamelayer = new GameLayer();
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		var spriteGround = new Ground(0, 0, s_saturno_chao);
		this.gamelayer.init(spriteGround);
		
		
		
		this.enemyPlacement();
		this.player = this.gamelayer.player;
		GAME.LASTLEVEL = new Level5SaturnoScene();
	},
	enemyPlacement : function() {
		/*this.gamelayer.addChild(new Mina1(600, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(1300, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(1800, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(2300, this.canvas.height / 4.5));
		this.gamelayer.addChild(new Mina1(3300, this.canvas.height / 4.5));*/
	
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Level6UranoScene()));
	}

});

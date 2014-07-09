var Level3MarteScene = cc.Scene.extend({
	player: null,
	gamelayer: null,
	canvas: null,
	onEnter : function() {
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();

		var landscapeMarteCeu = new MarteCeuLayer();
		this.addChild(landscapeMarteCeu, landscapeMarteCeu.zOrder);
		landscapeMarteCeu.init();
		
		var landscapeMarteMontanha = new MarteMontanhaLayer();
		this.addChild(landscapeMarteMontanha, landscapeMarteMontanha.zOrder);
		landscapeMarteMontanha.init();
		
		var landscapeMarteEstalagnite = new MarteEstalagniteLayer();
		this.addChild(landscapeMarteEstalagnite, landscapeMarteEstalagnite.zOrder);
		landscapeMarteEstalagnite.init();
				
		this.gamelayer = new GameLayer();
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		var spriteGround = new Ground(0, 0, s_marte_chao);
		this.gamelayer.init(spriteGround);

		this.enemyPlacement();
		this.player = this.gamelayer.player;
		
		var hudLayer = new HudLayer();
		hudLayer.init();
		this.addChild(hudLayer, hudLayer.zOrder);
		GAME.LASTLEVEL = new Level3MarteScene();
	},
	enemyPlacement : function() {
		this.gamelayer.addChild(new UfoA(2000, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoA(2400, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new Stone(5500, this.canvas.height / 3.5));
		this.gamelayer.addChild(new HoleBig(8500, this.canvas.height / 6.5));				
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Cut4JupiterScene()));
	}

});


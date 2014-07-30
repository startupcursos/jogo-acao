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
		this.gamelayer.init(spriteGround, s_bgm_marte);

		this.enemyPlacement();
		this.player = this.gamelayer.player;
		
		var hudLayer = new HudLayer();
		hudLayer.init();
		this.addChild(hudLayer, hudLayer.zOrder);
		GAME.LASTLEVEL = new Level3MarteScene();
	},
	enemyPlacement : function() {
		this.gamelayer.addChild(new UfoA(600, 2 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoB(800, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoA(2000, 3 / 6 * this.canvas.height));
		this.gamelayer.addChild(new Stone(2400, this.canvas.height / 10));
		this.gamelayer.addChild(new UfoB(2400, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new Stone(3300, this.canvas.height / 10));
		this.gamelayer.addChild(new SmallRollingStone(4000, this.canvas.height / 7));
		this.gamelayer.addChild(new SmallRollingStone(4200, this.canvas.height / 7));
		this.gamelayer.addChild(new Mina(3700, this.canvas.height / 9.5));		
		this.gamelayer.addChild(new Stone(4100, this.canvas.height / 11));
		this.gamelayer.addChild(new Stone(4400, this.canvas.height / 11));
		this.gamelayer.addChild(new Stone(4700, this.canvas.height / 11));
		this.gamelayer.addChild(new Mina(5000, this.canvas.height / 9.5));		
		this.gamelayer.addChild(new Mina(5300, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(5500, this.canvas.height / 11));		
		this.gamelayer.addChild(new Tank(7000, this.canvas.height / 7));
		this.gamelayer.addChild(new Mina(7400, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(7800, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(8200, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(8500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(8800, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(9100, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(9400, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Stone(9800, this.canvas.height / 11));
		this.gamelayer.addChild(new UfoA(10500, 4 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoC(10700, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoA(11900, 3 / 6 * this.canvas.height));
		this.gamelayer.addChild(new Stone(12400, this.canvas.height / 11));
		this.gamelayer.addChild(new SmallRollingStone(12900, this.canvas.height / 7));
		this.gamelayer.addChild(new UfoC(13500, 5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoC(13900, 3 / 6 * this.canvas.height));
		this.gamelayer.addChild(new UfoC(14300, 3 / 6 * this.canvas.height));
		this.gamelayer.addChild(new Mina(14700, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(15100, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(15500, this.canvas.height / 9.5));
		this.gamelayer.addChild(new Mina(15900, this.canvas.height / 9.5));
		this.gamelayer.addChild(new SmallRollingStone(17200, this.canvas.height / 7));
		this.gamelayer.addChild(new Stone(17600, this.canvas.height / 11));
		this.gamelayer.addChild(new Stone(18000, this.canvas.height / 11));
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new Cut4JupiterScene()));
	}

});


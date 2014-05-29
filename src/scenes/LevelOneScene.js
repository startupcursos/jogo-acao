var LevelOneScene = cc.Scene.extend({
	player: null,
	gamelayer: null,
	canvas: null,
	onEnter : function() {
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();

		var layerLandscape2 = new Landscape2Layer();
		this.addChild(layerLandscape2, layerLandscape2.zOrder);
		layerLandscape2.init();
		
		var layerLandscape1 = new Landscape1Layer();
		this.addChild(layerLandscape1, layerLandscape1.zOrder);
		layerLandscape1.init();
		
		this.gamelayer = new GameLayer();
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		this.gamelayer.init();
		this.enemyPlacement();
		this.player = this.gamelayer.player;
	},
	enemyPlacement : function() {
		this.gamelayer.addChild(new NaveSeguidora(-500, this.canvas.height / 3.5));
		this.gamelayer.addChild(new UfoA(1000,  5 / 6 * this.canvas.height));
		this.gamelayer.addChild(new Stone(2000, this.canvas.height / 3.5));
		this.gamelayer.addChild(new LittleStone(3000, this.canvas.height / 4));
		this.gamelayer.addChild(new BigStone(4000, this.canvas.height / 3.3));
		this.gamelayer.addChild(new SmallRollingStone(6000, this.canvas.height / 4));
		this.gamelayer.addChild(new RollingStone(7000, this.canvas.height / 3.5));
		this.gamelayer.addChild(new HoleSmall(7000, this.canvas.height / 6.5));
		this.gamelayer.addChild(new HoleBig(8000, this.canvas.height / 6.5));
		/* Está com erro pq na ultima versão do branch não está a imagem no spritesheet */
		//this.gamelayer.addChild(new Mina1(1500, this.canvas.height / 4.5));
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new LevelTwoScene()));
	}
});

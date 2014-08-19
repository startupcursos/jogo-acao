var Level7NetunoScene = cc.Scene.extend({
	player: null,
	gamelayer: null,
	canvas: null,
	onEnter : function() {
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();
		
		//Adds bgm to the cache
		g_resources.push({src:s_bgm_netuno}); 

		var layerCeu = new NetunoCeuLayer();
		this.addChild(layerCeu, layerCeu.zOrder);
		layerCeu.init();
		
		var layerMontanhaLonge = new NetunoMontanhaLayer();
		this.addChild(layerMontanhaLonge, layerMontanhaLonge.zOrder);
		layerMontanhaLonge.init();

		var layerCity = new NetunoCityLayer();
		this.addChild(layerCity, layerCity.zOrder);
		layerCity.init();

		this.gamelayer = new GameLayer();
		this.addChild(this.gamelayer, this.gamelayer.zOrder);
		var spriteGround = new Ground(0, 0, s_netuno_chao);
		this.gamelayer.init(spriteGround, s_bgm_netuno);
	
		this.enemyPlacement();
		this.player = this.gamelayer.player;
		
		GAME.MUSICDURATIONINSEC = 64;
		var hudLayer = new HudLayer();
		hudLayer.init();
		this.addChild(hudLayer, hudLayer.zOrder);
		
		//Armazeno a última fase carregada
		GAME.LASTLEVEL = new Level7NetunoScene();		
	},
	
	enemyPlacement : function() {
		
		//enemy Stone =     this.canvas.height * 0.15
                //enemy Tank =      this.canvas.height * 0.15
                //Enemy Ufo A e B = this.canvas.height * 0.85
		//Enemy Mina =      this.canvas.height * 0.11
                
                var enemy1 = Stone;
		var e1_height = this.canvas.height * 0.15;
                
                var enemy2 = UfoA;
		var e2_height = this.canvas.height * 0.85;
		
                var enemy3 = UfoB;
		var e3_height = this.canvas.height * 0.85;
                
                var enemy4 = Mina;
		var e4_height = this.canvas.height * 0.11;
                
                var enemy5 = Stone;
		var e5_height = this.canvas.height * 0.1;
                
		
		
            /*
		  * fase termina em 18000km colocar inimigos ate 17000
		  *	0 ate 5000 - inimigos pedra e UFOa
		  * 5000 ate 16000 - inimigos mina e UFOb
		  */
					
		this.gamelayer.addChild(new enemy1  (1500, e1_height));
		this.gamelayer.addChild(new enemy1  (1900, e1_height));
		this.gamelayer.addChild(new enemy1  (2100, e1_height));
		this.gamelayer.addChild(new enemy1  (2700, e1_height));
		this.gamelayer.addChild(new enemy1  (3500, e1_height));
		this.gamelayer.addChild(new enemy1  (4000, e1_height));
		this.gamelayer.addChild(new enemy1  (4500, e1_height));
		this.gamelayer.addChild(new enemy1  (5000, e1_height));
		
		this.gamelayer.addChild(new enemy2 (5500,  0.85*   this.canvas.height));
		this.gamelayer.addChild(new enemy2 (8000,  0.85*   this.canvas.height));
		this.gamelayer.addChild(new enemy2 (11000, 0.85*   this.canvas.height));
		this.gamelayer.addChild(new enemy2 (13500, 0.85*   this.canvas.height));
		this.gamelayer.addChild(new enemy2 (16000, 0.85*   this.canvas.height));
		/*
		this.gamelayer.addChild(new enemy3 (1500 +200, 0.85*   this.canvas.height));
		this.gamelayer.addChild(new enemy3 (2000 +200, 0.85*   this.canvas.height));
		this.gamelayer.addChild(new enemy3 (2500 +200, 0.85*   this.canvas.height));
		this.gamelayer.addChild(new enemy3 (3000 +200, 0.85*   this.canvas.height));
		this.gamelayer.addChild(new enemy3 (3500 +200, 0.85*   this.canvas.height));
		this.gamelayer.addChild(new enemy3 (4000 +200, 0.85*   this.canvas.height));
		this.gamelayer.addChild(new enemy3 (4500 +200, 0.85*   this.canvas.height));
		this.gamelayer.addChild(new enemy3 (5000 +200, 0.85*   this.canvas.height));
		*/
		
		this.gamelayer.addChild(new enemy4  (5000  +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (5500  +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (5700  +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (6200  +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (6500  +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (7000  +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (8000  +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (9000  +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (10000 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (10300 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (10350 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (10400 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (10700 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (11000 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (11500 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (12000 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (13000 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (14000 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (14300 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (14700 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (15500 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (16000 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (16250 +250, 0.11*   this.canvas.height));
		this.gamelayer.addChild(new enemy4  (16500 +250, 0.11*   this.canvas.height));
                
	},
	levelFinished : function() {
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new GameOverScene()));
	}

});


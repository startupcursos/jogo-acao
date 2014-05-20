var GameplayScene = cc.Scene.extend({
	player: null,
	onEnter : function() {
		this._super();

		var layerLandscape2 = new Landscape2Layer();
		this.addChild(layerLandscape2, layerLandscape2.zOrder);
		layerLandscape2.init();
		
		var layerLandscape1 = new Landscape1Layer();
		this.addChild(layerLandscape1, layerLandscape1.zOrder);
		layerLandscape1.init();
		
		var gamelayer = new GameLayer();
		this.addChild(gamelayer, gamelayer.zOrder);
		gamelayer.init();
		this.player = gamelayer.player;

	}
});

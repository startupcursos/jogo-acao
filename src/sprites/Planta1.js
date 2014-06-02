var Planta1 = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : 0,
	speedY : 0,
	zOrder : 0,
	ctor : function(x, y) {
		this._super();
		this.setPosition(x, y);
		this.setAnchorPoint(cc.p(0,0));
		//this.init(s_planta_1);
		//this.initialPosition = cc.p(x,y);
		
		//Carrega no Cache as Imagens
		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_spritesheet_plist);
		//Montar um Array com cada quadro da Animação
		var animFrames = [];
		for (var i = 1; i <= 2; i++) {
			var str = "planta" + i + ".png";
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
			animFrames.push(frame);
		}
		this.initWithSpriteFrame(animFrames[0]);
		var animation = cc.Animation.create(animFrames, 0.5);
		var action = cc.RepeatForever.create(cc.Animate.create(animation));
		this.runAction(action);
		GAME.CONTAINER.ENEMIES.push(this);
		
	},
	update : function(dt) {
		if (this.healthPoints <= 0) {
			this.destroy();
		}
		var canvas = cc.Director.getInstance().getWinSize();
		var p0 = this.getPosition();
		var dx = this.speedX * dt;
		var dy = this.speedY * dt;
		var finalP = cc.p(p0.x + dx, p0.y + dy);
		if (finalP.x < 0) {
			this.destroy();
		}
		this.setPosition(finalP);
	},
	destroy : function() {
		this.setVisible(false);
		this.active = false;
		this.stopAllActions();
		var index = GAME.CONTAINER.ENEMIES.indexOf(this);
		if (index > -1) {
			GAME.CONTAINER.ENEMIES.splice(index, 1);
		}
	},
	hurt : function() {
		this.healthPoints--;
	}
});

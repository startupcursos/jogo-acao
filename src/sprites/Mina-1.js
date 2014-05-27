var Mina1 = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : 0,
	speedY : 0,
	zOrder : 0,
	initialPosition: null,
	
	ctor : function(x, y) {
		this._super();
		this.setPosition(x, y);
		this.initialPosition = cc.p(x,y);
		GAME.CONTAINER.ENEMIES.push(this);
		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_spritesheet_plist);
		//Montar um Array com cada quadro da Animação
		var animFrames = [];
		for (var i = 1; i <= 2; i++) {
			var str = "Mina-" + i + ".png";
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
			animFrames.push(frame);
		}
		this.initWithSpriteFrame(animFrames[0]);
		var animation = cc.Animation.create(animFrames, 0.1);
		var action = cc.RepeatForever.create(cc.Animate.create(animation));
		this.runAction(action);
		
		
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
		if (GAME.SOUND) {
			cc.AudioEngine.getInstance().playEffect(s_stone_explosion_sfx);
		}
		this.healthPoints--;
	}
});

var NaveSeguidora = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : GAME.SCROLLING.SPEED_X,
	speedY : 0,
	zOrder : 1,

	_dtOnScreen : null,
	ctor : function(x, y) {
		this._super();
		this.setPosition(x, y);

		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_hover_ship_plist);
		//Montar um Array com cada quadro da Animacao
		var animFrames = [];
		for (var i = 1; i <= 6; i++) {
			var str = "hover_ship-" + i + ".png";
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
			animFrames.push(frame);
		}
		
		this.initWithSpriteFrame(animFrames[0]);
		var animation = cc.Animation.create(animFrames, 1);
		var anim = cc.Animate.create(animation);
		var action = cc.RepeatForever.create(anim);
		var action = (anim);
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
		var temp = 0;
		var finalP = cc.p(p0.x + dx, p0.y + dy);
		
		if (finalP.x > 0 && finalP.x < canvas.width && this._dtOnScreen === null) {
			this._dtOnScreen = 0;
		}
		if (this._dtOnScreen != null) {
			this._dtOnScreen += dt;
		}
		this.setPosition(finalP);
		this.updateSpeed();
		this._dtLastFireV += dt;
	},

	updateSpeed : function() {
		if (typeof this._dtOnScreen =='undefined' || this._dtOnScreen < 0.2) {
			this.speedX = GAME.SCROLLING.SPEED_X * 1.5;
		} else if(this._dtOnScreen > 0.2 && this._dtOnScreen < 10) {
			this.speedX = 0;
		} else {
			this.speedX = GAME.SCROLLING.SPEED_X;
		}
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
		GAME.SCORE += 300;
	}
});

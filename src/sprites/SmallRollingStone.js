var SmallRollingStone = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : -1.5*GAME.SCROLLING.SPEED_X,
	speedY : 0,
	zOrder : 10,
	ctor : function(x, y) {
		this._super();
		this.init(s_small_rolling_stone);
		this.setAnchorPoint(0.5,0.5);
		this.setPosition(x, y);
		GAME.CONTAINER.ENEMIES.push(this);
		var actionRotate = cc.RotateBy.create(2, 360).reverse();
		this.runAction(cc.RepeatForever.create(actionRotate));
	},
	update : function(dt) {
		if (this.healthPoints <= 0) {
			this.destroy();
		}
		if (this._dtOnScreen != null) {
			this._dtOnScreen += dt;
		}
		var canvas = cc.Director.getInstance().getWinSize();
		var p0 = this.getPosition();
		if (this.active) {
			var dx = this.speedX * dt;
			var dy = this.speedY * dt;
			this.fireTimes();
		} else {
			var dx = -GAME.SCROLLING.SPEED_X * dt;
			var dy = -GAME.SCROLLING.SPEED_Y * dt;
		}
		var finalP = cc.p(p0.x + dx, p0.y + dy);
		if (finalP.x > 0 && finalP.x < canvas.width && this._dtOnScreen === null) {
			this._dtOnScreen = 0;
			this.active = true;
		}
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
		GAME.SCORE += 250;
	}
});

var NaveSeguidora = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : GAME.SCROLLING.SPEED_X * 2,
	speedY : 0,
	zOrder : 1,

	_dtOnScreen : null,
	ctor : function(x, y) {
		this._super();
		this.setPosition(x, y);

		this.init(s_naveseguidora);
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
		/*
		 if (finalP.x < 0) {
		 this.destroy();
		 }
		 */
		if (finalP.x - GAME.SCROLLING.TOTAL < canvas.width && this._dtOnScreen === null) {
			this._dtOnScreen = 0;
		}
		if (this._dtOnScreen != null) {
			this._dtOnScreen += dt;
			//this.fireTimes();
		}
		this.setPosition(finalP);
		this.updateSpeed();
		this._dtLastFireV += dt;
	},

	updateSpeed : function() {

		if (this._dtOnScreen < 50) {
			if (this.getPosition().x - GAME.SCROLLING.TOTAL > 50) {
				this.speedX = GAME.SCROLLING.SPEED_X;
				this.speedY = 0;
			} else if (this.getPosition().x - GAME.SCROLLING.TOTAL > 600 && this.speedX > 60) {
				this.speedX = GAME.SCROLLING.SPEED_X * 2;
				this.speedY = 0;
			}
		} else {
			this.speedX = GAME.SCROLLING.SPEED_X * 2;
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

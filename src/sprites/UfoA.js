var UfoA = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : -GAME.SCROLLING.SPEED_X / 3,
	speedY : -5,
	zOrder : 1,
	rpsGunV : 1,
	_dtLastFireV : 1,
	_dtOnScreen : null,
	ctor : function(x, y) {
		this._super();
		this.setPosition(x, y);
		
		//Carrega no Cache as Imagens
		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_ufo_a_spritesheet_plist);
		//Montar um Array com cada quadro da Animação
		var animFrames = [];
		for (var i = 1; i <= 2; i++) {
			var str = "ufo-a-" + i + ".png";
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
			animFrames.push(frame);
		}
		this.initWithSpriteFrame(animFrames[0]);
		var animation = cc.Animation.create(animFrames, 0.1);
		var action =(cc.Animate.create(animation));
		this.runAction(cc.RepeatForever.create(action));

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
		if (finalP.x > 0 && finalP.x < canvas.width && this._dtOnScreen === null) {
			this._dtOnScreen = 0;
		}
		if (this._dtOnScreen != null) {
			this._dtOnScreen += dt;
			this.fireTimes();	
		}
		this.setPosition(finalP);
		this.updateSpeed();
		this._dtLastFireV += dt;
	},
	fireTimes : function() {
		if (this._dtOnScreen > 1 && this._dtOnScreen < 2) {
			this.fireV();
		}
		else if (this._dtOnScreen > 5 && this._dtOnScreen < 6) {
			this.fireV();
		}
		else if (this._dtOnScreen > 10 && this._dtOnScreen < 11) {
			this.fireV();
		}
		else if (this._dtOnScreen > 15 && this._dtOnScreen < 16) {
			this.fireV();
		}
		
	},
	updateSpeed : function() {
		if (this.getPosition().x < 150) {
			this.speedX = GAME.SCROLLING.SPEED_X * 2;
			this.speedY = 10;
		} else if (this.getPosition().x > 600 && this.speedX > 60) {
			this.speedX = GAME.SCROLLING.SPEED_X / 3;
			this.speedY = -5;
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
	fireV : function() {
		if (this._dtLastFireV > 1 / this.rpsGunV) {
			this._dtLastFireV = 0;
			var bullet = new EnemyBulletV(this.getPosition().x, this.getPosition().y);
			this.getParent().addChild(bullet, bullet.zOrder);
		}
	},
	hurt : function() {
		this.healthPoints--;
		GAME.SCORE += 200;
	}
});

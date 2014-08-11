var UfoB = cc.Sprite.extend({
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
		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_ufo_b_spritesheet_plist);
		//Montar um Array com cada quadro da Animação
		var animFrames = [];
		for (var i = 1; i <= 4; i++) {
			var str = "UfoB-" + i + ".png";
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
		if (this._dtOnScreen != null) {
			this._dtOnScreen += dt;

		}
		var canvas = cc.Director.getInstance().getWinSize();
		var p0 = this.getPosition();
		if (this.active) {
			var dx = this.speedX * dt;
			var dy = this.speedY * dt;
			this.updateSpeed();
			this._dtLastFireV += dt;
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
	fireTimes : function() {
		if (this._dtOnScreen > 1 && this._dtOnScreen < 2) {
			this.fireV();
		}
		else if (this._dtOnScreen > 6 && this._dtOnScreen < 7) {
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
                
                //Remove from canvas
		this.setVisible(false);
		this.active = false;
		this.stopAllActions();
                
                //Particle Explosion Call
                var pos_x = this.getPosition().x;
		var pos_y = this.getPosition().y;
		var explode = new ParticleExplosion(pos_x, pos_y);
		this.getParent().addChild(explode);
                
                //Remove from index
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
		GAME.SCORE += 300;
	}
});

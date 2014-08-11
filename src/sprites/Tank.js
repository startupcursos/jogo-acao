var Tank = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : -GAME.SCROLLING.SPEED_X,
	speedY : 0,
	zOrder : 1,
	rpsGunH : 1,
	_dtLastFireH : 1,
	_dtOnScreen : null,
	
	ctor : function(x, y) {
		this._super();
		this.init(s_tank);
		this.setAnchorPoint(0.5,0.5);
		this.setPosition(x, y);
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
		if (finalP.x - GAME.SCROLLING.TOTAL < canvas.width && this._dtOnScreen === null) {
			this._dtOnScreen = 0;
		}
		if (this._dtOnScreen !== null) {
			this._dtOnScreen += dt;
			//this.fireTimes();
			this.Fogo();			
		}
		this.setPosition(finalP);
		
		
		
		this._dtLastFireH += dt;
		this.time += dt;
		this.fireTimes();
		
		
	},
	
	Fogo : function(){
		
		if(this.time >= 1.5 ){
			this.time = 0;
			this.fireV();
		}
	},
	
	
	fireTimes : function() {
		if (this._dtOnScreen > 1 && this._dtOnScreen < 2) {
			
			this.fireV();
		}
			
	},
	
	destroy : function() {
		
                //Remove sprite from canvas
                this.setVisible(false);
		this.active = false;
		this.stopAllActions();
		
                //Create Particle Effect
                var pos_x = this.getPosition().x;
		var pos_y = this.getPosition().y;
		var explode = new ParticleExplosion(pos_x, pos_y);
		this.getParent().addChild(explode);
		
                //Remove from Enemy Index
		var index = GAME.CONTAINER.ENEMIES.indexOf(this);
		if (index > -1) {
			GAME.CONTAINER.ENEMIES.splice(index, 1);
		}
	},
	fireV : function() {
		if (this._dtLastFireH > 1 / this.rpsGunH) {
			this._dtLastFireH = 0;
			var bullet = new EnemyBulletH(this.getPosition().x -80, this.getPosition().y +20);
			this.getParent().addChild(bullet, bullet.zOrder);
		}
	},
	hurt : function() {
		this.healthPoints--;
	}
});
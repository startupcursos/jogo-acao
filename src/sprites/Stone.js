  var Stone = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : -GAME.SCROLLING.SPEED_X,
	speedY : 0,
	zOrder : 0,
	ctor : function(x, y) {
		this._super();
		this.init(s_stone);
		this.setAnchorPoint( 1.5 , 1.5);
		this.setPosition(cc.p(x, y));
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
            
                //Remove from canvas
		this.setVisible(false);
		this.active = false;
		this.stopAllActions();
                
		//Particle Explosion
                var pos_x = this.getPosition().x;
		var pos_y = this.getPosition().y;
		var explode = new ParticleGalaxy(pos_x, pos_y);
		this.getParent().addChild(explode);
            
                //Enemy Index Remove
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
		GAME.SCORE += 100;
	}
});
/**
 * @author AndreBechara
 */
var BulletV = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : 0,
	speedY : 600,
	zOrder : 0,
	
	
	ctor : function(x,y) {
		this._super();
		this.setPosition(x, y);
		this.init(s_bullet_v);
		GAME.CONTAINER.PLAYER_BULLETS.push(this);
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
		this.setPosition(finalP);
		if (finalP.y > canvas.height) {
			this.destroy();
		}
	},
	
	
	
	destroy : function() {
		this.setVisible(false);
		this.active = false;
		this.stopAllActions();
		var index = GAME.CONTAINER.PLAYER_BULLETS.indexOf(this);
		if (index > -1) {
			GAME.CONTAINER.PLAYER_BULLETS.splice(index, 1);
		}
	},
	hurt : function() {
		this.healthPoints--;
	}
});

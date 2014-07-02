/**
 * @author AndreBechara
 */

 var EnemyBulletH = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : -1.5 * GAME.SCROLLING.SPEED_X,
	speedY : 0,
	zOrder : 0,
	
	ctor : function(x,y) {
		this._super();
		this.setPosition(x, y);
		this.init(s_bullet_h);
		
	
		
		GAME.CONTAINER.ENEMIES_BULLETS.push(this);
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
		if (finalP.x - GAME.SCROLLING.TOTAL > canvas.width) {
			this.destroy();
		}
	},
	destroy : function() {
		this.setVisible(false);
		this.active = false;
		this.stopAllActions();
		var index = GAME.CONTAINER.ENEMIES_BULLETS.indexOf(this);
		if (index > -1) {
			GAME.CONTAINER.ENEMIES_BULLETS.splice(index, 1);
		}
	},
	hurt : function() {
		this.healthPoints--;
	}
});
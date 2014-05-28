/**
 * @author AndreBechara
 */
var Buggy = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : 180,
	speedY : 0,
	zOrder : 1,
	ctor : function(x, y) {
		this._super();
		this.init(s_buggy);
		this.setPosition(x, y);

	},
	update : function(dt) {
		var canvas = cc.Director.getInstance().getWinSize();
		var p = this.getPosition();
		if ((p.x < 0 || p.x > canvas.width) && (p.y < 0 || p.y > canvas.height)) {
			this.active = false;
		}
		if (this.healthPoints <= 0) {
			this.active = false;
			this.destroy();
		}
	},
	destroy : function() {
		this.setVisible(false);
		this.active = false;
		this.stopAllActions();
	},
	hurt : function() {
		this.healthPoints--;
	},
	jump : function() {
		if (this.getNumberOfRunningActions() === 0) {
			var jumpUp = cc.JumpBy.create(2, cc.p(0, 0), 120, 1);
			this.runAction(jumpUp);
		}
	},
	fireV : function() {
		return new BulletV(this.getPosition().x - 25, this.getPosition().y + 15);
	},
	
	fireH : function() {
		return new BulletH(this.getPosition().x + 25, this.getPosition().y + 3);
	},
});

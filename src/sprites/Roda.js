var Roda = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : GAME.SCROLLING.SPEED_X,
	speedY : 0,
	zOrder : 2,
	ctor : function(x, y) {
		this._super();
		this.setPosition(x, y);
		this.init(s_roda);
		var actionRotate = cc.RotateBy.create(2, 360);
		this.runAction(cc.RepeatForever.create(actionRotate));
	},
	update : function(dt) {
		var p0 = this.getPosition();
		var dx = this.speedX * dt;
		var dy = this.speedY * dt;
		var finalP = cc.p(p0.x + dx, p0.y + dy);
		this.setPosition(finalP);
	},
	destroy : function() {
		this.setVisible(false);
		this.active = false;
		this.stopAllActions();
	},
	hurt : function() {
		this.healthPoints--;
	}
});
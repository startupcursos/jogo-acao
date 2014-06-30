var Roda = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : GAME.SCROLLING.SPEED_X,
	speedY : 0,
	zOrder : 2,
	dy0:25, 
	ctor : function(x, yBuggy) {
		this._super();
		this.setPosition(x, yBuggy - this.dy0);
		this.init(s_roda);
		var actionRotate = cc.RotateBy.create(2, 360);
		this.runAction(cc.RepeatForever.create(actionRotate));
	},
	update : function(dt) {
		var p0 = this.getPosition();
		var dx = this.speedX * dt;
		var dy = this.speedY * dt;
		var finalP = cc.p(p0.x + dx, p0.y + dy);
		if (this.getParent().player.getPosition().y - finalP.y > this.dy0 * 1.1) 
			finalP = cc.p(p0.x + dx, this.getParent().player.getPosition().y * 1.1);
		if (this.getParent().player.getPosition().y - finalP.y < this.dy0 * 0.9) 
			finalP = cc.p(p0.x + dx, this.getParent().player.getPosition().y * 0.9);
		this.setPosition(finalP);
	},
	destroy : function() {
		// this.setVisible(false);
		this.speedX = 0;
		this.active = false;
		this.stopAllActions();
	},
	hurt : function() {
		this.healthPoints--;
	},
	getBoundingCircleRadius : function() {
		return Math.sqrt(((this.getContentSize().width / 2 * this.getContentSize().width / 2) + (this.getContentSize().height / 2 * this.getContentSize().height / 2)));
	},
	drawBoundingCircle : function() {
        cc.drawingUtil.setLineWidth(5);
        cc.drawingUtil.setDrawColor4B(255,255,255,255);
		var radius = this.getBoundingCircleRadius();
        cc.drawingUtil.drawCircle(this.getPosition(), radius, 360, 10, false);
	}
});

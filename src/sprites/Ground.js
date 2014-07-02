var Ground = cc.Sprite.extend({
	active : true,
	zOrder : 0,
	speedX : -GAME.SCROLLING.SPEED_X,
	speedY : 0,
	_scroll: 0,
	canvas: null,
	ctor : function(x, y) {
		this._super();
		this.setPosition(x, y);
		this.init(s_ground);
		this.setAnchorPoint(cc.p(0,0));
		this.canvas = cc.Director.getInstance().getWinSize();
	},
	update : function(dt) {
		var p0 = this.getPosition();
		var dx = this.speedX * dt;
		var dy = this.speedY * dt;
		var finalP = cc.p(p0.x + dx, p0.y + dy);
		this.setPosition(finalP);
		this.infiniteScrolling(dt);
	},
	infiniteScrolling : function(dt) {
		if (this.getPosition().x <= -this.canvas.width) {
			this.setPosition(cc.p(this.getPosition().x + this.canvas.width,0));
		}
	}
});

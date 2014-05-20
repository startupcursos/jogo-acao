var Ground = cc.Sprite.extend({
	active : true,
	zOrder : 0,
	speedX : 0,
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
		this._scroll += dt * this.getParent().player.speedX;
		this.infiniteScrolling(dt);
	},
	infiniteScrolling : function(dt) {
		if (this._scroll > this.canvas.width) {
			this._scroll -= this.canvas.width;
			this.setPosition(cc.p(this.getPosition().x + this.canvas.width,0));
		}
	}
});

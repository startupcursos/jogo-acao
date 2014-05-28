var Ground_moon = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : 400,
	speedY : 0,
	zOrder : 0,
	ctor : function(x, y) {
		this._super();
		this.setPosition(x, y);
		this.init(s_ground_moon);

	},

	destroy : function() {
		this.setVisible(false);
		this.active = false;
		this.stopAllActions();
	},

	GroundCreate : function() {

		this.ground_moon = cc.Sprite.create(s_ground_moon);
		this.addChild(this.ground_moon, 0);
		this.ground_moon.setPosition(800, 300);

		alert("func GroundCreate");

	},

	GroundScrolling : function() {

		var groundScroll = cc.MoveTo.create(5, cc.p(-100, 300));
		this.ground_moon.runAction(groundScroll);
		this.ground_moon.active = true;

		if (this.ground_moon.getPosition().x <= -40) {
			alert("GroundScrollingOK");

		}
	},
	/*update : function(dt) {

	 var canvas = cc.Director.getInstance().getWinSize();
	 var p0 = this.getPosition();
	 var dx = this.speedX * dt;
	 var dy = this.speedY * dt;
	 var finalP = cc.p(p0.x + dx, p0.y + dy);

	 this.setPosition(finalP);

	 },*/

});

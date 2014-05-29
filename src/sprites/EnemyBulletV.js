/**
 * @author AndreBechara
 */
var EnemyBulletV = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : 250,
	speedY : -GAME.SCROLLING.SPEED_X * 3,
	zOrder : 0,
	initialPosition: null,
	ctor : function(x,y) {
		this._super();
		this.setPosition(x, y);
		this.initialPosition = cc.p(x,y);
		
		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_spritesheet_plist);
		//Montar um Array com cada quadro da Animação
		var animFrames = [];
		for (var i = 1; i <= 2; i++) {
			var str = "enemyrocket-" + i + ".png";
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
			animFrames.push(frame);
		}
		this.initWithSpriteFrame(animFrames[0]);
		var animation = cc.Animation.create(animFrames, 0.1);
		var action =(cc.Animate.create(animation));
		this.runAction(action);
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
		if (finalP.y < 0) {
			this.destroy();
		
			
		}
		
	},
	
	explosion : function() {
	
	cc.SpriteFrameCache.getInstance().addSpriteFrames(s_spritesheet_plist);
		//Montar um Array com cada quadro da Animação
		var animFrames = [];
		for (var i = 1; i <= 11; i++) {
			var str = "explosion-" + i + ".png";
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
			animFrames.push(frame);
		}
		
		
		
		this.initWithSpriteFrame(animFrames[0]);
		var animation = cc.Animation.create(animFrames, 0.1/2);
		//var action = cc.RepeatForever.create(cc.Animate.create(animation));
		var action = (cc.Animate.create(animation));
		this.runAction(action);
	//	this.explosion(true);
	
	
		
	},
	destroy : function() {
		
		this.explosion();
		
	//if(this.explosion(true)){
		//this.action.hurt();
		//this.setVisible(false);
		this.active = false;
		//this.stopAllActions();
		
		
		var index = GAME.CONTAINER.ENEMIES_BULLETS.indexOf(this);
		if (index > -1) {
			GAME.CONTAINER.ENEMIES_BULLETS.splice(index, 1);
		}
		//}
	},
	hurt : function() {
		this.healthPoints--;
	}
});

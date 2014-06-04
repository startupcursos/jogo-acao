/**
 * @author AndreBechara
 */
var BulletH = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : GAME.SCROLLING.SPEED_X * 3,
	speedY : 0,
	zOrder : 0,
	initialPosition: null,
	ctor : function(x,y) {
		this._super();
		this.setPosition(x, y);
		this.initialPosition = cc.p(x,y);
		
		//Carrega no Cache as Imagens
		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_spritesheet_plist);
		//Montar um Array com cada quadro da Animação
		var animFrames = [];
		for (var i = 1; i <= 2; i++) {
			var str = "rocket-" + i + ".png";
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
			animFrames.push(frame);
		}
		this.initWithSpriteFrame(animFrames[0]);
		var animation = cc.Animation.create(animFrames, 0.1);
		var action =(cc.Animate.create(animation));
		this.runAction(action);
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
		if (finalP.x - GAME.SCROLLING.TOTAL > canvas.width - canvas.width/5) {
			
			this.explode();
			//this.explosion();
			
			
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
		var action = cc.Animate.create(animation);
		this.runAction(action);
	//	this.explosion(true);
	
	this.speedX = 0;
		
	},
	
	
	
	
	
	explode : function(){
		
		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_explosion_anim_plist);
		//Montar um Array com cada quadro da Animação
		var animFrames2 = [];
		for (var i = 1; i <= 12; i++) {
			var str2 = "explosion_bullet" + i + ".png";
			var frame2 = cc.SpriteFrameCache.getInstance().getSpriteFrame(str2);
			animFrames2.push(frame2);
		}
		this.initWithSpriteFrame(animFrames2[0]);
		var animation2 = cc.Animation.create(animFrames2, 0.05);
		//var action2 = cc.Animate.create(animation2);
		var action2 = (cc.Animate.create(animation2));
		this.runAction(action2);
		//this.explode().active = true;
		
		this.speedX = 0;
		
		
		
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
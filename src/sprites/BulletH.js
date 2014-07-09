/**
 * @author AndreBechara
 */
var BulletH = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : GAME.SCROLLING.SPEED_X * 2,
	speedY : 0,
	zOrder : 0,
	initialPosition: null,
	timerExplosao: 1,
	ctor : function(x,y) {
		this._super();
		this.setPosition(x, y);
		this.initialPosition = cc.p(x,y);
		
		//Carrega no Cache as Imagens
		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_rocket_plist);
		//Montar um Array com cada quadro da Animação
		var animFrames = [];
		for (var i = 1; i <= 4; i++) {
			var str = "rocket-" + i + ".png";
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
			animFrames.push(frame);
		}
		this.initWithSpriteFrame(animFrames[0]);
		var animation = cc.Animation.create(animFrames, 0.2);
		var action = cc.Animate.create(animation);
		this.runAction(action);
		cc.RepeatForever(action);
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
		
		if (this.timerExplosao != null) {
			this.timerExplosao -= dt;
			if (this.timerExplosao <= 0) {
				this.timerExplosao = null;
				this.explode();
			}
		}
	},	
	
	
	explode : function(){
		
		this.speedX *= -0.5;
		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_explosion_anim_plist);
		//Montar um Array com cada quadro da Animação
		var animFrames2 = [];
		for (var i = 1; i <= 13; i++) {
			var str2 = "explosion_bullet" + i + ".png";
			var frame2 = cc.SpriteFrameCache.getInstance().getSpriteFrame(str2);
			animFrames2.push(frame2);
		}
		
		this.initWithSpriteFrame(animFrames2[0]);
		var animation2 = cc.Animation.create(animFrames2, 0.05);
		var action2 = cc.Sequence.create(cc.Animate.create(animation2), cc.CallFunc.create(this.destroy, this));
		this.runAction(action2);
		
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
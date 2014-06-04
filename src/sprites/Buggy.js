/**
 * @author AndreBechara
 */
var Buggy = cc.Sprite.extend({
	active : true,
	healthPoints : 1,
	speedX : GAME.SCROLLING.SPEED_X,
	speedY : 0,
	zOrder : 1,
	rpsGunV : 3,
	rpsGunH : 1,
	_dtLastFireV : 1,
	_dtLastFireH : 1,
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
			this.destroy();
		}
		var dx = this.speedX * dt;
		var dy = this.speedY * dt;
		var finalP = cc.p(p.x + dx, p.y + dy);
		this.setPosition(finalP);
		this._dtLastFireV += dt;
		this._dtLastFireH += dt;
	},
	destroy : function() {
		// this.setVisible(false);
		this.active = false;
		this.stopAllActions();
		var emitter = cc.ParticleFire.create();
		emitter.setTexture(cc.TextureCache.getInstance().addImage(s_fire));
        emitter.setPosition(this.getPosition());
		this.getParent().addChild(emitter, 10);
        this.speedX = 0;
        GAME.LIFES -= 1;        
        if(GAME.LIFES <= 0){        	
        	cc.AudioEngine.getInstance().stopMusic(s_bgm_1); 
        	cc.AudioEngine.getInstance().playEffect(s_end_game);
        	cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, new EndGameScene()));        	
			return;	
        }
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, GAME.LASTLEVEL)); 
 	},
	hurt : function() {
		this.healthPoints--;
	},
	jump : function() {
		if (this.getNumberOfRunningActions() === 0 && this.active) {
			var jumpUp = cc.JumpBy.create(2, cc.p(0, 0), 120, 1);
			this.runAction(jumpUp);
			if (GAME.SOUND) {
				cc.AudioEngine.getInstance().playEffect(s_jump_sfx);
			}
		}
	},
	fireV : function() {
		if (this._dtLastFireV > 1 / this.rpsGunV && this.active) {
			this._dtLastFireV = 0;
			if (GAME.SOUND) {
				cc.AudioEngine.getInstance().playEffect(s_fire_sfx);
			}
			return new BulletV(this.getPosition().x - 25, this.getPosition().y + 15);
		} else {
			return null;
		}
	},
	fireH : function() {
		if (this._dtLastFireH > 1 / this.rpsGunH && this.active) {
			this._dtLastFireH = 0;
			return new BulletH(this.getPosition().x + 25, this.getPosition().y + 3);
		} else {
			return null;
		}
	}
});

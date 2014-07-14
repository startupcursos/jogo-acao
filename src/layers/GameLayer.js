/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var GameLayer = cc.Layer.extend({
	player : null,
	rodas : null,
	ground : null,
	canvas : null,
	deslocamentoTotal : 0,
	zOrder : 1,
	collisionDetector: null,

	init : function(spriteGround, s_bgm) {
		GAME.CONTAINER.ENEMIES = [];
		GAME.CONTAINER.PLAYER_BULLETS = [];
		GAME.CONTAINER.ENEMIES_BULLETS = [];
		GAME.SCROLLING.TOTAL = 0;
		 

		// 1. super init first
		this._super();
		this.setKeyboardEnabled(true);

		if ('touches' in sys.capabilities) {
			this.setTouchEnabled(true);
		}

		this.canvas = cc.Director.getInstance().getWinSize();
		
		this.ground = spriteGround; 
		this.addChild(spriteGround, spriteGround.zOrder);
		
		this.player = new Buggy(this.canvas.width / 3, this.canvas.height * (GAME.GROUND_HEIGHT_PERC + 0.03));
		this.addChild(this.player, this.player.zOrder);

		this.rodas = [];
		var roda = new Roda(this.player.getPosition().x + 20, this.player.getPosition().y);
		this.rodas.push(roda);
		this.addChild(roda, roda.zOrder);
		roda = new Roda(this.player.getPosition().x - 15, this.player.getPosition().y);
		this.rodas.push(roda);
		this.addChild(roda, roda.zOrder);
		roda = new Roda(this.player.getPosition().x - 50, this.player.getPosition().y);
		this.rodas.push(roda);
		this.addChild(roda, roda.zOrder);

		this.scheduleUpdate();
		if (GAME.SOUND) {
			cc.AudioEngine.getInstance().playMusic(s_bgm, false);
			cc.AudioEngine.getInstance().setMusicVolume(0.1);
			cc.AudioEngine.getInstance().setEffectsVolume(1);
		}
		this.collisionDetector = new CollisionDetector();
	},

	scrolling : function(dt) {
		var ds = GAME.SCROLLING.SPEED_X * dt;
		GAME.SCROLLING.TOTAL += ds;
		if (!cc.AudioEngine.getInstance().isMusicPlaying())
			this.getParent().levelFinished();
	},
	detectCollision : function() {
		//Colisão do avatar com inimigos
		for (var i in GAME.CONTAINER.ENEMIES) {
			var selEnemy = GAME.CONTAINER.ENEMIES[i];
			if (!selEnemy.active)
				continue;
				
			if (this.collisionDetector.areTheSpritesColliding(this.player, selEnemy)) {
				this.player.hurt();
			}
			//Testa a colisão das rodas com inimigos
			for (var j in this.rodas) {
				var selRoda = this.rodas[j];
				if (this.collisionDetector.areTheSpritesColliding(selRoda, selEnemy)) {
					this.player.hurt();
				}
			}
			//Testa das colisão dos projeteis do avatar com os inimigos
			for (var j in GAME.CONTAINER.PLAYER_BULLETS) {
				var selPlayerBullet = GAME.CONTAINER.PLAYER_BULLETS[j];
				if (!selPlayerBullet.active)
					continue;
				if (this.collisionDetector.areTheSpritesColliding(selPlayerBullet, selEnemy)) {
					selPlayerBullet.hurt();
					selEnemy.hurt();
				}
			}
		}
		
		//Testa das colisão dos projeteis do inimigo com o avatar
		for (var i in GAME.CONTAINER.ENEMIES_BULLETS) {
			var selEnemyBullet = GAME.CONTAINER.ENEMIES_BULLETS[i];
			if (!selEnemyBullet.active)
				continue;
			if (this.collisionDetector.areTheSpritesColliding(this.player, selEnemyBullet)) {
				this.player.hurt();
				selEnemyBullet.hurt();
			}

			//Testa das colisão dos projeteis do inimigo com as rodas
			for (var j in this.rodas) {
				var selRoda = this.rodas[j];
				if (this.collisionDetector.areTheSpritesColliding(selRoda, selEnemyBullet)) {
					this.player.hurt();
				}
			}
			//Testa das colisão dos projeteis do inimigo com o chão
			if (this.collisionDetector.areTheSpritesColliding(this.ground, selEnemyBullet)) {
				selEnemyBullet.hurt();
			}
		}
		
		//Testa das colisão das rodas com o chão
		for (var i in this.rodas) {
			var selRoda = this.rodas[i];
			var p0 = selRoda.getPosition();
			if (this.collisionDetector.areTheSpritesColliding(selRoda, this.ground, true)) {
				selRoda.setPosition(cc.p(p0.x, p0.y + 1));
			} else {
				selRoda.setPosition(cc.p(p0.x, p0.y - 2));
			}
		}
	},
	updateActiveUnits : function(dt) {
		var selChild, children = this.getChildren();
		for (var i in children) {
			selChild = children[i];
			if (selChild && selChild.active)
				selChild.update(dt);
		}
	},
	update : function(dt) {
		this.scrolling(dt);
		this.updateActiveUnits(dt);
		this.detectCollision();
	},

	onKeyDown : function(e) {
		if (cc.KEY.space === e) {
			this.player.jump();
		} else if (cc.KEY.comma === e) {
			var vBullet = this.player.fireV();
			if (vBullet != null)
				this.addChild(vBullet, vBullet.zOrder);
			var hBullet = this.player.fireH();
			if (hBullet != null)
				this.addChild(hBullet, hBullet.zOrder);
		}
	}
});


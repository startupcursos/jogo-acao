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
	ground : null,
	canvas : null,
	deslocamentoTotal : 0,
	zOrder : 2,

	init : function() {
		GAME.CONTAINER.ENEMIES = [];
		GAME.CONTAINER.PLAYER_BULLETS = [];
		GAME.CONTAINER.ENEMIES_BULLETS = [];

		// 1. super init first
		this._super();
		if ('touches' in sys.capabilities) {
			this.setTouchEnabled(true);
		} else {
			this.setKeyboardEnabled(true);
		}

		this.canvas = cc.Director.getInstance().getWinSize();
		this.player = new Buggy(this.canvas.width / 3, this.canvas.height / 3);
		this.addChild(this.player, this.player.zOrder);
		this.ground = new Ground(0, 0);
		this.addChild(this.ground, this.ground.zOrder);
		this.levelOne();
		this.scheduleUpdate();
		if (GAME.SOUND) {
			cc.AudioEngine.getInstance().playMusic(s_bgm_1, true);
		}
	},

	levelOne : function() {
		//var enemy = new Ufo1(1000, 5 / 6 * this.canvas.height);
		//this.addChild(enemy, enemy.zOrder);
		this.addChild(new Stone(1200, this.canvas.height / 3.5));
		this.addChild(new LittleStone(1600, this.canvas.height / 4));
		this.addChild(new BigStone(2000, this.canvas.height / 3.3));
		// this.addChild(new Hole(2000, this.canvas.height / 5));
		//this.addChild(new Stone(2600, this.canvas.height / 3.5));
	},
	scrolling : function(dt) {
		var ds = this.player.speedX * dt;
		GAME.SCROLLING.TOTAL += ds;
		var layerPos = this.getPosition();
		var scrolledPos = cc.p((layerPos.x - ds), layerPos.y);
		this.setPosition(scrolledPos);
	},

	// scrolling : function(dt) {
	// var ds = -this.player.speedX * dt;
	// this.deslocamentoTotal += ds;
	// for (var i in GAME.CONTAINER.ENEMIES) {
	// var selEnemy = GAME.CONTAINER.ENEMIES[i];
	// var posSelEnemy = selEnemy.getPosition();
	// var scrollPosSelEnemy = cc.p((posSelEnemy.x + ds), posSelEnemy.y);
	// selEnemy.setPosition(scrollPosSelEnemy);
	// }
	// var posGround = this.ground.getPosition();
	// var newPosX = posGround.x + ds;
	// if (newPosX < -this.canvas.width) {
	// this.ground.setPosition(cc.p(newPosX + this.canvas.width, posGround.y));
	// } else {
	// this.ground.setPosition(cc.p(newPosX, posGround.y));
	// }
	// },
	detectCollision : function() {
		//Player Collisions com inimigos
		var bboxPlayer = this.player.getBoundingBox();
		for (var i in GAME.CONTAINER.ENEMIES) {
			var selEnemy = GAME.CONTAINER.ENEMIES[i];
			if (!selEnemy.active)
				continue;
			var bboxSelEnemy = selEnemy.getBoundingBox();
			if (cc.rectIntersectsRect(bboxPlayer, bboxSelEnemy)) {
				this.player.hurt();
			}
			for (var j in GAME.CONTAINER.PLAYER_BULLETS) {
				var selPlayerBullet = GAME.CONTAINER.PLAYER_BULLETS[j];
				if (!selPlayerBullet.active)
					continue;
				var bboxPlayerBullet = selPlayerBullet.getBoundingBox();
				if (cc.rectIntersectsRect(bboxPlayerBullet, bboxSelEnemy)) {
					selPlayerBullet.hurt();
					selEnemy.hurt();
				}
			}
		}
		var bboxGround = this.ground.getBoundingBox();
		for (var i in GAME.CONTAINER.ENEMIES_BULLETS) {
			var selEnemyBullet = GAME.CONTAINER.ENEMIES_BULLETS[i];
			if (!selEnemyBullet.active)
				continue;
			var bboxSelEnemyBullet = selEnemyBullet.getBoundingBox();
			if (cc.rectIntersectsRect(bboxPlayer, bboxSelEnemyBullet)) {
				this.player.hurt();
				selEnemyBullet.hurt();
			}
			if (cc.rectIntersectsRect(bboxGround, bboxSelEnemyBullet)) {
				selEnemyBullet.hurt();
				var novoBuraco = new Hole(selEnemyBullet.getPosition().x, this.canvas.height / 6);
				this.addChild(novoBuraco, novoBuraco.zOrder);
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
		this.detectCollision();
		this.updateActiveUnits(dt);
		this.scrolling(dt);
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


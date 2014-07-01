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

var TerraNuvemLayer = cc.Layer.extend({
	canvas : null,
	zOrder : -3,
	_scrollSpeed : null,
	init : function() {
		// 1. super init first
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();
		var spriteMountain = cc.Sprite.create(s_terra_nuvem);
		spriteMountain.setAnchorPoint(0,0);
		spriteMountain.setPosition(cc.p(0,0));
		this.addChild(spriteMountain);
		this.scheduleUpdate();
	},
	update : function(dt) {
		this._scrollSpeed = this.getParent().player.speedX / 8;
		this.scrolling(dt);
		
	},
	scrolling : function(dt) {
		var ds = this._scrollSpeed * dt;
		var layerPos = this.getPosition();
		var scrolledPos = cc.p((layerPos.x - ds), layerPos.y);
		this.setPosition(scrolledPos);
		if (scrolledPos.x < -this.canvas.width) {
			this.setPosition(cc.p(scrolledPos.x + this.canvas.width, 0));
		}

	}
});


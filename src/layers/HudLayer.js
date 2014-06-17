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

var HudLayer = cc.Layer.extend({
	canvas : null,
	zOrder : 10,
	labelScore: null,
	labelLife: null,
	init : function() {
		this._super();
		this.canvas = cc.Director.getInstance().getWinSize();
		this.labelScore = cc.LabelTTF.create("SCORE: 0", "Impact", 14);
        this.labelScore.setPosition(this.canvas.width - 60, this.canvas.height - 30);
        this.addChild(this.labelScore);
   		this.labelLife = cc.LabelTTF.create("LIFE: 0", "Impact", 14);        
        this.labelLife.setPosition(this.canvas.width - 150, this.canvas.height - 30);
        this.addChild(this.labelLife);
		this.scheduleUpdate();
	},
	update : function(dt) {
		this.labelScore.setString("SCORE: " + GAME.SCORE);
		this.labelLife.setString("LIFE: " + GAME.LIFES);
	}
});


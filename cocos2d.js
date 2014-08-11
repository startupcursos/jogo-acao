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
(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:0, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        chipmunk:false,
        showFPS:true,
        loadExtension:false,
        frameRate:60,
        renderMode:2,       //Choose of RenderMode: 0(default), 1(Canvas only), 2(WebGL only)
        tag:'gameCanvas', //the dom element to run cocos2d on
        engineDir:'libs/cchtml5/cocos2d/',
        //SingleEngineFile:'',
        appFiles:[
            'src/resource.js',
            'src/config/GameConfig.js',
            'src/util/CollisionDetector.js',
            'src/sprites/NaveSeguidora.js',
            'src/sprites/BigStone.js',
            'src/sprites/Buggy.js',
            'src/sprites/BulletH.js',
            'src/sprites/BulletV.js',
            'src/sprites/EnemyBulletV.js',
            'src/sprites/EnemyBulletV2.js',
            'src/sprites/HoleSmall.js',
            'src/sprites/HoleBig.js',
            'src/sprites/HoleUfoC.js',
            'src/sprites/Ground.js',
            'src/sprites/Mina.js',
            'src/sprites/RollingStone.js',
            'src/sprites/Roda.js',
            'src/sprites/Tank.js',
            'src/sprites/EnemyBulletH.js',
            'src/sprites/SmallRollingStone.js',
            'src/sprites/Stone.js',
            'src/sprites/UfoC.js',
            'src/sprites/Planta.js',
            'src/sprites/UfoB.js',
            'src/sprites/UfoA.js',
            'src/layers/GameLayer.js',
            'src/layers/HudLayer.js',
            'src/layers/TerraCeuLayer.js',
            'src/layers/TerraDesertoLayer.js',
            'src/layers/TerraMontanhaLayer.js',
            'src/layers/TerraNuvemLayer.js',
            'src/layers/TerraSolLayer.js',
            'src/layers/LuaCeuLayer.js',
            'src/layers/LuaMontanhaLongeLayer.js',
            'src/layers/LuaMontanhaPertoLayer.js',
            'src/layers/MarteCeuLayer.js',
            'src/layers/MarteMontanhaLayer.js',
            'src/layers/MarteEstalagniteLayer.js',            
            'src/layers/JupiterCeuLayer.js',
            'src/layers/JupiterMontanhaLongeLayer.js',
            'src/layers/JupiterMontanhaPertoLayer.js',
            'src/layers/UranoCeuLayer.js',
            'src/layers/UranoMontanhaLongeLayer.js',
            'src/layers/UranoMontanhaPertoLayer.js', 
            'src/layers/VenusCeuLayer.js',
            'src/layers/VenusMontanhaLongeLayer.js',
            'src/layers/VenusMontanhaPertoLayer.js',              
            'src/layers/NetunoCeuLayer.js',
            'src/layers/NetunoMontanhaLayer.js',
            'src/layers/NetunoCityLayer.js', 
            'src/layers/SaturnoCeuLayer.js',
            'src/layers/SaturnoMontanhaLayer.js',
            'src/layers/SaturnoCityLayer.js',             
            'src/sprites/LittleStone.js',
            'src/scenes/Level1TerraScene.js',
            'src/scenes/Level2LuaScene.js',
            'src/scenes/Level3MarteScene.js',
            'src/scenes/Level4JupiterScene.js',
            'src/scenes/Level5SaturnoScene.js',
            'src/scenes/Level6UranoScene.js',
            'src/scenes/Level7NetunoScene.js',

            'src/scenes/Level8VenusScene.js',
            'src/scenes/Cut8VenusScene.js',

            'src/scenes/Cut2LuaScene.js',
            'src/scenes/Cut3MarteScene.js',
            'src/scenes/Cut4JupiterScene.js',
            'src/scenes/Cut6UranoScene.js',
            'src/scenes/Cut7NetunoScene.js',
            'src/scenes/Cut5SaturnoScene.js',

            'src/scenes/MainmenuScene.js',
            'src/scenes/PlanetmenuScene.js',
            'src/scenes/SettingsScene.js',
            'src/scenes/GameOverScene.js'
        ]
    };

    if(!d.createElement('canvas').getContext){
        var s = d.createElement('div');
        s.innerHTML = '<h2>Your browser does not support HTML5 canvas!</h2>' +
            '<p>Google Chrome is a browser that combines a minimal design with sophisticated technology to make the web faster, safer, and easier.Click the logo to download.</p>' +
            '<a href="http://www.google.com/chrome" target="_blank"><img src="http://www.google.com/intl/zh-CN/chrome/assets/common/images/chrome_logo_2x.png" border="0"/></a>';
        var p = d.getElementById(c.tag).parentNode;
        p.style.background = 'none';
        p.style.border = 'none';
        p.insertBefore(s,d.getElementById(c.tag));

        d.body.style.background = '#ffffff';
        return;
    }


    window.addEventListener('DOMContentLoaded', function () {
        this.removeEventListener('DOMContentLoaded', arguments.callee, false);
        //first load engine file if specified
        var s = d.createElement('script');
        /*********Delete this section if you have packed all files into one*******/
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        /*********Delete this section if you have packed all files into one*******/

            //s.src = 'myTemplate.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

        d.body.appendChild(s);
        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        //else if single file specified, load singlefile
    });
})();

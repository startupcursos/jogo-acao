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

/**
 * resource type
 * @constant
 * @type Object
 */
cc.RESOURCE_TYPE = {
    "IMAGE": ["png", "jpg", "bmp","jpeg","gif"],
    "SOUND": ["mp3", "ogg", "wav", "mp4", "m4a"],
    "XML": ["plist", "xml", "fnt", "tmx", "tsx"],
    "BINARY": ["ccbi"],
    "FONT": "FONT",
    "TEXT":["txt", "vsh", "fsh","json", "ExportJson"],
    "UNKNOW": []
};

/**
 * A class to pre-load resources before engine start game main loop.
 * @class
 * @extends cc.Scene
 */
cc.Loader = cc.Class.extend(/** @lends cc.Loader# */{
    _curNumber: 0,
    _totalNumber: 0,
    _loadedNumber: 0,
    _resouces: null,
    _animationInterval: 1 / 60,
    _interval: null,
    _isAsync: false,

    /**
     * Constructor
     */
    ctor: function () {
        this._resouces = [];
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} selector
     * @param {Object} target
     */
    initWithResources: function (resources, selector, target) {
        if(!resources){
            console.log("resources should not null");
            return;
        }

        if (selector) {
            this._selector = selector;
            this._target = target;
        }

        if ((resources != this._resouces) || (this._curNumber == 0)) {
            this._curNumber = 0;
            this._loadedNumber = 0;
            if (resources[0] instanceof Array) {
                for (var i = 0; i < resources.length; i++) {
                    var each = resources[i];
                    this._resouces = this._resouces.concat(each);
                }
            } else
                this._resouces = resources;
            this._totalNumber = this._resouces.length;
        }

        //load resources
        this._schedulePreload();
    },

    setAsync: function (isAsync) {
        this._isAsync = isAsync;
    },

    /**
     * Callback when a resource file load failed.
     * @example
     * //example
     * cc.Loader.getInstance().onResLoaded();
     */
    onResLoadingErr: function (name) {
        this._loadedNumber++;
        cc.log("cocos2d:Failed loading resource: " + name);
    },

    /**
     * Callback when a resource file loaded.
     * @example
     * //example
     * cc.Loader.getInstance().onResLoaded();
     */
    onResLoaded: function () {
        this._loadedNumber++;
    },

    /**
     * Get loading percentage
     * @return {Number}
     * @example
     * //example
     * cc.log(cc.Loader.getInstance().getPercentage() + "%");
     */
    getPercentage: function () {
        var percent = 0;
        if (this._totalNumber == 0) {
            percent = 100;
        } else {
            percent = (0 | (this._loadedNumber / this._totalNumber * 100));
        }
        return percent;
    },

    /**
     * release resources from a list
     * @param resources
     */
    releaseResources: function (resources) {
        if (resources && resources.length > 0) {
            var sharedTextureCache = cc.TextureCache.getInstance();
            var sharedEngine = cc.AudioEngine ? cc.AudioEngine.getInstance() : null;
            var sharedParser = cc.SAXParser.getInstance();
            var sharedFileUtils = cc.FileUtils.getInstance();

            var resInfo;
            for (var i = 0; i < resources.length; i++) {
                resInfo = resources[i];
                var type = this._getResType(resInfo);
                switch (type) {
                    case "IMAGE":
                        sharedTextureCache.removeTextureForKey(resInfo.src);
                        break;
                    case "SOUND":
                        if(!sharedEngine) throw "Can not find AudioEngine! Install it, please.";
                        sharedEngine.unloadEffect(resInfo.src);
                        break;
                    case "XML":
                        sharedParser.unloadPlist(resInfo.src);
                        break;
                    case "BINARY":
                        sharedFileUtils.unloadBinaryFileData(resInfo.src);
                        break;
                    case "TEXT":
                        sharedFileUtils.unloadTextFileData(resInfo.src);
                        break;
                    case "FONT":
                        this._unregisterFaceFont(resInfo);
                        break;
                    default:
                        throw "cocos2d:unknown filename extension: " + type;
                        break;
                }
            }
        }
    },

    _preload: function () {
        this._updatePercent();
        if (this._isAsync) {
            var frameRate = cc.Director.getInstance()._frameRate;
            if (frameRate != null && frameRate < 20) {
                cc.log("cocos2d: frame rate less than 20 fps, skip frame.");
                return;
            }
        }

        if (this._curNumber < this._totalNumber) {
            this._loadOneResource();
            this._curNumber++;
        }
    },

    _loadOneResource: function () {
        var sharedTextureCache = cc.TextureCache.getInstance();
        var sharedEngine = cc.AudioEngine ? cc.AudioEngine.getInstance() : null;
        var sharedParser = cc.SAXParser.getInstance();
        var sharedFileUtils = cc.FileUtils.getInstance();

        var resInfo = this._resouces[this._curNumber];
        var type = this._getResType(resInfo);
        switch (type) {
            case "IMAGE":
                sharedTextureCache.addImage(resInfo.src);
                break;
            case "SOUND":
                if(!sharedEngine) throw "Can not find AudioEngine! Install it, please.";
                sharedEngine.preloadSound(resInfo.src);
                break;
            case "XML":
                sharedParser.preloadPlist(resInfo.src);
                break;
            case "BINARY":
                sharedFileUtils.preloadBinaryFileData(resInfo.src);
                break;
            case "TEXT" :
                sharedFileUtils.preloadTextFileData(resInfo.src);
                break;
            case "FONT":
                this._registerFaceFont(resInfo);
                break;
            default:
                throw "cocos2d:unknown filename extension: " + type;
                break;
        }
    },

    _schedulePreload: function () {
        var _self = this;
        this._interval = setInterval(function () {
            _self._preload();
        }, this._animationInterval * 1000);
    },

    _unschedulePreload: function () {
        clearInterval(this._interval);
    },

    _getResType: function (resInfo) {
        var isFont = resInfo.fontName;
        if (isFont != null) {
            return cc.RESOURCE_TYPE["FONT"];
        } else {
            var src = resInfo.src;
            var ext = src.substring(src.lastIndexOf(".") + 1, src.length);

            var index = ext.indexOf("?");
            if(index > 0) ext = ext.substring(0, index);

            for (var resType in cc.RESOURCE_TYPE) {
                if (cc.RESOURCE_TYPE[resType].indexOf(ext) != -1) {
                    return resType;
                }
            }
            return ext;
        }
    },

    _updatePercent: function () {
        var percent = this.getPercentage();

        if (percent >= 100) {
            this._unschedulePreload();
            this._complete();
        }
    },

    _complete: function () {
        if (this._target && (typeof(this._selector) == "string")) {
            this._target[this._selector](this);
        } else if (this._target && (typeof(this._selector) == "function")) {
            this._selector.call(this._target, this);
        } else {
            this._selector(this);
        }

        this._curNumber = 0;
        this._loadedNumber = 0;
        this._totalNumber = 0;
    },

    _registerFaceFont: function (fontRes) {
        var srcArr = fontRes.src;
        var fileUtils = cc.FileUtils.getInstance();
        if (srcArr && srcArr.length > 0) {
            var fontStyle = document.createElement("style");
            fontStyle.type = "text/css";
            document.body.appendChild(fontStyle);

            var fontStr = "@font-face { font-family:" + fontRes.fontName + "; src:";
            for (var i = 0; i < srcArr.length; i++) {
                fontStr += "url('" + fileUtils.fullPathForFilename(encodeURI(srcArr[i].src)) + "') format('" + srcArr[i].type + "')";
                fontStr += (i == (srcArr.length - 1)) ? ";" : ",";
            }
            fontStyle.textContent += fontStr + "};";

            //preload
            //<div style="font-family: PressStart;">.</div>
            var preloadDiv = document.createElement("div");
            preloadDiv.style.fontFamily = fontRes.fontName;
            preloadDiv.innerHTML = ".";
            preloadDiv.style.position = "absolute";
            preloadDiv.style.left = "-100px";
            preloadDiv.style.top = "-100px";
            document.body.appendChild(preloadDiv);
        }
        cc.Loader.getInstance().onResLoaded();
    },

    _unregisterFaceFont: function (fontRes) {
        //todo remove style
    }
});

/**
 * Preload resources in the background
 * @param {Array} resources
 * @param {Function|String} selector
 * @param {Object} target
 * @return {cc.Loader}
 * @example
 * //example
 * var g_mainmenu = [
 *    {src:"res/hello.png"},
 *    {src:"res/hello.plist"},
 *
 *    {src:"res/logo.png"},
 *    {src:"res/btn.png"},
 *
 *    {src:"res/boom.mp3"},
 * ]
 *
 * var g_level = [
 *    {src:"res/level01.png"},
 *    {src:"res/level02.png"},
 *    {src:"res/level03.png"}
 * ]
 *
 * //load a list of resources
 * cc.Loader.preload(g_mainmenu, this.startGame, this);
 *
 * //load multi lists of resources
 * cc.Loader.preload([g_mainmenu,g_level], this.startGame, this);
 */
cc.Loader.preload = function (resources, selector, target) {
    if (!this._instance) {
        this._instance = new cc.Loader();
    }
    this._instance.initWithResources(resources, selector, target);
    return this._instance;
};

/**
 * Preload resources async
 * @param {Array} resources
 * @param {Function|String} selector
 * @param {Object} target
 * @return {cc.Loader}
 */
cc.Loader.preloadAsync = function (resources, selector, target) {
    if (!this._instance) {
        this._instance = new cc.Loader();
    }
    this._instance.setAsync(true);
    this._instance.initWithResources(resources, selector, target);
    return this._instance;
};

/**
 * Release the resources from a list
 * @param {Array} resources
 */
cc.Loader.purgeCachedData = function (resources) {
    if (this._instance) {
        this._instance.releaseResources(resources);
    }
};

/**
 * Returns a shared instance of the loader
 * @function
 * @return {cc.Loader}
 */
cc.Loader.getInstance = function () {
    if (!this._instance) {
        this._instance = new cc.Loader();
    }
    return this._instance;
};

cc.Loader._instance = null;


/**
 * Used to display the loading screen
 * @class
 * @extends cc.Scene
 */
cc.LoaderScene = cc.Scene.extend(/** @lends cc.LoaderScene# */{
    _logo: null,
    _logoTexture: null,
    _texture2d: null,
    _bgLayer: null,
    _label: null,
    _winSize:null,

    /**
     * Constructor
     */
    ctor: function () {
        cc.Scene.prototype.ctor.call(this);
        this._winSize = cc.Director.getInstance().getWinSize();
    },
    init:function(){
        cc.Scene.prototype.init.call(this);

        //logo
        var logoWidth = 297;
        var logoHeight = 51;
        var centerPos = cc.p(this._winSize.width / 2, this._winSize.height / 2);

        this._logoTexture = new Image();
        var _this = this;
        this._logoTexture.addEventListener("load", function () {
            _this._initStage(centerPos);
            this.removeEventListener('load', arguments.callee, false);
        });
        // this._logoTexture.src = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAlAAD/4QMpaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM4MDBEMDY2QTU1MjExRTFBQTAzQjEzMUNFNzMxRkQwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4MDBEMDY1QTU1MjExRTFBQTAzQjEzMUNFNzMxRkQwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU2RTk0OEM4OERCNDExRTE5NEUyRkE3M0M3QkE1NTlEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU2RTk0OEM5OERCNDExRTE5NEUyRkE3M0M3QkE1NTlEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQADQkJCQoJDQoKDRMMCwwTFhENDREW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";
        this._logoTexture.src = "data:image/png;base64,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";
        this._logoTexture.width = logoWidth;
        this._logoTexture.height = logoHeight;

        // bg
        this._bgLayer = cc.LayerColor.create(cc.c4(255, 255, 255, 255));
        this._bgLayer.setPosition(0, 0);
        this.addChild(this._bgLayer, 0);

        //loading percent
        this._label = cc.LabelTTF.create("Loading... 0%", "Arial", 14);
        this._label.setColor(cc.c3(180, 180, 180));
        this._label.setPosition(cc.pAdd(centerPos, cc.p(0, -logoHeight / 2 - 10)));
        this._bgLayer.addChild(this._label, 10);
    },

    _initStage: function (centerPos) {
        this._texture2d = new cc.Texture2D();
        this._texture2d.initWithElement(this._logoTexture);
        this._texture2d.handleLoadedTexture();
        this._logo = cc.Sprite.createWithTexture(this._texture2d);
        this._logo.setScale(cc.CONTENT_SCALE_FACTOR());
        this._logo.setPosition(centerPos);
        this._bgLayer.addChild(this._logo, 10);
    },

    onEnter: function () {
        cc.Node.prototype.onEnter.call(this);
        this.schedule(this._startLoading, 0.3);
    },

    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = "Loading... 0%";
        this._label.setString(tmpStr);
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} selector
     * @param {Object} target
     */
    initWithResources: function (resources, selector, target) {
        this.resources = resources;
        this.selector = selector;
        this.target = target;
    },

    _startLoading: function () {
        this.unschedule(this._startLoading);
        cc.Loader.preload(this.resources, this.selector, this.target);
        this.schedule(this._updatePercent);
    },

    _updatePercent: function () {
        var percent = cc.Loader.getInstance().getPercentage();
        var tmpStr = "Loading... " + percent + "%";
        this._label.setString(tmpStr);

        if (percent >= 100)
            this.unschedule(this._updatePercent);
    }
});

/**
 * Preload multi scene resources.
 * @param {Array} resources
 * @param {Function|String} selector
 * @param {Object} target
 * @return {cc.LoaderScene}
 * @example
 * //example
 * var g_mainmenu = [
 *    {src:"res/hello.png"},
 *    {src:"res/hello.plist"},
 *
 *    {src:"res/logo.png"},
 *    {src:"res/btn.png"},
 *
 *    {src:"res/boom.mp3"},
 * ]
 *
 * var g_level = [
 *    {src:"res/level01.png"},
 *    {src:"res/level02.png"},
 *    {src:"res/level03.png"}
 * ]
 *
 * //load a list of resources
 * cc.LoaderScene.preload(g_mainmenu, this.startGame, this);
 *
 * //load multi lists of resources
 * cc.LoaderScene.preload([g_mainmenu,g_level], this.startGame, this);
 */
cc.LoaderScene.preload = function (resources, selector, target) {
    if (!this._instance) {
        this._instance = new cc.LoaderScene();
        this._instance.init();
    }

    this._instance.initWithResources(resources, selector, target);

    var director = cc.Director.getInstance();
    if (director.getRunningScene()) {
        director.replaceScene(this._instance);
    } else {
        director.runWithScene(this._instance);
    }

    return this._instance;
};

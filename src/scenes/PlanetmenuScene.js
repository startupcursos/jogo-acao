var PlanetmenuScene = cc.Scene.extend({
	onEnter : function() {
		this._super();
		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(24);
		var itemMenuTerra = cc.MenuItemFont.create("Earth", this.onEarth);
		var itemMenuLua = cc.MenuItemFont.create("Moon", this.onMoon);
		var itemMenuMarte = cc.MenuItemFont.create("Mars", this.onMars);
		var itemMenuJupiter = cc.MenuItemFont.create("Jupiter", this.onJupiter);
		var itemMenuSaturno = cc.MenuItemFont.create("Saturn", this.onSaturn);
		var itemMenuUrano = cc.MenuItemFont.create("Uranus", this.onUranus);
		var itemMenuNetuno = cc.MenuItemFont.create("Neptune", this.onNeptune);
		var itemMenuVenus = cc.MenuItemFont.create("Venus", this.onVenus);
		var menu = cc.Menu.create(itemMenuTerra, itemMenuLua, itemMenuMarte, itemMenuJupiter, itemMenuSaturno, itemMenuUrano, itemMenuNetuno, itemMenuVenus);
		menu.alignItemsVerticallyWithPadding(15);
		this.addChild(menu);
	},
	onEarth : function() {
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Level1TerraScene())); 
	},
	onMoon : function() {
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Level2LuaScene()));
	},
	onMars : function() { 
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Cut3MarteScene()));
	},
	onJupiter : function() {
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Cut4JupiterScene()));
	},
	onSaturn : function() {
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Cut5SaturnoScene()));
	},
	onUranus : function() {
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Level6UranoScene()));
	},
	onNeptune : function() {
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Cut7NetunoScene()));
	},
	onVenus : function() {
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Cut8VenusScene()));
	}
	
});

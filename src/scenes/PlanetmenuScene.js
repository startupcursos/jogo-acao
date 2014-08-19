var PlanetmenuScene = cc.Scene.extend({
	onEnter : function() {
		this._super();
		var size = cc.Director.getInstance().getWinSize();
		var bgPlanetMenu = cc.Sprite.create(s_bg_planetmenu);
		bgPlanetMenu.setPosition(size.width / 2, size.height / 2);
		this.addChild(bgPlanetMenu, -1);
		
		//ItemImage
		var itemMenuEarth = cc.MenuItemImage.create(s_button_p_earth, s_button_p_earth, this.onEarth, this);
		var itemMenuMoon = cc.MenuItemImage.create(s_button_p_moon, s_button_p_moon, this.onMoon, this);
		var itemMenuMars = cc.MenuItemImage.create(s_button_p_mars, s_button_p_mars, this.onMars, this);
		var itemMenuJupiter = cc.MenuItemImage.create(s_button_p_mars, s_button_p_mars, this.onMars, this);
		var itemMenuSaturn = cc.MenuItemImage.create(s_button_p_saturn, s_button_p_saturn, this.onSaturn, this);
		var itemMenuUranus = cc.MenuItemImage.create(s_button_p_uranus, s_button_p_uranus, this.onUranus, this);
		var itemMenuNeptune = cc.MenuItemImage.create(s_button_p_neptune, s_button_p_neptune, this.onNeptune, this);
		var itemMenuVenus = cc.MenuItemImage.create(s_button_p_venus, s_button_p_venus, this.onVenus, this);
	   
	
		var menu1 = cc.Menu.create(itemMenuEarth, itemMenuMoon, itemMenuMars, itemMenuJupiter);
		menu1.setPosition (400,100);
		menu1.alignItemsHorizontallyWithPadding(15);
		  this.addChild(menu1);
		  
		var menu2 = cc.Menu.create(itemMenuSaturn, itemMenuUranus, itemMenuNeptune, itemMenuVenus);
		menu2.setPosition (400,300);
		menu2.alignItemsHorizontallyWithPadding(15);
		  this.addChild(menu2);
		
	},
	onEarth : function() {
	     cc.log("Earth pressed");
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Level1TerraScene())); 
	},
	onMoon : function() {
	cc.log("Moon pressed");
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Cut2LuaScene()));
	},
	onMars : function() { 
	cc.log("Mars pressed");
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Cut3MarteScene()));
	},
	onJupiter : function() {
	cc.log("Jupiter pressed");
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Cut4JupiterScene()));
	},
	onSaturn : function() {
	cc.log("saturn pressed");
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Cut5SaturnoScene()));
	},
	onUranus : function() {
	cc.log("Uranus pressed");
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Cut6UranoScene()));
	},
	onNeptune : function() {
	cc.log("Neptune pressed");
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Cut7NetunoScene()));
	},
	onVenus : function() {
	cc.log("Venus pressed");
		cc.Director.getInstance().pushScene(cc.TransitionFade.create(1, new Cut8VenusScene()));
	}
	
});

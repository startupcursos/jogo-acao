cc.SPRITE_DEBUG_DRAW =  0;

GAME = {};
GAME.SCORE=0;
GAME.LIFES=3;
GAME.SOUND=true;
GAME.LASTLEVEL=null;
GAME.GROUND_HEIGHT_PERC=0.11;
GAME.SCROLLING = {
	SPEED_X: 300,
	SPEED_Y: 0,
	TOTAL: 0,
	TIME: 0,
};

//container
GAME.CONTAINER = {
    ENEMIES:[],
    ENEMIES_BULLETS:[],
    PLAYER_BULLETS:[]
};



//Clock Function


toSeconds = function(number){
	
	var seconds = number;
	var time = seconds;
	
	while(seconds > 1 && seconds < 10)  {return time.toPrecision(2);}
	while(seconds > 10 && seconds <100) {return time.toPrecision(3);}
	while(seconds > 100)				{return time.toPrecision(4);}
	
};
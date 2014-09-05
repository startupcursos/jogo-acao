
//Particle Effects

var ParticleExplosion = cc.Sprite.extend({
	
	
	ctor : function(x, y){
		
		this._super();
		this.init();
		
		
                
		//Create particle effect
		this.particle = cc.ParticleExplosion.create();
		
                this.addChild(this.particle, 10);//add particle in the parent layer
		this.particle.setTexture(cc.TextureCache.getInstance().addImage(s_fire));//load image into memory

                this.particle.setLifeVar(0);//Particle Life variation
                this.particle.setLife(0.7);//Particle Duration = 0.7
                this.particle.setSpeed(200);//speed = 200
                this.particle.setSpeedVar(0);//Particle speed variation
                this.particle.setEmissionRate(1000);//Particle quantity =1000
                this.particle.setStartColor(cc.c4f(0,1,1,1));//set Start Color with cc.c4f(r,g,b,a) values range 0 to 1
		this.particle.setEndColor(cc.c4f(0,1,1,0));//set End color with cc.c4f(r,g,b,a) value range 0 to 1
		
		this.pos_x = x;
		this.pos_y = y;
		
		this.particle.setPosition(cc.p(this.pos_x, this.pos_y));
	
		
            //Update Method Call
            //this.scheduleUpdate();
		
	
	},
	
	update : function(){
                
		//Moves the particle to the new position
		this.particle.setPosition(cc.p(this.pos_x , this.pos_y));
	}
        
});


var ParticleFireExplosion = cc.Sprite.extend({
        
	ctor : function(x, y){
		
                
		this._super();
		this.init();
		
		
                
		//Create particle effect
		this.particle = cc.ParticleMeteor.create();
		
                this.addChild(this.particle, 10);//add particle in the parent layer
		this.particle.setTexture(cc.TextureCache.getInstance().addImage(s_fire));//load image into memory

                this.particle.setLifeVar(0);//Particle Life variation
                this.particle.setLife(1);//Particle Duration = 0.7
                this.particle.setSpeed(500);//speed = 200
                this.particle.setSpeedVar(0);//Particle speed variation
                this.particle.setEmissionRate(500);//Particle quantity =1000
                //this.particle.setStartColor(cc.c4f(0,1,0,1)); //set Start Color with cc.c4f(r,g,b,a) values range 0 to 1
		//this.particle.setEndColor(cc.c4f(0,1,1,1));//set End color with cc.c4f(r,g,b,a) value range 0 to 1
                this.particle.setShapeType(cc.PARTICLE_BALL_SHAPE);
                //this.particle.setStartSize(5);
                //this.particle.SetEndSize(5);
                
		this.pos_x = x;
		this.pos_y = y;
		
		this.particle.setPosition(cc.p(this.pos_x, this.pos_y));
                
		
            //Update Method Call
            this.scheduleUpdate();
	},
	
	update : function(dt){
                
                this.time += dt;
                
                while(this.time >= 0.5){
                   //Remove sprite from canvas
                    this.setVisible(false);
                    this.active = false;
                    this.stopAllActions();
                    this.time = 0;
                }
                
		//Moves the particle to the new position
		//this.particle.setPosition(cc.p(this.pos_x , this.pos_y));
	}
        
});


var ParticleMeteor = cc.Sprite.extend({
	
	ctor : function(x, y){
		
                
		this._super();
		this.init();
		
		
                
		//Create particle effect
		this.particle = cc.ParticleMeteor.create();
		
                this.addChild(this.particle, 10);//add particle in the parent layer
		this.particle.setTexture(cc.TextureCache.getInstance().addImage(s_fire));//load image into memory

                this.particle.setLifeVar(0);//Particle Life variation
                this.particle.setLife(1);//Particle Duration = 0.7s
                this.particle.setSpeed(500);//speed = 200
                this.particle.setSpeedVar(0);//Particle speed variation
                this.particle.setEmissionRate(500);//Particle quantity =1000
                this.particle.setStartColor(cc.c4f(0,1,0,1)); //set Start Color with cc.c4f(r,g,b,a) values range 0 to 1
		this.particle.setEndColor(cc.c4f(0,1,1,1));//set End color with cc.c4f(r,g,b,a) value range 0 to 1
                this.particle.setShapeType(cc.PARTICLE_BALL_SHAPE);
                this.particle.setStartSize(5);
                this.particle.setEndSize(5);
                
                
		this.pos_x = x;
		this.pos_y = y;
		
		this.particle.setPosition(cc.p(this.pos_x, this.pos_y));
                
		
            //Update Method Call
            this.scheduleUpdate();
		
	
	},
	
	update : function(dt){
                
                this.time += dt;
                
                while(this.time >= 0.5){
                   //Remove sprite from canvas
                    this.setVisible(false);
                    this.active = false;
                    this.stopAllActions();
                    this.time = 0;
                }
                
		//Moves the particle to the new position
		//this.particle.setPosition(cc.p(this.pos_x , this.pos_y));
	}
        
});

var ParticleGalaxy = cc.Sprite.extend({
	time : 0,
	
	ctor : function(x, y){
		
                
		this._super();
		this.init();
		
		
                
		//Create particle effect
		this.particle = cc.ParticleGalaxy.create();
		
                this.addChild(this.particle, 10);//add particle in the parent layer
		this.particle.setTexture(cc.TextureCache.getInstance().addImage(s_fire));//load image into memory

                this.particle.setLifeVar(0);//Particle Life variation
                this.particle.setLife(0.5);//Particle Duration = 0.7s
                this.particle.setSpeed(400);//speed = 200
                this.particle.setSpeedVar(0);//Particle speed variation
                this.particle.setEmissionRate(500);//Particle quantity =1000
                
                //Set Particle Color and Variation
                this.particle.setStartColor(cc.c4f(0 , 0 , 1 , 1)); //set Start Color with cc.c4f(r,g,b,a) values range 0 to 1
                this.particle.setStartColorVar(0);
		this.particle.setEndColor(cc.c4f(0, 0 , 1 , 1));//set End color with cc.c4f(r,g,b,a) value range 0 to 1
                //this.particle.setEndColorVar(1);
                
                
                //this.particle.setShapeType(cc.PARTICLE_BALL_SHAPE);
                
                //Set individual particle size
                this.particle.setStartSize(30);
                this.particle.setEndSize(1);
                
                
		this.pos_x = x;
		this.pos_y = y;
		
		this.particle.setPosition(cc.p(this.pos_x, this.pos_y));
                
		
            //Update Method Call
            this.scheduleUpdate();
		
	
	},
	
	update : function(dt){
                
                this.time += dt;
                
                while(this.time >= 0.45){
                   //Remove sprite from canvas
                    this.setVisible(false);
                    this.active = false;
                    this.stopAllActions();
                    this.time = 0;
                }
                
		//Moves the particle to the new position
		//this.particle.setPosition(cc.p(this.pos_x , this.pos_y));
	}
        
});



var ParticleBlueFire = cc.Sprite.extend({
	time : 0,
	
	ctor : function(x, y){
		
                
		this._super();
		this.init();
		
		
                
		//Create particle effect
		this.particle = cc.ParticleFire.create();
		
                this.addChild(this.particle, 10);//add particle in the parent layer
		this.particle.setTexture(cc.TextureCache.getInstance().addImage(s_fire));//load image into memory
                
                //Set Particle Life and Speed
                this.particle.setLifeVar(0);//Particle Life variation
                this.particle.setLife(0.8);//Particle Duration = 0.7s
                this.particle.setSpeed(200);//speed = 200
                this.particle.setSpeedVar(0);//Particle speed variation
                this.particle.setEmissionRate(200);//Particle quantity =1000
                
                //Set Particle Colors
                this.particle.setStartColor(cc.c4f(0,0,1,1)); //set Start Color with cc.c4f(r,g,b,a) values range 0 to 1
                this.particle.setStartColorVar(1);
		this.particle.setEndColor(cc.c4f(0,0,1,1));//set End color with cc.c4f(r,g,b,a) value range 0 to 1
                this.particle.setEndColorVar(1);
                
                //Set Shape
                //this.particle.setShapeType(cc.PARTICLE_BALL_SHAPE);
                
                //Set Size
                this.particle.setStartSize(50);
                this.particle.setEndSize(20);
                
                
		this.pos_x = x;
		this.pos_y = y;
		
		this.particle.setPosition(cc.p(this.pos_x, this.pos_y));
                
		
            //Update Method Call
            this.scheduleUpdate();
		
	
	},
	
	update : function(dt){
                
                this.time += dt;
                
                //Time Remove function
                while(this.time >= 0.5){
                   //Remove sprite from canvas
                    this.setVisible(false);
                    this.active = false;
                    this.stopAllActions();
                    this.time = 0;
                }
                
		//Moves the particle to the new position
		//this.particle.setPosition(cc.p(this.pos_x , this.pos_y));
	}
        
});

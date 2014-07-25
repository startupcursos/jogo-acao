// 1. Sempre coloque isso aqui quando for usar o box2d
var b2Vec2 = Box2D.Common.Math.b2Vec2, b2BodyDef = Box2D.Dynamics.b2BodyDef, b2Body = Box2D.Dynamics.b2Body, b2FixtureDef = Box2D.Dynamics.b2FixtureDef, b2World = Box2D.Dynamics.b2World, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

function RigidBodyPhysics(meterToPixelRatio) {
	this.MTP_RATIO = meterToPixelRatio;
	this.world = new b2World(new b2Vec2(0, -10), true);
	this.addSpriteAsDynamicBody = function(sprite, shapeAsCircle, density, friction, restitution) {
		density = density || 1.0;
		friction = friction || 0.5;
		restitution = restitution || 0.5;
		shapeAsCircle = shapeAsCircle || false;

		//4.1- Define a fixture, "Material" of the body
		var fixDef = new b2FixtureDef;
		fixDef.density = density;
		fixDef.friction = friction;
		fixDef.restitution = restitution;

		var rect = sprite.getBoundingBox();
		//4.2- Define the shape, "external form" on the fixture
		if (shapeAsCircle) {
			fixDef.shape = new b2CircleShape;
			var maxDimension = Math.max(rect.width, rect.height);
			fixDef.shape.m_radius = (maxDimension / 2) * this.MTP_RATIO;
		} else {
			fixDef.shape = new b2PolygonShape;
			fixDef.shape.SetAsBox((rect.width / 2) * this.MTP_RATIO, (rect.height / 2) * this.MTP_RATIO);
		}

		//4.3- Define the body
		var defBody = new b2BodyDef;
		defBody.type = b2Body.b2_dynamicBody;
		defBody.position.Set((rect.x + (rect.width / 2)) * this.MTP_RATIO, (rect.y + (rect.height / 2)) * this.MTP_RATIO);
		defBody.angle = -1 * cc.DEGREES_TO_RADIANS(sprite.getRotation());

		//4.4- Attach original object on the body
		defBody.userData = sprite;

		//4.5- Add body to world
		this.world.CreateBody(defBody).CreateFixture(fixDef);

	};
	this.addRectAsStaticBody = function(rect, density, friction, restitution) {
		density = density || 1.0;
		friction = friction || 0.5;
		restitution = restitution || 0.0;
		//4.1- Define a fixture, "Material" of the body
		var fixDef = new b2FixtureDef;
		fixDef.density = density;
		fixDef.friction = friction;
		fixDef.restitution = restitution;
		//4.2- Define the shape, "external form" on the fixture
		fixDef.shape = new b2PolygonShape;
		fixDef.shape.SetAsBox((rect.width / 2) * this.MTP_RATIO, (rect.height / 2) * this.MTP_RATIO);
		//4.3- Define the body
		var defBody = new b2BodyDef;
		defBody.type = b2Body.b2_staticBody;
		defBody.position.Set((rect.x + (rect.width / 2)) * this.MTP_RATIO, (rect.y + (rect.height / 2)) * this.MTP_RATIO);
		//4.4- Attach original object on the body
		defBody.userData = rect;
		//4.5- Add body to world
		this.world.CreateBody(defBody).CreateFixture(fixDef);
	};
	this.addSpriteAsStaticBody = function(sprite, density, friction, restitution) {
		this.addRectAsStaticBody(sprite.getBoundingBox(), density, friction, restitution);
	};
	this.update = function(dt) {
		//It is recommended that a fixed time step is used with Box2D for stability
		//of the simulation, however, we are using a variable time step here.
		//You need to make an informed choice, the following URL is useful
		//http://gafferongames.com/game-physics/fix-your-timestep/
		var velocityIterations = 8;
		var positionIterations = 1;

		// Instruct the world to perform a single step of simulation. It is
		// generally best to keep the time step and iterations fixed.
		this.world.Step(dt, velocityIterations, positionIterations);

		//Iterate over the bodies in the physics world
		for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
			if (b.GetUserData() != null) {
				//Synchronize the AtlasSprites position and rotation with the corresponding body
				var myActor = b.GetUserData();
				if (myActor.setPosition) {
					myActor.setPosition(b.GetPosition().x / this.MTP_RATIO, b.GetPosition().y / this.MTP_RATIO);
					myActor.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
				}
			}
		}
	};
};


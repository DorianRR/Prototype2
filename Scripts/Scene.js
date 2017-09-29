
function createScene()
{
	//Add group of platforms
	platforms = game.add.group();
	platforms.enableBody = true;

	createPlatform(155, 338, 'ground', 1, 1.45);
	createPlatform(155, 446, 'ground', 1, 1.45);
	createPlatform(155, 555, 'ground', 1, 1.45);
	createPlatform(155, 660, 'ground', 1, 1.45);


	createPlatform(505, 338, 'ground', 1, 1.45);
	createPlatform(505, 446, 'ground', 1, 1.45);
	createPlatform(505, 555, 'ground', 1, 1.45);
	createPlatform(505, 660, 'ground', 1, 1.45);

	createPlatform(950, 338, 'ground', 0.9, 1.45);
	createPlatform(950, 446, 'ground', 0.9, 1.45);
	createPlatform(950, 555, 'ground', 0.9, 1.45);
	createPlatform(950, 660, 'ground', 0.9, 1.45);

	createPlatform(1295, 338, 'ground', 0.75, 1.45);
	createPlatform(1295, 446, 'ground', 0.75, 1.45);
	createPlatform(1295, 555, 'ground', 0.75, 1.45);
	createPlatform(1295, 660, 'ground', 0.75, 1.45);

	createPlatform(140, 768, 'ground', 6.6, 1);
	createPlatform(0, 225, 'ground', 10, 1);


	//Add group of ropes
	ropes = game.add.group();
	ropes.enableBody = true;

	createRope(0, 768, 'rope', 0.7);
	createRope(373, 446, 'rope', 0.55);
	createRope(720, 660, 'rope', 1);
	createRope(1140, 555, 'rope', 0.7);
	createRope(1460, 768, 'rope', 1);

	//Add group of doors
	closedDoors = game.add.group();

	createDoor(200, 240, 'doorClose');
	createDoor(300, 460, 'doorClose');
	createDoor(1350, 240, 'doorClose');
	createDoor(1000, 350, 'doorClose');
	createDoor(600, 565, 'doorClose');
	createDoor(1000, 565, 'doorClose');
	createDoor(150, 675, 'doorClose');
	createDoor(300, 675, 'doorClose');

	openDoors = game.add.group();

	bombs = game.add.group();
	bombs.enableBody = true;

	for(var i = 0; i < 5; i++)
		createBomb(game.rnd.integerInRange(0, map.width), game.rnd.integerInRange(226, map.height - 40), 'bomb');

	collectible = game.add.group();
	collectible.enableBody = true;

	for (var i = 0; i < 5; i++){
		createCheese(game.rnd.integerInRange(0, map.width), game.rnd.integerInRange(226, map.height - 40), 'cheese', true);
		createCheese(game.rnd.integerInRange(0, map.width), game.rnd.integerInRange(226, map.height - 40), 'rollingCheese', false);
	}

}

//Add one platform
function createPlatform(x, y, sprite, scaleX, scaleY)
{
	var platform = platforms.create(x, y, sprite);
	platform.scale.setTo(scaleX, scaleY);
	platform.body.immovable = true;
}

//Add one rope
function createRope(x, y, sprite, scaleX)
{
	var rope = ropes.create(x, y, sprite);
	rope.scale.setTo(scaleX, 1);
	rope.body.immovable = true;
}

//Add one door
function createDoor(x, y, sprite, isOpen = false)
{
	var door;
	if(isOpen)
	{
		door = openDoors.create(x, y, sprite);
	}
	else
	{
		door = closedDoors.create(x, y, sprite);		
	}
	door.body = new Phaser.Physics.Arcade.Body(door);
	door.body.immovable = true;
	//boor.direction = 
}

//Add one bomb
function createBomb(x, y, sprite)
{
	var bomb = bombs.create(x, y, sprite);
	bomb.body.gravity.y = 300;
	bomb.onFire = false;
		bomb.explode = function(enemy){
			//playe animation of explosion
			var explosionAnim = game.add.sprite(bomb.world.x, bomb.world.y, 'explosion');
			console.log(explosionAnim);
			var anim = explosionAnim.animations.add('explode', [0, 0, 0, 0, 0, 0], 10, false);
			explosionAnim.animations.play('explode');
			anim.onComplete.add(function(sprite, anim){
				sprite.kill();
			}, this);
			console.log("Explode");
			if(enemy)
			{
				sounds.meow.play();
				enemy.isStunned = true;
			}
		 	//clear bomb
		 	bomb.kill();
 	};

	bomb.detectEnemy = function(){
		if(bomb.onFire){
	 		//explosion area is 2x
	 		//bomb.scale.setTo(2);
	 		//kill all enemis nearby
	 		game.physics.arcade.overlap(bomb, enemies, function(bomb, enemy){
	 			bomb.explode(enemy);
	 		},null, this);
		}
	}

	return bomb;
}

function createCheese(x, y, sprite, isStationary)
{
	var cheese = collectible.create(x, y, sprite);
	cheese.body.gravity.y = 300;
	//set anchor to center
	cheese.anchor.setTo(0.5, 0.5);
	//cheese.body.angularVelocity = 300;
	//cheese.body.velocity.x = 50;
	cheese.body.collideWorldBounds = true;
	cheese.direction = game.rnd.integerInRange(0, 1) * 2 - 1;
	cheese.isStationary = isStationary;
	// cheese.body.angularDrag = 50;
	// cheese.body.angularAcceleration = 200;
}

//update scene
function updateScene()
{
	bombs.forEach(updateBomb, this, true);
	game.physics.arcade.collide(collectible, platforms);
	game.physics.arcade.overlap(player, collectible, collectItem, null, this);
	game.physics.arcade.collide(collectible, closedDoors, changeDirCheese, null, this);
	collectible.forEach(updateCheese, this, true);

	//start timer
	if(collectible.length < 10)
		timer -= game.time.elapsed;

	//spwan items
	if(timer <= 0)
	{
		timer = 3000;
		var isStationary = game.rnd.integerInRange(0, 1);
		if(isStationary)
			createCheese(game.rnd.integerInRange(0, map.width - 30), game.rnd.integerInRange(226, map.height - 40), 'cheese', true);
		else
			createCheese(game.rnd.integerInRange(0, map.width - 30), game.rnd.integerInRange(226, map.height - 40), 'rollingCheese', false);
	}

}

function updateBomb(bomb)
{

	var bombHitPlat = game.physics.arcade.collide(bomb, platforms);
	var bombHitRope = game.physics.arcade.collide(bomb, ropes);

	//stop bomb when hits the platform
	if(bombHitPlat && bomb.body.touching.down)
		bomb.body.velocity.x = 0;

	//bounce bomb when hits the trampline
	if(bombHitRope && bomb.body.touching.down)
		bomb.body.velocity.y = -400;

	game.physics.arcade.overlap(bombs, enemies, bomb.detectEnemy, bomb.detectEnemy, this);

}

function updateCheese(cheese)
{
	var cheeseHitRope = game.physics.arcade.collide(cheese, ropes);

	//bounce bomb when hits the trampline
	if(cheeseHitRope && cheese.body.touching.down)
		cheese.body.velocity.y = -400;

	if(cheese.world.x >= game.world.width - 15)
	{
		cheese.direction = -1;
	}
	else if( cheese.world.x <= 20)
	{
		cheese.direction = 1;
	}

	if(!cheese.isStationary)
	{
		cheese.body.velocity.x = cheese.direction * 50;
		cheese.body.angularVelocity = cheese.direction * 300;
	}
		
}

function changeDirCheese(cheese, door)
{
	cheese.direction = -cheese.direction;
}

function collectItem(player, cheese){
	//cheese.kill();
	collectible.removeChild(cheese);
	sounds.collect.play();
	}

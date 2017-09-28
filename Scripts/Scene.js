
function createScene()
{
	//Add group of platforms
	platforms = game.add.group();
	platforms.enableBody = true;

	createPlatform(0, game.world.height -32, 'ground', .4, 1);
	//createPlatform(0, game.world.height -32, 'ground', .4, .5);
	createPlatform(0, game.world.height -140, 'ground', .4, .5);
	createPlatform(0, game.world.height -245, 'ground', .4, .5);
	createPlatform(0, game.world.height -354, 'ground', .4, .5);
	createPlatform(0, game.world.height -464, 'ground', .38, .5);


	createPlatform(359, game.world.height -140, 'ground', .8, .5);
	createPlatform(359, game.world.height -245, 'ground', .8, .5);
	createPlatform(359, game.world.height -355, 'ground', .8, .5);
	createPlatform(359, game.world.height -464, 'ground', .8, .5);

	createPlatform(935, game.world.height -140, 'ground', .65, .5);
	createPlatform(935, game.world.height -245, 'ground', .65, .5);
	createPlatform(935, game.world.height -355, 'ground', .65, .5);
	createPlatform(935, game.world.height -464, 'ground', .65, .5);

	createPlatform(1364, game.world.height -140, 'ground', .65, .5);
	createPlatform(1364, game.world.height -245, 'ground', .65, .5);
	createPlatform(1364, game.world.height -355, 'ground', .65, .5);
	createPlatform(1364, game.world.height -464, 'ground', .65, .5);

	createPlatform(360, game.world.height -32, 'ground', 1, 1);
	createPlatform(935, game.world.height -32, 'ground', .65, 1);
	createPlatform(1366, game.world.height -32, 'ground', .65, 1);
	createPlatform(0, 226, 'ground', 100, .5);


	//Add group of ropes
	ropes = game.add.group();
	ropes.enableBody = true;

	createRope(161, game.world.height -10, 'rope', 1);
	createRope(161, game.world.height -245, 'rope', .98);
	createRope(680, game.world.height -140, 'rope', 1.27);

	createRope(1196, game.world.height -10, 'rope', .85);

	//Add group of doors
	//doors = game.add.group();
	//doors.enableBody = true;

	// createDoor(200, 100, 'doorClose');
	// createDoor(800, 100, 'doorClose');
	// createDoor(200, 300, 'doorClose');
	// createDoor(800, 300, 'doorClose');
	// createDoor(200, 468, 'doorClose');
	// createDoor(800, 468, 'doorClose');

	bombs = game.add.group();
	bombs.enableBody = true;

	for(var i = 0; i < 5; i++)
		createBomb(game.rnd.integerInRange(0, map.width), game.rnd.integerInRange(226, game.height), 'bomb');

	collectible = game.add.group();
	collectible.enableBody = true;

	for (var i = 0; i < 10; i++){
		createCheese(game.rnd.integerInRange(0, map.width), game.rnd.integerInRange(226, game.height), 'star')
	
	
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
function createDoor(x, y, sprit)
{
	var door = doors.create(x, y, sprit);
	door.body = new Phaser.Physics.Arcade.Body(door);
	door.body.enable = true;
	door.body.immovable = true;
}

//Add one bomb
function createBomb(x, y, sprite)
{
	var bomb = bombs.create(x, y, sprite);
	bomb.body.gravity.y = 300;
	bomb.onFire = false;
		bomb.explode = function(enemy){
		console.log("Explode");
		if(enemy)
			enemy.isStunned = true;
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

function createCheese(x, y, sprite)
{
	var cheese = collectible.create(x, y, sprite);
	cheese.body.gravity.y = 300;
	//set anchor to center
	cheese.anchor.setTo(0.5, 0.5);
	//cheese.body.angularVelocity = 300;
	//cheese.body.velocity.x = 50;
	cheese.body.collideWorldBounds = true;
	cheese.direction = game.rnd.integerInRange(0, 1) * 2 - 1;
	// cheese.body.angularDrag = 50;
	// cheese.body.angularAcceleration = 200;
}

//update scene
function updateScene()
{

	bombs.forEach(updateBomb, this, true);
	game.physics.arcade.collide(collectible, platforms);
	game.physics.arcade.overlap(player, collectible, collectItem, null, this);
	collectible.forEach(updateCheese, this, true);

	//start timer
	if(collectible.length < 10)
		timer -= game.time.elapsed;

	//spwan items
	if(timer <= 0)
	{
		timer = 5000;
		createCheese(game.rnd.integerInRange(0, map.width), game.rnd.integerInRange(226, map.height), 'star')
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
	else if( cheese.world.x <= 15)
	{
		cheese.direction = 1;
	}

	cheese.body.velocity.x = cheese.direction * 50;
	cheese.body.angularVelocity = cheese.direction * 300;

}

function collectItem(player, collectible){
	collectible.kill();
	createScoreAnimate();
	//score += 10;
    //scoreText.text = 'Score: ' + score;
}

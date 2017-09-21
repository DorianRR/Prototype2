
function createScene()
{
	//Add group of platforms
	platforms = game.add.group();
	platforms.enableBody = true;

	createPlatform(0, game.world.height -32, 'ground', 1, 1);
	createPlatform(0, 200, 'ground', 1, 1);
	createPlatform(0, 400, 'ground', 1, 1);
	createPlatform(600, 200, 'ground', 1, 1);
	createPlatform(600, 400, 'ground', 1, 1);
	createPlatform(600, game.world.height -32, 'ground', 1, 1);

	//Add group of ropes
	ropes = game.add.group();
	ropes.enableBody = true;

	createRope(400, game.world.height -10, 'rope', 1);
	createRope(1000, game.world.height -10, 'rope', 1);

	//Add group of doors
	doors = game.add.group();
	//doors.enableBody = true;

	createDoor(200, 100, 'doorClose');
	createDoor(800, 100, 'doorClose');
	createDoor(200, 300, 'doorClose');
	createDoor(800, 300, 'doorClose');
	createDoor(200, 468, 'doorClose');
	createDoor(800, 468, 'doorClose');

	bombs = game.add.group();
	bombs.enableBody = true;

	for(var i = 0; i < 5; i++)
		createBomb(game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(0, game.height), 'bomb');
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
	bomb.time = 5000;
	bomb.onFire = false;

	bomb.explode = function(){
		if(bomb.onFire){
			console.log("Explode");
	 		//explosion area is 2x
	 		bomb.scale.setTo(2);
	 		//kill all enemis nearby
	 		game.physics.arcade.overlap(bomb, enemies, function(bomb, enemy){
	 			enemy.isStunned = true;
	 		},null, this);
	 		//clear bomb
	 		bomb.kill();
		}
 	};
	return bomb;
}

//update scene
function updateScene()
{
	 bombs.forEach(updateBomb, this, true);
}

function updateBomb(bomb)
{
	 if(bomb.onFire == true)
	 	bomb.time -= game.time.elapsed;
	 if(bomb.time <= 0)
	 	bomb.explode();

	var bombHitPlat = game.physics.arcade.collide(bomb, platforms);
	var bombHitRope = game.physics.arcade.collide(bomb, ropes);

	//stop bomb when hits the platform
	if(bombHitPlat && bomb.body.touching.down)
		bomb.body.velocity.x = 0;

	//bounce bomb when hits the trampline
	if(bombHitRope && bomb.body.touching.down)
		bomb.body.velocity.y = -400;

	game.physics.arcade.overlap(bombs, enemies, bomb.explode, bomb.explode, this);

}
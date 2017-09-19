
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
	doors.enableBody = true;

	createDoor(200, 100, 'doorClose');
	createDoor(800, 100, 'doorClose');
	createDoor(200, 300, 'doorClose');
	createDoor(800, 300, 'doorClose');
	createDoor(200, 468, 'doorClose');
	createDoor(800, 468, 'doorClose');
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
	door.body.immovable = true;
}
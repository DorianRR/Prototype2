
//create a series of enemies
function createEnemies()
{
	enemies = game.add.group();
	enemies.enableBody = true;

	//create enemy randomly
	for(var i = 0; i < 5; i++)
		createEnemy(game.rnd.integerInRange(0, game.world.width), game.rnd.integerInRange(0, game.world.height));
}


function updateEnemies()
{
    game.physics.arcade.collide(enemies, platforms);

    //call hitEnemy() when hit
	game.physics.arcade.overlap(player, enemies, hitEnemy, null, this);

	enemies.forEach(move, this, true);

}


//create one enemy at (x, y)
function createEnemy(x, y)
{
	var enemy = enemies.create(x, y, 'enemy');

	game.physics.arcade.enable(enemy);

	//change direction when hit bounds
	enemy.body.collideWorldBounds = false;
	enemy.body.onWorldBounds = new Phaser.Signal();
	enemy.body.onWorldBounds.add(changeDirection, this);
	enemy.body.gravity.y = 350;
	enemy.direction = game.rnd.integerInRange(0,1) * 2 - 1;

	//enemy.body.velocity = 

}

//callback function when player hits with enemy
function hitEnemy(player, enemy)
{
	player.health--;
	enemy.kill();
	console.log(player.health);
}

var hitPlatform; 
function move(enemy)
{
	// if(!enemy.body.touching.down)
	// 	enemy.direction = -enemy.direction;
	enemy.body.velocity.x = enemy.direction * 100;

	hitPlatform = game.physics.arcade.overlap(enemy, platforms,  null, choosePath,this);

	var hitRope = game.physics.arcade.collide(enemy, ropes);
    //  Allow the player to jump if they are touching the rope.
    if (hitRope && enemy.body.touching.down)
    {
        enemy.body.velocity.y = -500;
    }

}

function choosePath(enemy, platform)
{
	if(hitPlatform)
	{
		var leftDistance = Math.abs(enemy.x - platform.x)  +  Math.abs(player.x - platform.x);
		var rightDistance = Math.abs(platform.x + platform.width - enemy.x) + Math.abs(player.x - platform.x + platform.width);
		if(leftDistance > rightDistance)
			enemy.direction = -1;
		else
			enemy.direction = 1;	
	}
	else
	{
		if(player.x > enemy.x)
			direction = 1;
		else
			direction = -1;
	}

	console.log(enemy.direction);
}

function changeDirection(enemy, up, down, left, right)
{
	if(left || right)
		changeDirection(sprite);
}
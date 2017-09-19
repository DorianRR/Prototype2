
//create a series of enemies
function createEnemies()
{
	enemies = game.add.group();
	enemies.enableBody = true;

	//create enemy randomly
	for(var i = 0; i < 5; i++)
		createEnemy(game.rnd.integerInRange(0, game.world.width), game.rnd.integerInRange(0, game.world.height));
}

var hitPlatform; 
function updateEnemies()
{
    //call hitEnemy() when hit
	game.physics.arcade.overlap(player, enemies, hitEnemy, null, this);

	game.physics.arcade.collide(enemies, platforms);

	enemies.forEach(move, this, true);

	//game.physics.arcade.collide(enemies, platforms);
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
	if(player.body.touching.down)
	{
		player.health--;
		enemy.kill();
		console.log(player.health);
	}
}

function move(enemy)
{
	var hitRope = game.physics.arcade.collide(enemy, ropes);
    //  Allow the player to jump if they are touching the rope.
    if (hitRope && enemy.body.touching.down)
    {
        enemy.body.velocity.y = -500;
    }


    if(!hitPlatform)
    {
	    if(enemy.x > player.x)
	    	enemy.direction = -1;
	    else
	    	enemy.direction = 1;
    }  	

    //console.log(enemy.directon);
    enemy.body.velocity.x = enemy.direction * 100;


}

// function choosePath(enemy, platform)
// {
// 	if(enemy.body.touching.down &&  Math.abs(player.y - enemy.y) >= 10)
// 	{
// 		var leftDistance = Math.abs(enemy.x - platform.x)  +  Math.abs(player.x - platform.x);
// 		var rightDistance = Math.abs(platform.x + platform.width - enemy.x) + Math.abs(player.x - platform.x + platform.width);
// 		if(leftDistance > rightDistance)
// 			enemy.direction = -1;
// 		else
// 			enemy.direction = 1;	
// 		console.log(leftDistance + " " + rightDistance);
// 	}
// 	else
// 	{
// 		if(player.x > enemy.x)
// 			direction = 1;
// 		else
// 			direction = -1;
// 	}
// }

function changeDirection(enemy, up, down, left, right)
{
	if(left || right)
		enemy.direction = -enemy.direction;
	console.log("change direction");
}
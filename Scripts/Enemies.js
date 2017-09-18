
//create a series of enemies
function createEnemies()
{
	enemies = game.add.group();
	enemies.enableBody = true;

	//create enemy randomly
	for(var i = 0; i < 5; i++)
		createEnemy(game.rnd.integerInRange(0, 800), game.rnd.integerInRange(0, 500));
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

function move(enemy)
{
	if(!enemy.body.touching.down)
		enemy.direction = -enemy.direction;
	enemy.body.velocity.x = enemy.direction * 100;
}

function changeDirection(enemy, up, down, left, right)
{
	if(left || right)
		changeDirection(sprite);
}

//create a series of enemies
function createEnemies()
{
	enemies = game.add.group();
	enemies.enableBody = true;

	//create enemy randomly
	for(var i = 0; i < 5; i++)
		createEnemy(game.rnd.integerInRange(100, game.world.width-100), game.rnd.integerInRange(100, game.world.height));
}

var hitPlatform; 

function updateEnemies()
{
    //call hitEnemy() when hit
	game.physics.arcade.overlap(player, enemies, hitEnemy, null, this);

	game.physics.arcade.collide(enemies, platforms);

	enemies.forEach(move, this, true);

	// //This is the signal for enemies bounding off walls
	// enemy.body.onWorldBounds = new Phaser.Signal();
	// enemy.body.onWorldBounds.add(changeDirection, this);
	// enemy.body.onWorldBounds.dispatch(changeDirection, this);
}


//create one enemy at (x, y)
function createEnemy(x, y)
{
	var enemy = enemies.create(x, y, 'enemy');

	game.physics.arcade.enable(enemy);

	//enemy can't go off world bounds
	enemy.body.collideWorldBounds = true;

	enemy.body.gravity.y = 350;
	enemy.direction = game.rnd.integerInRange(0,1) * 2 - 1;

	enemy.isStunned = false;
	enemy.stunnedTime = 5000;


	//set animations
	enemy.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 20, true);


}

//callback function when player hits with enemy
function hitEnemy(player, enemy)
{
	//console.log(player.isDashing);
	if(player.body.touching.down && !player.isDashing && !enemy.isStunned)
	{
		player.health--;
		enemy.kill();
		console.log(player.health);
	}
}

function move(enemy)
{
	var hitRope = game.physics.arcade.collide(enemy, ropes);

    //  Allow the enemy to jump if they are touching the rope.
    if (hitRope && enemy.body.touching.down)
    {
    	enemy.body.velocity.y = -(Math.abs(enemy.world.y - player.world.y))*1.85
    	//enemy.isStunned = true;
    	//enemy.isStunned = 500;
    }

 	

	else if(enemy.world.x < 5){
			enemy.direction = 1;
			//enemy.animations.play('enemyRight');

	}
	else if(enemy.world.x > 1545){
			enemy.direction = -1;
			enemy.animations.play('left');
	}

   else if(player.body.touching.down && Math.abs(player.world.y - enemy.world.y) < 50)
	{
		if(enemy.x > player.x){
			enemy.animations.play('left');
		    enemy.direction = -1;
		}
		else{
			//enemy.animations.play('enemyRight');
		    enemy.direction = 1;    
		}
	}  	
    //console.log(enemy.directon);
    enemy.body.velocity.x = enemy.direction * 125;

    //can't move when stunned
    if(enemy.isStunned)
    {
    	enemy.body.velocity.x = 0;
    	enemy.animations.stop();
    	enemy.stunnedTime -= game.time.elapsed;
    }

    //reset time
    if(enemy.stunnedTime <= 0)
    {
    	enemy.isStunned = false;
    	enemy.stunnedTime = 5000;
    }
}

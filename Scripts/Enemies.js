
//create a series of enemies
function createEnemies()
{
	enemies = game.add.group();
	enemies.enableBody = true;

	//create enemy randomly
	for(var i = 0; i < 5; i++)
		createEnemy(game.rnd.integerInRange(0, game.world.width), game.rnd.integerInRange(226, game.world.height - 100));
}

var hitPlatform; 
var spawnTime = 0;

function updateEnemies()
{
    //call hitEnemy() when hit
	game.physics.arcade.overlap(player, enemies, hitEnemy, null, this);
	game.physics.arcade.collide(enemies, platforms);
	//game.physics.arcade.collide(enemies, enemies);
	game.physics.arcade.collide(enemies, closedDoors);

	enemies.forEach(move, this, true);

	spawnTime -= game.time.elapsed;
	if(spawnTime <= 0){
		createEnemy(game.rnd.integerInRange(0, game.world.width), game.rnd.integerInRange(226, game.world.height - 100));
		spawnTime = 7500;
		console.log("Random Spawn!");
	}

}


//create one enemy at (x, y)
function createEnemy(x, y)
{	
	var enemy = enemies.create(x, y, 'enemy');
	enemy.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
	enemy.animations.add('right', [6, 7, 8, 9, 10, 11], 10, true);
	enemy.animations.add('stunLeft', [12, 13, 12, 13, 12, 13], 10, true);
	enemy.animations.add('stunRight', [14, 15, 14, 15, 14, 15], 10, true);
	game.physics.arcade.enable(enemy);

	//enemy can't go off world bounds
	enemy.body.collideWorldBounds = true;

	enemy.body.gravity.y = 350;
	enemy.direction = game.rnd.integerInRange(0,1) * 2 - 1;
	
	if(enemy.direction > 0){
		enemy.animations.play('right');
	}
	else{
		enemy.animations.play('left');
	}

	enemy.isStunned = false;
	enemy.stunnedTime = 5000;
	enemy.spawnTime = 7500;

	//set animations
	
}

//callback function when player hits with enemy
function hitEnemy(player, enemy)
{
	//console.log(player.isDashing);
	if(player.body.touching.down && !player.isDashing && !enemy.isStunned)
	{
		player.health--;
		var oneHeart;
		if(player.health >= 0)
			oneHeart = heart.getChildAt(player.health);
		if(oneHeart)
        	oneHeart.destroy(true, true);

		enemy.isStunned = true;
		sounds.meow.play();
		console.log(player.health);
	}
}

function move(enemy)
{
	var hitRope = game.physics.arcade.collide(enemy, ropes);

    //  Allow the enemy to jump if they are touching the rope.
    if (hitRope && enemy.body.touching.down)
    {
    	if((Math.abs(enemy.world.y - player.world.y))<150){
    		enemy.body.velocity.y = -(Math.abs(enemy.world.y - player.world.y))*2.8
    	}
    	else{

    		enemy.body.velocity.y = -(Math.abs(enemy.world.y - player.world.y))*1.9
    	}

    }

	else if(enemy.world.x < 5){
			enemy.direction = 1;
			enemy.animations.play('right');

	}
	else if(enemy.world.x > game.world.width-60){
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
			enemy.animations.play('right');
		    enemy.direction = 1;    
		}
	}  	
    //console.log(enemy.directon);
    enemy.body.velocity.x = enemy.direction * 125;

    //can't move when stunned
    if(enemy.isStunned)
    {
    	enemy.body.velocity.x = 0;
    	enemy.animations.stop('left');
    	enemy.animations.stop('right');
    	enemy.stunnedTime -= game.time.elapsed;
    }

    //reset time
    if(enemy.stunnedTime <= 0)
    {
    	enemy.isStunned = false;
    	enemy.stunnedTime = 5000;
    	enemy.animations.stop('stunLeft');
    	enemy.animations.stop('stunRight');
    }
}
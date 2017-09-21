function createPlayer()
{
    //add player and its settings
	player = game.add.sprite(32, game.world.height - 100, 'dude');
    console.log("Create player");

	//enable physics of player
	game.physics.arcade.enable(player);

    //set physics properties
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;

    //set animations
	player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    player.health = 3;

    waves = game.add.group();
    waves.enableBody = true;

    // timer = game.time.create(false);
    runTimer = 0;
    var timer;
    timer = game.time.create(false);


}

function updatePlayer()
{
	//  Collide the player with the platforms
    
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, doors, openDoor, openDoor, this);
    game.physics.arcade.collide(waves, enemies);


    //  Reset the players velocity
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
        if(cursors.space.isDown && runTimer <= 50){
            runTimer ++;
            console.log(runTimer);
            player.body.velocity.x *= 2;
        }
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
        if(cursors.space.isDown && runTimer <= 50){
            runTimer ++;
            console.log(runTimer);
            player.body.velocity.x *= 2;
        }
    }
   
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    var hitRope = game.physics.arcade.collide(player, ropes);
        //  Allow the player to jump if they are touching the rope.
    if (hitRope && player.body.touching.down)
    {
        player.body.velocity.y = -500;
    }
    
   // game.physics.arcade.overlap(player, doors, openDoor, null, this);

    

    if(player.health <= 0 )
        player.kill();
}

function openDoor(player, door)
{
    if(cursors.space.isDown){    
        var openDoor = doors.create(door.x, door.y, "doorOpen");
        door.destroy(true, true);
        console.log("open door");
        createWave(player.world.x,player.world.y, 'wave')

        return false;
    }    
    
}

function createWave(x, y, sprite){
    var wave = waves.create(x , y - 20, sprite);
    wave.scale.setTo(2);
    wave.body.immovable = true;
    wave.body.velocity.x = 300;
    }

function runCooldown(){
    
}

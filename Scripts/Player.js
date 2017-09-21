var dropTime = 500;

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

    player.isDashing = false;

}

function updatePlayer()
{
	//  Collide the player with the platforms
    
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, doors, openDoor, openDoor, this);
    game.physics.arcade.collide(waves, enemies);
    game.physics.arcade.overlap(player, bombs, pickBomb, pickBomb, this);

    if(cursors.down.isDown)
        dropBomb();


    if(player.children != null)
        dropTime -= game.time.elapsed;

    //  Reset the players velocity
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');

            //Dash code
        if(cursors.space.isDown && runTimer <= 100){
            player.isDashing = true;
            runTimer ++;
            player.body.velocity.x *= 2;
        }
        

    }
    if (runTimer >= 100){
            runTimer = 0;
            // isDashing = false;
        }

    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');

        //Dash code
        if(cursors.space.isDown && runTimer <= 100){
            player.isDashing = true;
            runTimer ++;
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
    // console.log(isDashing);
}

//Open a door
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

//pick a bomb
function pickBomb(player, bomb)
{
    if(cursors.down.isDown)
    {
        if(player.children.length == 0 && dropTime <= 0)
        {
            bombs.removeChild(bomb);
            //add the bomb as playe's child
            bomb = game.make.sprite(0, 0, 'bomb');
            player.addChild(bomb);
            console.log("Pick bomb");
            dropTime = 500;
        }
    }
}

//drop a bomb
function dropBomb()
{
    if(player.children.length != 0 && dropTime <= 0)
    {
        //remove the bomb as the playe's child
        player.removeChild(player.getChildAt(0));
        //create a new bomb sprite
        var bomb = createBomb(player.x, player.y, 'bomb')
        //set velocity and gravity
        bomb.body.velocity.y = -100;
        bomb.body.velocity.x = player.body.velocity.x;
        //set onFire
        bomb.onFire = true;
        dropTime = 500;
    }

}
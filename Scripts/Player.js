var dropTime = 500;
var doorTime = 0;
var isToggleDoor = false;

function createPlayer()
{

    //add player and its settings
	player = game.add.sprite(game.world.width/2, game.world.height/2, 'dude');
    console.log("Create player");

	//enable physics of player
	game.physics.arcade.enable(player);

    //set physics properties
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;

    //set animations
	player.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
    player.animations.add('right', [6, 7, 8, 9, 10, 11], 10, true);
    player.animations.add('dashLeft', [12, 13, 14, 15, 16, 17], 10, true);
    player.animations.add('dashRight', [18, 19, 20, 21, 22, 23], 10, true);

    heart = game.add.group();
    for(var i = 0; i < 3; i++)
    {
        var oneHeart = heart.create(0, 36 * i, 'heart');
        oneHeart.fixedToCamera = true;
    }

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
    game.physics.arcade.collide(player, closedDoors, openDoor, openDoor, this);
    game.physics.arcade.overlap(player, openDoors, closeDoor, closeDoor, this);
    //game.physics.arcade.collide(waves, enemies);
    game.physics.arcade.overlap(player, bombs, pickBomb, pickBomb, this);

    if(cursors.down.isDown)
        dropBomb();


    if(player.children != null)
        dropTime -= game.time.elapsed;

    if(isToggleDoor)
    {
        doorTime -= game.time.elapsed;
    }

    if(doorTime <= 0)
    {
        isToggleDoor = false;
    }

    if(!cursors.space.isDown){
        player.isDashing = false;
    }


    //  Reset the players velocity
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
        if(player.isDashing)
        {
            player.animations.stop('left');
            player.animations.play('dashLeft');
        }
        else
        {
            player.animations.stop('dashLeft');
            player.animations.play('left');
        }
        if(!sounds.footstep.isPlaying)
            sounds.footstep.play("", 0, 2.5);
        //sounds.run.play();

            //Dash code
        if(cursors.space.isDown && runTimer <= 100){
            player.isDashing = true;
            runTimer ++;
            player.body.velocity.x *= 2;
        }
    }

    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
        if(player.isDashing)
        {
            player.animations.stop('right');
            player.animations.play('dashRight');
        }
        else
        {
            player.animations.stop('dashRigth');
            player.animations.play('right');
        }
        if(!sounds.footstep.isPlaying)
            sounds.footstep.play("", 0, 2.5);
        //sounds.run.play();

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
        //player.frame = 4;
    }

    

    
    var hitRope = game.physics.arcade.collide(player, ropes);
        //  Allow the player to jump if they are touching the rope.
    if (hitRope && player.body.touching.down)
    {
        player.body.velocity.y = -500;
        sounds.jump.play();
    }
    

   // game.physics.arcade.overlap(player, doors, openDoor, null, this);   
    
    if(player.health <= 0 )
    {
        player.destroy(true, true);

        if(!sounds.gameover.isPlaying)
            sounds.gameover.play("", 0, 1);
    }
}

//Open a door
function openDoor(player, door)
{
    if(cursors.down.isDown && doorTime <= 0){   
        if(player.x < door.x)
        {
            createDoor(door.x, door.y, "doorOpenRight", true, false); 
          //  createWave(player.world.x,player.world.y, 'wave', false)
        }
        else
        {
           // createWave(player.world.x,player.world.y, 'wave', door.isLeft)
            createDoor(door.x - 43, door.y, "doorOpenLeft", true, true); 
        }

        door.destroy(true, true);
        console.log("open door");
        doorTime = 500;
        isToggleDoor = true;


        return false;
    }    
    
}

function closeDoor(player, door)
{
    if(cursors.down.isDown && doorTime <= 0)
    {
        if(door.key == 'doorOpenLeft')
            createDoor(door.x + 43, door.y, "doorClose");
        else
            createDoor(door.x, door.y, "doorClose");
        door.kill();
        door.destroy(true, true);
        console.log("close door");

        doorTime = 500;
        isToggleDoor = true;
    }
}

function createWave(x, y, sprite, isLeft){
    var wave = waves.create(x , y - 20, sprite);
    wave.scale.setTo(2);
    wave.body.immovable = true;
    if(isLeft)
        wave.body.velocity.x = -300;
    else
        wave.body.velocity.x = 300;
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
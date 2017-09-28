
function createScore()
{
	console.log("Score working?");
    var me = this;
    var scoreFont = "50px Arial";


    me.score = 0;
    me.scoreBuffer = 0;

    //Create the score label
    me.scoreLabel = me.game.add.text(me.game.world.centerX, 0, "0", {font: scoreFont, fill: "#ffffff", stroke: "#535353", strokeThickness: 10}); 
    me.scoreLabel.fixedToCamera = true;
    me.scoreLabel.anchor.setTo(2.5, 0);
    //me.scoreLabel.align = 'center';

   
    var seed = Date.now();
    me.random = new Phaser.RandomDataGenerator([seed]);
 
    me.game.input.onUp.add(function(pointer){
 
    var newScore = me.random.integerInRange(1, 30);
    me.createScoreAnimation(pointer.x, pointer.y, '+'+newScore, newScore);
 
}, me);
    
}

function collectItem(player, collectible){
    var me = this;

    collectible.kill();
    createScoreAnimate();
    me.scoreBuffer += 50;
    //scoreText.text = 'Score: ' + score;
}

function incrementScore()
{
    var me = this;

    me.score += 2;
    me.scoreLabel.text = me.score;

}

function createScoreAnimate()
{
    var me = this;
 
    var scoreFont = "25px Arial";
    var message = "+100!"
 
    //Create a new label for the score
    var scoreAnimation = me.game.add.text(player.world.x, player.world.y, message, {font: scoreFont, fill: "#39d179", stroke: "#ffffff", strokeThickness: 10}); 
    scoreAnimation.anchor.setTo(0, 0);
    //scoreAnimation.align = 'center';
 
    // //Tween this score label to the total score label
    var scoreTween = me.game.add.tween(scoreAnimation).to({x:player.world.x +300, y: player.world.y - 350}, 800, Phaser.Easing.Exponential.In, true);
 
    //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
    scoreTween.onComplete.add(function(){
        scoreAnimation.destroy();
        //me.scoreLabelTween.start();
        //me.scoreBuffer += score;
    }, me);

}

function updateScore()
{
var me = this;

    if(me.scoreBuffer > 0){
        me.incrementScore();
        me.scoreBuffer --;
    }
	
}





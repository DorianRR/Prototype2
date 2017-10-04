function createScore()
{
    var me = this;
    var scoreFont = "50px Arial";

    me.score = 0;
    me.scoreBuffer = 0;

    //Create the score label
    me.scoreLabel = me.game.add.text(400, 0, "0", {font: scoreFont, fill: "#ffffff", stroke: "#535353", strokeThickness: 10}); 
    me.scoreLabel.fixedToCamera = true;

    //Create a tween to grow / shrink the score label
    me.scoreLabelTween = me.game.add.tween(me.scoreLabel.scale).to({ x: 1.5, y: 1.5}, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In);   
}

function collectItem(player, collectible){
    var me = this;

    if(collectible.key == 'cracker')
    {
        me.scoreBuffer += 100;
        createScoreAnimate("+100!");
    }
    else if(collectible.key == 'rollingCheese')
    {
        me.scoreBuffer += 50;
        createScoreAnimate("+50");
    }
    else
    {
        me.scoreBuffer += 30;
        createScoreAnimate("+30");
    }

    collectible.destroy(true, true);
    sounds.collect.play();
}

function incrementScore(step)
{
    var me = this;

    me.score += step;
    me.scoreLabel.text = me.score;

}

function createScoreAnimate(message)
{
    var me = this;
    var scoreFont = "25px Arial";
 
    //Create a new label for the score
    var scoreAnimation = me.game.add.text(player.world.x, player.world.y, message, {font: scoreFont, fill: "#39d179", stroke: "#ffffff", strokeThickness: 10}); 
    scoreAnimation.anchor.setTo(0, 0);
 
    // //Tween this score label to the total score label
    var scoreTween = me.game.add.tween(scoreAnimation).to({x:player.world.x, y: 150}, 800, Phaser.Easing.Exponential.In, true);

    //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
    scoreTween.onComplete.add(function(){
        me.scoreLabelTween.start();
        scoreAnimation.destroy();
        //me.scoreBuffer += score;
    }, me);

}

function updateScore()
{
var me = this;

    if(me.scoreBuffer > 0){
        me.incrementScore(2);
        me.scoreBuffer -= 2;
    }
    
}

function getScore()
{
    return this.scoreLabel;
}
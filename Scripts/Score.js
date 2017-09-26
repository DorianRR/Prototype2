
function createScore()
{
	console.log("Score working?");

    var me = this;
    var scoreFont = "100px Arial";


    me.score = 0;
    me.scoreBuffer = 0;

	//Create the score label
    me.scoreLabel = me.game.add.text(me.game.world.centerX, 50, "0", {font: scoreFont, fill: "#ffffff", stroke: "#535353", strokeThickness: 15}); 
    me.scoreLabel.anchor.setTo(0.5, 0);
    me.scoreLabel.align = 'center';

    // //Create a tween to grow / shrink the score label
    // me.scoreLabelTween = me.add.Tween(me.scoreLabel.scale).to({ x: 1.5, y: 1.5}, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In);

 
}


function updateScore()
{

	var me = this;

	if(me.scoreBuffer > 0){
		me.incrementScore();
		me.scoreBuffer --;
	}
}

function incrementScore()
{
	var me = this;

	me.score += 1;
	me.scoreLabel.text = me.score;

}

function createScoreAnimate()
{
	var me = this;
 
    var scoreFont = "90px Arial";
 
    //Create a new label for the score
    var scoreAnimation = me.game.add.text(x, y, message, {font: scoreFont, fill: "#39d179", stroke: "#ffffff", strokeThickness: 15}); 
    scoreAnimation.anchor.setTo(0.5, 0);
    scoreAnimation.align = 'center';
 
    // //Tween this score label to the total score label
    // var scoreTween = me.game.add.tween(scoreAnimation).to({x:me.game.world.centerX, y: 50}, 800, Phaser.Easing.Exponential.In, true);
 
    // //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
    // scoreTween.onComplete.add(function(){
    //     scoreAnimation.destroy();
    //     me.scoreLabelTween.start();
    //     me.scoreBuffer += score;
    // }, me);

}

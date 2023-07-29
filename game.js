var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var level = 0;
var started = false;

$("body").keydown(function (e) {
    if(!started){    
    nextSequence();
    started = true;
    }
});

$(".btn").on("click",function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
   // console.log(userClickedPattern);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer((userClickedPattern.length)-1);
   });


function nextSequence(){ 
    level++;
    $("#level-title").text("Level "+level);
    var n = Math.random();
    var randomNumber = Math.floor((n*4));
    var RandomChosenColour = buttonColors[randomNumber];
    gamePattern.push(RandomChosenColour);
  //  console.log(gamePattern);
    $("#"+RandomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+RandomChosenColour+".mp3");
    audio.play();
    
    
}
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
},100);

}
function checkAnswer(CurrentLevel){
  if(userClickedPattern[CurrentLevel]===gamePattern[CurrentLevel]){
    console.log("success");
    if((userClickedPattern.length)===(gamePattern.length)){
        setTimeout(function(){
            nextSequence();
            userClickedPattern = [];
        },1000);
      }
  }
  else{
    console.log("failure");
    var audio = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text( "Game Over, Press Any Key to Restart");
     startOver();
  }

}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    $("body").keydown(function (e) {
        if(!started){    
        nextSequence();
        started = true;
        }
    });
    
}


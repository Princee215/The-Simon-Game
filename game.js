var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

function startOver(){
  gamePattern=[];
  level=0;
  started=false;
}

$(document).keydown(function(){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
}

$(".btn").click(handler);

function handler(){
  userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
}

function playsound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(stop,100);
  function stop(){
    $("#"+currentColour).removeClass("pressed");
  }
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      },1000);
    }
  }else{
    $("h1").text("Game Over, Press Any Key to Restart");
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(stop,200);
    function stop(){
      $("body").removeClass("game-over");
    }
    startOver();
  }
}

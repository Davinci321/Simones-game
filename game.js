let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let levelEl = 0;
let started = false;

function animatePress(userChosenColour){
   $(`#${userChosenColour}`).addClass("pressed");
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  setTimeout(function(){
    $(`#${userChosenColour}`).removeClass("pressed")
  }, 100)
  checkAnswer(userClickedPattern.length-1);
});
function playSound(userChosenColour) {
  let audio = new Audio(`./${userChosenColour}.mp3`);
  audio.play();
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        let audio = new Audio("./wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function nextSequence() {
    userClickedPattern = [];
    levelEl++;
    $("h1").text("Level " + levelEl);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  let buttonSelected = $(`#${randomChosenColour}`);
  let audio = new Audio(`./${randomChosenColour}.mp3`);
  gamePattern.push(randomChosenColour);

  setInterval(function() {
    buttonSelected.toggleClass('flash');
  }, 500);
  buttonSelected.click(() => {
    audio.play();
  });
}
function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    levelEl = 0;
}
$(document).keypress(function(){
    if(!started){
    nextSequence();
    $("h1").text("Level " + levelEl);
    started = true;
}
})

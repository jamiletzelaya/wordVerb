
document.addEventListener("DOMContentLoaded", function() {
  const verbModeSelectBtn = document.getElementById("selectVerbMode");
  const submitButton = document.getElementById("submitWord");
  let gameModeChoice;
  let verbGame; 


  verbModeSelectBtn.addEventListener("click", function(){
    const gameWrapper = document.querySelector(".game-wrapper");
    const gameModeWrapper = document.querySelector(".gameModeSelector");
    gameModeChoice = document.getElementById("verbModes").value;

    gameMode = gameModeChoice;
    verbGame = new Game(gameMode);
    verbGame.pickVerb(gameModeChoice);
    gameModeWrapper.classList.add("hide");
    gameWrapper.classList.remove("hide");
  });

  document.querySelector('input').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      verbGame.checkSpelling();
    }
  });

  submitButton.addEventListener("click", function(){
    verbGame.checkSpelling();
  });




});
let availableVerbs = [
  {verbBase: "swim", pastTense: "swam", pastParticiple: "swum", sampleSentence: "", img: "./assets/swim.png"},
  {verbBase: "run", pastTense: "ran", pastParticiple: "run", sampleSentence: "", img: "./assets/run.png"},
  {verbBase: "fly", pastTense: "flew", pastParticiple: "flown", sampleSentence: "", img: "./assets/fly.png"},
  {verbBase: "throw", pastTense: "threw", pastParticiple: "thrown", sampleSentence: "", img: "./assets/throw.png"},
]


function Game(verbType) {
  this.gameMode = verbType;
  this.randomVerb = "";
  this.verbImg = "";
  this.score = 0;
  this.pointValue = 3;
  this.strikes = 0;
  this.countdown = new Countdown(10);
  this.gameOver = false;
  this.pointsEarned = 0;
};

//Selects Verb to show
Game.prototype.pickVerb = function() {
  let verb = availableVerbs[Math.floor(Math.random() * availableVerbs.length)]
  this.verbImg = verb.img
  this.randomVerb = verb[gameMode];

  this.displayVerb();
};

Game.prototype.displayVerb = function() {
  let verbTenseDisplay = document.getElementById("verb-tense");
  let englishTenseChoice = "";
  document.getElementById("userInput").value = "";
  if(this.gameMode = "verbBase"){
    englishTenseChoice = "Verb Base";
  } else if(this.gameMode = "pastTense"){
    englishTenseChoice = "Past Tense"
  } else {
    englishTenseChoice = "Past Participle";
  }
  verbTenseDisplay.textContent = englishTenseChoice;
  let flashCard = document.querySelector(".flash-card");
  let verbImgTag = document.querySelector(".verb-img");
  if (flashCard.childNodes.length > 0) {
    flashCard.innerHTML = "";    
    verbImgTag.setAttribute("src", this.verbImg);
  }
  for(let ltr of this.randomVerb){
    flashCard.innerHTML += `<span class="verb-ltr underline hide-ltr">${ltr}</span>`;
  }
  this.countdown.init();
  this.updatePointValue();
  console.log("call updatePointValue");
  this.countdown.start();
}

//Checks the users spelling
Game.prototype.checkSpelling = function() {
  let userInput = document.getElementById("userInput").value.toLowerCase();

  if(userInput === this.randomVerb){
    this.countdown.stop();
    this.pickVerb();     //select next word
    this.addScore(this.pointValue);
  } else {
    this.countdown.stop();
    this.pickVerb();
    this.addStrikes();
  }
};

Game.prototype.addScore = function(pointValue){
  let userScore = document.getElementById("score");
  console.log(`your score is ${this.score}`)
  this.score += this.pointsEarned;
  userScore.textContent = this.score;
}

Game.prototype.updatePointValue = function() {
  this.checkStrikes();
  let game = this;
  let scoreUpdater = setInterval(checkScore, 2550);
  let numOfSeconds = 5;
  let letters = [...document.querySelectorAll(".verb-ltr")];

  function checkScore() {
    if(numOfSeconds === 0 && this.gameOver != true){
      clearInterval(scoreUpdater);
      game.pickVerb();
      if(document.getElementById("userInput").value == ""){
        game.addStrikes();
      }
    } else {
      if(letters.length > 0 && game.gameOver !== true){
        console.log("call show letter");
        showLetter();
      } else {
        clearInterval(scoreUpdater);
        if(game.gameOver !== true){
          game.pickVerb();
        }
        if(document.getElementById("userInput").value == ""){
          game.addStrikes();
        }
      }
      if(game.pointValue < 0){
        game.pointValue -= 1;
      }
      numOfSeconds -= 1;
    } 
  }

  function showLetter(){
      let randomIndex = Math.floor(Math.random() * letters.length);
      let randomLtr = letters[randomIndex];
      randomLtr.classList.remove("hide-ltr");
      letters.splice(randomIndex, 1);
  }

}

Game.prototype.addStrikes = function() {
  let strikeBoxes = [...document.querySelectorAll(".strike")];
  strikeBoxes[this.strikes].classList.remove("hide");
  this.strikes += 1;
  this.checkStrikes();
}


Game.prototype.checkStrikes = function() {
  if(this.strikes === 3){
    this.gameOver = true;
    document.querySelector(".game-wrapper").classList.add("hide");
    document.querySelector(".gameModeSelector").classList.remove("hide");
    location.reload();
  }
}
function Countdown(seconds){ 
  var gameTimer = {};

  gameTimer.elem = document.getElementById('time');
  gameTimer.seconds = seconds;
  gameTimer.totalTime = seconds * 100;
  gameTimer.usedTime = 0;
  gameTimer.startTime = +new Date();
  gameTimer.timer = null;

  gameTimer.count = function() {
    gameTimer.usedTime = Math.floor((+new Date() - gameTimer.startTime) / 10);

    var tt = gameTimer.totalTime - gameTimer.usedTime;
    if (tt <= 0) {
      gameTimer.elem.innerHTML = '00:00.00';
      clearInterval(gameTimer.timer);
    } else {
      var mi = Math.floor(tt / (60 * 100));
      var ss = Math.floor((tt - mi * 60 * 100) / 100);
      var ms = tt - Math.floor(tt / 100) * 100;

      gameTimer.elem.innerHTML = gameTimer.fillZero(mi) + ":" + gameTimer.fillZero(ss) + "." + gameTimer.fillZero(ms);
    }
  };

  
  gameTimer.init = function() {
    if(gameTimer.timer){
      clearInterval(gameTimer.timer);
      gameTimer.elem.innerHTML = '00:00.00';
      gameTimer.totalTime = seconds * 100;
      gameTimer.usedTime = 0;
      gameTimer.startTime = +new Date();
      gameTimer.timer = null;
    }
  };

  gameTimer.start = function() {
    if(!gameTimer.timer){
       gameTimer.timer = setInterval(gameTimer.count, 1);
    }
  };

  gameTimer.stop = function() {
    if (gameTimer.timer) clearInterval(gameTimer.timer);
  };

  gameTimer.fillZero = function(num) {
    return num < 10 ? '0' + num : num;
  };

  return gameTimer;
}

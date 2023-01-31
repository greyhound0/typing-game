const displayNumber = document.getElementsByClassName("displayNumber");
const inputNumber = document.getElementsByClassName("inputNumber");
var printCharacter = document.getElementById("printCharacter");
var success = document.getElementById("success");
const secondsDisplay = document.getElementById('secondsDisplay');
const minutesDisplay = document.getElementById('minutesDisplay');
const game = document.getElementById('game');
const result = document.getElementById('result');
const timeLapsed = document.getElementById('timeLapsed');
const resetButton = document.getElementById('reset');
const hiddenInput = document.getElementById('input');
let totalTime;
const gameLength = 20;
window.addEventListener('load',  hiddenInput.onfocus);

let timer;
startGame();

 let seconds;
 const secondsDenominator = 1000;
 let secondsRemainder;
 let minutes;
 const minutesDenominator = secondsDenominator*60;
 let minutesRemainder;
 let hours ;
 const hoursDenominator = minutesDenominator*60;
 let hoursRemainder;


 let startTimeInMilliseconds = new Date().getTime();
 let userInputString = '';
 
 const getTimeInUnit = (timestamp, denom) => {
     return Math.floor(Number(timestamp)/denom)
    }
    
    function setTime() {
        const currentTime = new Date().getTime();
        const timeLapsed = currentTime- startTimeInMilliseconds;
        
        hoursRemainder = timeLapsed%hoursDenominator;
        minutesRemainder = hoursRemainder%minutesDenominator;
        secondsRemainder = minutesRemainder%secondsDenominator;
        
        hours =  getTimeInUnit(timeLapsed, hoursDenominator);
        minutes = getTimeInUnit(hoursRemainder, minutesDenominator);
        seconds = getTimeInUnit(minutesRemainder, secondsDenominator);
        minutesDisplay.innerHTML = getTwoDigitString(minutes);
        secondsDisplay.innerHTML = getTwoDigitString(seconds);

        totalTime = `${getTwoDigitString(minutes)}min & ${getTwoDigitString(seconds)}secs`
        }
        
        function getTwoDigitString(value){
            let string = value;
                if(typeof string === 'number') string = string + ""
                return string.length < 2 ? 0 + string : string
        }



function generateRandomAlphabet() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]

  printCharacter.innerHTML = randomCharacter;
}

window.addEventListener("keypress", (e) => {

    //number or not
    // if(isNaN(e.key)) {
    //  return showUserMessage(false,false);
    // }
     
    //equal value
  if (e.key === printCharacter.innerHTML) {
    showUserMessage(true);
    generateRandomAlphabet();
    userInputString += e.key;
    if(userInputString.length === gameLength){
        clearInterval(timer);
        game.style.display = 'none';
        result.style.display = 'block';
        timeLapsed.innerText = totalTime;
    }
  } 
  
  else{
    showUserMessage(false);
  }
});

 generateRandomAlphabet();

 function showUserMessage(isCorrect){

    if(isCorrect) {
        success.innerHTML = "SUCCESS";
    success.style.color = "green";
    printCharacter.innerHTML = "";
    }

    else{

      startTimeInMilliseconds = startTimeInMilliseconds - 1000;
    success.innerHTML = "ENTER THE CORRECT ALPHABET";
    success.style.color = "red";
    navigator.vibrate(500);
    }
 }

function resetGame(){
    startGame();
    result.style.display = 'none';
    game.style.display = 'block';
    userInputString = '';
    startTimeInMilliseconds = new Date().getTime();
    generateRandomAlphabet();
    success.innerHTML = "";

   
}

function startGame(){
    timer = setInterval(setTime, 1000);
}
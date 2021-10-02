const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var t;
var time = [0, 0, 0]; //minutes, seconds, hundredths

const firstScore = document.querySelector(".first");
const secondScore = document.querySelector(".second");
const thirdScore = document.querySelector(".third");
const fourthScore = document.querySelector(".fourth");
const fifthScore = document.querySelector(".fifth");

var firstTime = '010000';
var secondTime = '020000';
var thirdTime = '030000';
var fourthTime = '040000';
var fifthTime = '050000';


// Add leading zero to numbers 9 or below (purely for aesthetics):
//its part of the timer

// Run a standard minute/second/hundredths timer:
function add() {
  time[2]++;
  if(time[2] >=100)  {
    time[2]=0;
    time[1]++;
    if (time[1] >= 60) {
        time[1] = 0;
        time[0]++;
    }
  }
  
  theTimer.textContent = (time[0] ? (time[0] > 9 ? time[0] : "0" + time[0]) : "00") + ":" + (time[1] ? (time[1] > 9 ? time[1] : "0" + time[1]) : "00") + ":" + (time[2] > 9 ? time[2] : "0" + time[2]);

  timer();
}    

function timer()  {
  t = setTimeout(add, 10);
}

// Match the text entered with the provided text on the page:
var started = false;
var finished = false;

function timeAndCompare()  {
  if (started == false)
    {
      timer();
      started = true;
    }

  var correct = true;
  for(var i = 0; i < testArea.value.length; i++)  {
    if((testArea.value[i] == originText[i]) && !finished && correct)  {
      testWrapper.style.borderColor = "#30cfff";
    } else if((testArea.value[i] != originText[i]) && !finished & correct) {
      testWrapper.style.borderColor = "#E95D0F";
      correct = false;
    } //this can probably be done with only the last character of the string to be less intensive, but idk this works too
  }
  if(testArea.value.length == originText.length)
    if(correct && !finished)  {
      clearTimeout(t);
      testWrapper.style.borderColor = "#429890"
      compareScores();
      finished = true;
    }
}


// Start the timer:
// const start = document.getElementById('start'); for testing purposes only
// start.onclick = timer;

//I added it to the compare function, it was originally 2 separate functions, but I decided to combine them since they are called in the same event listener

// Reset everything:
function reset()  {
  theTimer.textContent = "00:00:00";
  time = [0, 0, 0];
  clearTimeout(t);
  started = false;
  finished = false;
  //timer reset
  
  testArea.value = "";
  //input reset
  
  testWrapper.style.borderColor = "grey";
  //border reset
}

// Event listeners for keyboard input and the reset button:
resetButton.addEventListener('click', reset);

testArea.addEventListener('input', timeAndCompare);

//High Scores
function compareScores() {
  var conjoinedTime = (time[0] ? (time[0] > 9 ? time[0] : "0" + time[0]) : "00") + (time[1] ? (time[1] > 9 ? time[1] : "0" + time[1]) : "00") + (time[2] > 9 ? time[2] : "0" + time[2]);
  //this makes it a single comparison as opposed to separate comparisons for each of minutes, seconds, hundredths
  
  var scores = [firstTime, secondTime, thirdTime, fourthTime, fifthTime, conjoinedTime];
  scores.sort();
  //vanilla javascript sort function
  
  firstTime = scores[0];
  secondTime = scores[1];
  thirdTime = scores[2];
  fourthTime = scores[3];
  fifthTime = scores[4];
  //saving the scores to previous variables, the 6th score being omitted
  
  firstScore.innerHTML = firstTime[0]+firstTime[1]+":"+firstTime[2]+firstTime[3]+":"+firstTime[4]+firstTime[5];
  secondScore.innerHTML = secondTime[0]+secondTime[1]+":"+secondTime[2]+secondTime[3]+":"+secondTime[4]+secondTime[5];
  thirdScore.innerHTML = thirdTime[0]+thirdTime[1]+":"+thirdTime[2]+thirdTime[3]+":"+thirdTime[4]+thirdTime[5];
  fourthScore.innerHTML = fourthTime[0]+fourthTime[1]+":"+fourthTime[2]+fourthTime[3]+":"+fourthTime[4]+fourthTime[5];
  fifthScore.innerHTML = fifthTime[0]+fifthTime[1]+":"+fifthTime[2]+fifthTime[3]+":"+fifthTime[4]+fifthTime[5];
}
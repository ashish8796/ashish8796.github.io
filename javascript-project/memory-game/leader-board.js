let userData = JSON.parse(localStorage.getItem('user'));
console.log(userData);
//Array for saving details for various levels of game
let easyScoresArr = [];
let mediumScoresArr = [];
let hardScoresArr = [];
let scoreArr = [easyScoresArr, mediumScoresArr, hardScoresArr];
console.log(scoreArr[userData.index]);

//Function for the saving the details
function saveDetalils() {
  totalMoves.innerText = moves;
  timeConsumed.innerText = time;
  rating.innerText = star;

  scoreArr[index].push({
    name: name,
    star: star,
    time: time,
    moves: moves
  })
}
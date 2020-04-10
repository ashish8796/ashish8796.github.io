//Game details variables
const moveCount = document.querySelector('.moves');
const timeCount = document.querySelector('.time');
const emElem = document.querySelector('em');
const restartGame = document.querySelector('.restart');

//Leader board variables
const leaderBoard = document.querySelector('.leader-board');

//Game dificulty variables
const option = document.querySelector('.option');
const levels = document.querySelector('.level');
const easyLevel = document.querySelector('#easy');
const mediumLevel = document.querySelector('#medium');
const hardLevel = document.querySelector('#hard');

//Game plateform variables 
const gamePlateform = document.querySelector('.game-platform');

//Document fragment variable
const gridFragment = new DocumentFragment();

//Fuction for making divs
function makeDivs(rows, columns) {
  let num = rows * columns;
  for (let i = 0; i < num; i++) {
    let icon = document.createElement('div');
    icon.classList.add('icon');
    gridFragment.append(icon);
  }
  return gridFragment;
}

//Function for inserting fragment in the gameplatform
function appendFragment(fragment) {
  gamePlateform.appendChild(fragment);

}

//Function for setting grid property
function gridProperty(rows, columns, gridGap) {

  let styles = `display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  grid-gap: ${gridGap};`
  gamePlateform.setAttribute('style', styles)
}

//Eventlistener for level buttons
option.addEventListener('click', (event) => {
  let clikedBtn = event.target;

  if (clikedBtn.id == 'easy') {
    let rows = 3;
    let columns = 4;
    let gridGap = "70px 40px";

    option.style.display = 'none';
    appendFragment(makeDivs(rows, columns));
    gridProperty(rows, columns, gridGap);
  }

  if (clikedBtn.id == 'medium') {
    let rows = 4;
    let columns = 4;
    let gridGap = '25px';

    option.style.display = 'none';
    appendFragment(makeDivs(rows, columns));
    gridProperty(rows, columns, gridGap);
  }

  if (clikedBtn.id == 'hard') {
    let rows = 4;
    let columns = 5;
    let gridGap = '30px';

    option.style.display = 'none';
    appendFragment(makeDivs(rows, columns));
    gridProperty(rows, columns, gridGap);
  }
})

//Array of symbol classes
const symbolEasy = ["fas fa-anchor","fas fa-fish","fas fa-feather","fas fa-wrench","fas fa-user-md","fas fa-poo"]

const symbolMedium = ["fas fa-smile","fas fa-heart","fas fa-hand-peace","fas fa-hand-middle-finger","fas fa-thumps-up","fas fa-kiss-wink-heart","fas fa-dizzy","fas fa-grin-stars"]

const symbolHard = ["fas fa-ghost","fas fa-scarecrow","fas fa-skull-crossbones","fas fa-book-dead","fas fa-poo-storm","fas fa-thunderstorm","fas fa-cloud-sun","fas fa-clouds-sun","fas fa-grin-tongue-squint","fas fa-grin-tongue-wink"]

//Array of numbers
let numArr = []

while(numArr.length < 12) {
  let num = Math.floor(Math.random()*13);
  if(numArr.every(val => val != num) && num != 0) {
    numArr.push(num);
  }
}

//A new map of key and values
const map = new Map();


//Eventlistener for the click on the divs
gamePlateform.addEventListener('click', (event) => {
  let clickedDiv = event.target;

  if(clickedDiv.classList.contains('icon')) {
    clickedDiv.className = 'icon visible';
  }
})
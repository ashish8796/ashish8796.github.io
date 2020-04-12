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

//Array of symbol classes
const symbolEasy = ["fas fa-anchor", "fas fa-fish", "fas fa-feather", "fas fa-wrench", "fas fa-user-md", "fas fa-poo", "fas fa-anchor", "fas fa-fish", "fas fa-feather", "fas fa-wrench", "fas fa-user-md", "fas fa-poo"]

const symbolMedium = ["fas fa-smile", "fas fa-heart", "fas fa-hand-peace", "fas fa-hand-middle-finger", "fas fa-thumbs-up", "fas fa-kiss-wink-heart", "fas fa-dizzy", "fas fa-grin-stars", "fas fa-smile", "fas fa-heart", "fas fa-hand-peace", "fas fa-hand-middle-finger", "fas fa-thumbs-up", "fas fa-kiss-wink-heart", "fas fa-dizzy", "fas fa-grin-stars"]

const symbolHard = ["fas fa-ghost", "fas fa-mask", "fas fa-skull-crossbones", "fas fa-book-dead", "fas fa-poo-storm", "fas fa-robot", "fas fa-cloud-sun", "fas fa-cloud-sun-rain", "fas fa-grin-tongue-squint", "fas fa-grin-tongue-wink", "fas fa-ghost", "fas fa-mask", "fas fa-skull-crossbones", "fas fa-book-dead", "fas fa-poo-storm", "fas fa-robot", "fas fa-cloud-sun", "fas fa-cloud-sun-rain", "fas fa-grin-tongue-squint", "fas fa-grin-tongue-wink"]

// let orderArr = [];
// const map = new Map();

//Function for creating a new map
// function gameLevelMap(num, levelSymbol) {
//   let numArr = [];
//   while (numArr.length < num) {
//     let val = Math.floor(Math.random() * (num + 1));

//     if (numArr.every(el => el != val) && val != 0) {
//       numArr.push(val);
//     }
//   }
//   orderArr = Array.from(numArr);
//   numArr.sort((a, b) => a - b)

//   for (let i = 0; i < numArr.length; i++) {
//     let val = numArr[i];
//     val <= levelSymbol.length ? map.set(val, levelSymbol[i]) : map.set(val, levelSymbol[i - levelSymbol.length])
//   }

//   console.log(map);
// }

//Function for suffling the array
function suffleArr(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

//Fuction for making divs
function makeDivs(rows, columns, levelSymbol) {
  let num = rows * columns;
  // gameLevelMap(num, levelSymbol)

  suffleArr(levelSymbol)
  for (let i = 0; i < num; i++) {
    let icon = document.createElement('div');
    icon.classList.add('icon');
    icon.setAttribute('id', `div-${i + 1}`);
    let iElem = document.createElement('i');
    // iElem.className = map.get(orderArr[i])
    iElem.className = levelSymbol[i];
    icon.appendChild(iElem);
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
    let gridGap = "70px 45px";

    option.style.display = 'none';
    appendFragment(makeDivs(rows, columns, symbolEasy));
    gridProperty(rows, columns, gridGap);
  }

  if (clikedBtn.id == 'medium') {
    let rows = 4;
    let columns = 4;
    let gridGap = '20px 45px';

    option.style.display = 'none';
    appendFragment(makeDivs(rows, columns, symbolMedium));
    gridProperty(rows, columns, gridGap);
  }

  if (clikedBtn.id == 'hard') {
    let rows = 4;
    let columns = 5;
    let gridGap = '30px 45px';

    option.style.display = 'none';
    appendFragment(makeDivs(rows, columns, symbolHard));
    gridProperty(rows, columns, gridGap);
  }
})

let div1 = null;
let div2 = null;
let eventArr = [];
let matchedArr = [];
let moves = 0;
//Function for visible the symbol
function visibleSymbol(clickedItem) {
  if (clickedDiv.classList.contains('icon')) {
    clickedItem.className = 'icon visible';
    moves++;
    console.log(moves);
    moveCount.innerText = `${moves} Moves`;
    console.log(moveCount);
  }
}

//Function for an array of clicked Item 
function visibleArr(className, divId) {
  if (eventArr.length == 1) {
    if (eventArr[0].id != divId && (!matchedArr.indexOf(className) + 1)) {
      div2 = document.querySelector(`#${divId}`)
      eventArr.push({ name: className, id: divId });
    }
  }
  else {
    if (!(matchedArr.indexOf(className) + 1)) {
      div1 = document.querySelector(`#${divId}`)
      eventArr.push({ name: className, id: divId });
    }
  }
  // moves += eventArr.length;
  // console.log(moves);
  // moveCount.innertext = `${moves} Moves`;
}

//Function for matching the divs
function matchDivs(arr) {
  if (arr[0].name == arr[1].name) {
    matchedArr.push(arr[0].name)
    matchedArr.push(arr[1].name)
    return
  };

  if (arr[0].name != arr[1].name) {
    div1.className = 'animated heartBeat icon visible';
    div2.className = 'animated heartBeat icon visible';
    const closeDivs = () => {
      div1.className = 'icon';
      div2.className = 'icon';
    }
    setTimeout(() => closeDivs(), 800);
  };

}

let time = 0;
//Function for time consuming by player
function timeTaken() {
  timeCount.innerText = `${time} Seconds`;
  time++;
  console.log(time);
}

let clickedDiv = null;
let Id = null;
let className = null;

//Eventlistener for the click on the divs
gamePlateform.addEventListener('click', (event) => {
  clickedDiv = event.target;
  visibleSymbol(clickedDiv);
  if (clickedDiv.classList.contains('icon')) {
    setInterval(() => {
      timeTaken()
    }, 1000);
    className = clickedDiv.children[0].className;
    Id = clickedDiv.id;
    visibleArr(className, Id);
  }
  if (eventArr.length == 2) {
    matchDivs(eventArr);
    eventArr = [];
  }
})
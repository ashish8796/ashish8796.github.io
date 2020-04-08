//A function for making div of required no and adding them to a fragment

const makeDivs = (row, column) => {
  let divNo = 0;

  while (divNo < (row * column)) {
    let grid = document.createElement('div');
    grid.classList.add('pixel');
    grid.classList.add(`${divNo}`);
    fragment.appendChild(grid);
    divNo += 1;
  }
}

//Function for adding grid of given dimensions
function generateGrid(rows, columns) {
  makeDivs(rows, columns);

  //Inseting fragment document
  gridArea.innerHTML = '';
  gridArea.appendChild(fragment);

  const styles = `
  grid-template-columns: repeat(${columns}, 20px);
  grid-template-rows: repeat(${rows}, 20px);`;

  gridArea.setAttribute('style', styles);
}

// Generate markUp for grid of given dimentions
const formElem = document.querySelector('form');
const gridRows = document.querySelector('#grid-rows');
const gridColumns = document.querySelector('#grid-columns');
const gridArea = document.querySelector('.grid-area');
const fragment = new DocumentFragment();

formElem.addEventListener('submit', (event) => {
  event.preventDefault();

  const gridHeight = gridRows.value;
  const gridWidth = gridColumns.value;

  generateGrid(gridHeight, gridWidth);
})

//Setting Up color to the divs in color pallet

function makeColorDivs(arr) {
  for (i of arr) {
    let color = document.createElement('div');
    color.classList.add(i);
    colorFragment.appendChild(color);
  }

  colorParent.appendChild(colorFragment);
}

const colorFragment = new DocumentFragment();
const colorParent = document.querySelector('.colors');

const colorArr = ['wuzzy', 'mahogany', 'brick-red', 'scarlet', 'sunset', 'pink', 'red', 'orange', 'neon-carrot', 'sun-glow', 'yellow', 'canary', 'shadow', 'sepia', 'brass', 'gold', 'peach', 'apricot', 'tropical-green', 'green', 'fern', 'screamin-green', 'caribbean', 'sea-green', 'midnight-blue', 'plum', 'purple', 'indigo', 'blue', 'pacific-blue', 'black', 'outer-space', 'grey', 'manatee', 'wild-blue', 'white'];

//Setting up a color pallet
makeColorDivs(colorArr);
let currentColor = document.querySelector('.clr');

colorParent.addEventListener('click', (event) => {
  let clickedItem = event.target;
  currentColor.className = `clr ${clickedItem.classList.value}`
})

let mouseDown = false;

document.addEventListener('mousedown', (event) => {
  mouseDown = true;
});

document.addEventListener('mouseup', (event) => {
  mouseDown = false;
});

gridArea.addEventListener('mouseover', (event) => {
  if(mouseDown) {
    if(event.target.classList.contains('pixel')) {
      event.target.className = `pixel ${currentColor.classList[1]}`;
    }
  } 
})

//setting up editable tools for editing the art

const eraser = document.querySelector('#eraser');
const pencil = document.querySelector('#pencil');
const eyeDropper = document.querySelector('#eye-dropper');
const trash = document.querySelector('#trash');
const paintBrush= document.querySelector('#paint-brush');
const square = document.querySelector('#square');

const colorTools = document.querySelector('.color-tool');
let clickedTool = null;

colorTools.addEventListener('click', (event) => {
  clickedTool = event.target;

})
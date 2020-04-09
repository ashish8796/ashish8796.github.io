const formElem = document.querySelector('form');
const gridRows = document.querySelector('#grid-rows');
const gridColumns = document.querySelector('#grid-columns');
const gridArea = document.querySelector('.grid-area');

const colorDiv = document.querySelector('.clr');
const colorTools = document.querySelector('.color-tool');
const colorParent = document.querySelector('.colors');
const alertElem = document.querySelector('.alert');
const alertBtn = document.querySelector('#alert');
let currentTool = document.querySelector('.icon > i');

const fragment = new DocumentFragment();
const colorFragment = new DocumentFragment();
let clickedTool = null;
let mouseDown = false;
let currentColor = null;

//A function for making div of required no and adding them to a fragment
const makeDivs = (row, column) => {
  let divNo = 0;

  while (divNo < (row * column)) {
    let grid = document.createElement('div');
    grid.classList.add('pixel');
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
  grid-template-columns: repeat(${columns},10px);
  grid-template-rows: repeat(${rows}, 10px);`;

  gridArea.setAttribute('style', styles);
}

// Making a  grid of given dimentions
formElem.addEventListener('submit', (event) => {
  event.preventDefault();

  const gridHeight = gridRows.value;
  const gridWidth = gridColumns.value;

  if(gridHeight > 80 || gridHeight > 80) {
    let addText = document.querySelector('.add-text');
    addText.innerText = `Your values are ${gridHeight} x ${gridWidth}.`
    alertElem.style.display = 'flex';
  } else {
    alertElem.style.display = 'none';
    generateGrid(gridHeight, gridWidth); 
  }
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

//Array of the classes for div of different colors 
const colorArr = ['wuzzy', 'mahogany', 'brick-red', 'scarlet', 'sunset', 'pink', 'red', 'orange', 'neon-carrot', 'sun-glow', 'yellow', 'canary', 'shadow', 'sepia', 'brass', 'gold', 'peach', 'apricot', 'tropical-green', 'green', 'fern', 'screamin-green', 'caribbean', 'sea-green', 'midnight-blue', 'plum', 'purple', 'indigo', 'blue', 'pacific-blue', 'black', 'outer-space', 'grey', 'manatee', 'wild-blue', 'white'];

//Setting up a color pallet
makeColorDivs(colorArr);

//function for setting color in colorDiv 
function changeDivColor(currentColor) {
  colorDiv.className = `clr ${currentColor}`;
}

//function for chagne value of current color 
function changeCurrentColor(classname) {
  currentColor = classname;
}

//Eventlistener for click on color tools
colorParent.addEventListener('click', (event) => {
  currentColor = event.target.classList.value;
  changeDivColor(currentColor);
})

//Eventlister for mousedown for grid Area
document.addEventListener('mousedown', (event) => {
  mouseDown = true;
  if (mouseDown) {
    if (currentTool.classList.contains('square') && event.target.classList.contains('pixel')) {
      let pixelArr = document.querySelectorAll('.pixel');
      pixelArr.forEach(element => {
        element.className = `pixel ${currentColor}`;
      })
    }

    if (currentTool.classList.contains('eye-dropper') && event.target.classList.contains('pixel')) {
      changeCurrentColor(event.target.classList[1]);
      changeDivColor(currentColor);
    }
  }
});

document.addEventListener('mouseup', (event) => {
  mouseDown = false;
});

// Eventlistener for coloring the grid
gridArea.addEventListener('mouseover', (event) => {
  if (mouseDown) {
    if (currentTool.classList.contains('pencil') && event.target.classList.contains('pixel')) {
      event.target.className = `pixel ${currentColor}`;
    }

    if (currentTool.classList.contains('eraser') && event.target.classList.contains('pixel')) {
      event.target.className = "pixel";
    }
  }
  if(!mouseDown){
    if (currentTool.classList.contains('paint-brush') && event.target.classList.contains('pixel')) {
      event.target.className = `pixel ${currentColor}`;
    }
  }
})

//setting up editable tools for editing the art
colorTools.addEventListener('click', (event) => {
  clickedTool = event.target;
  currentTool.className = `${clickedTool.classList.value}`;

  if (currentTool.classList.contains('trash')) {
    let pixelArr = document.querySelectorAll('.pixel');
    pixelArr.forEach(element => {
      element.className = 'pixel';
    })
  }
})

//EventListerner for the cancelling alert
alertBtn.addEventListener('click', (event) => {
  alertElem.style.display = 'none';
})
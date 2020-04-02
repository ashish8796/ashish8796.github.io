// Setting number in the 360 degree angle in a circle form

let frame = document.querySelector('.frame');
let radius = 130;

function createHourNumbers(number) {
  let pTag = document.createElement('p');    // creating a p tag

  pTag.classList.add('hour-number');        //making a 'hour-number' tag
  pTag.innerHTML = number;
  pTag.setAttribute('data-id', number);
  frame.insertAdjacentElement('afterbegin', pTag);
  let redAngle = (Math.PI * number * 30) / 180;
  shiftHour(pTag, redAngle);
}

for (let i = 0; i < 12; i++) {
  createHourNumbers(i + 1)
}

// Function that is calculating x,y cordinate for each no

function shiftHour(elem, angle) {
  xCord = radius * Math.sin(angle);
  yCord = radius * (1 - Math.cos(angle));

  //position numbers according to the x,y cordinate

  elem.style.left = `calc( 50% + ${xCord}px )`;
  elem.style.top = yCord + 'px';
}

//Function for moving the different clock hand;

let secHand = document.querySelector('.sec-hand');
let minHand = document.querySelector('.min-hand');
let hrHand = document.querySelector('.hr-hand');

function moveClockHand() {
  let date = new Date();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours();

  hoursElem = date.getHours();
  minutesElem = date.getMinutes();

  let secDegree = -90 + seconds * 6;
  let minDegree = -90 + minutes * 6 + seconds * .1;
  let hrDegree = -90 + (hours * 3600 + minutes * 60 + seconds) / 120;

  secHand.setAttribute('style', `transform : rotate(${secDegree}deg)`);
  minHand.setAttribute('style', `transform : rotate(${minDegree}deg)`);
  hrHand.setAttribute('style', `transform : rotate(${hrDegree}deg)`);

}

// Function for digital clock 

let hoursElem = document.querySelector('#hours');
let minutesElem = document.querySelector('#minutes');
let dayNightElem = document.querySelector('#day-night');

let dayElem = document.querySelector('#day');
let dateElem = document.querySelector('#date');
let monthElem = document.querySelector('#month');
let yearElem = document.querySelector('#year');

function digitalClock() {
  let date = new Date();
  minutes = date.getMinutes();
  console.log(minutes);
 
  minutesElem.innerText = minutes;
}

moveClockHand();

digitalClock();

setInterval(() => {
  moveClockHand();
  digitalClock();
}, 1000)




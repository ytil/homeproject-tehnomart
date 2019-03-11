"use strict";

//popup close/open
let body = document.body;
let modal = document.querySelector("#modal");
let modalOverlay = document.querySelector("#modal-overlay");
let closeButton = document.querySelector("#close-button");
let openButton = document.querySelector("#open-button");

[modalOverlay, closeButton, openButton].forEach(elem => {
  elem.addEventListener('click', function() {
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
    body.classList.toggle("overflow-hidden");
  });
});


//features-slider
const firstSliderOptions = {
  'sliderClassName': '.slider-1',
  'slideClassName': '.slide',
  'pauseOnHover': true,
  'stopOnClick': true,
  'autoplayInterval': 5000,
  'dots': true,
  'dotsPanelClassName': '.control-panel',
  'dotClassName': '.control-element',
  'arrows': true,
  'prevButtonClassName': '.prev',
  'nextButtonClassName': '.next'
};

// const options = {
//   'sliderClassName': '.slider-1',
//   'slideClassName': '.slide',
//   'pauseOnHover': true,
//   'stopOnClick': true,
//   'autoplayInterval': 5000,
//   'dots': true,
//   'dotsPanelClassName':'.control-panel',
//   'dotClassName': '.dot',
//   'arrows': true,
//   'prevButtonClassName': '.prev',
//   'nextButtonClassName': '.next'
//   'slideDidChanged: 'function' //  callback when slide did changed
// };


let sliderFeatures = new Sl(firstSliderOptions);
sliderFeatures.start();


//services-slider
const secondSliderOptions = {
  'sliderClassName': '.slider-2',
  'slideClassName': '.slide',
  'pauseOnHover': true,
  'stopOnClick': true,
  'autoplayInterval': 5000,
  'dots': true,
  'dotsPanelClassName': '.control-panel',
  'dotClassName': '.control-element',
};

let sliderServices = new Sl(secondSliderOptions);
sliderServices.start();



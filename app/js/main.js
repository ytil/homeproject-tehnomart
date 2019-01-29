"use strict";

//popup close/open
let body = document.body;
let modal = document.querySelector("#modal");
let modalOverlay = document.querySelector("#modal-overlay");
let closeButton = document.querySelector("#close-button");
let openButton = document.querySelector("#open-button");

[modalOverlay, closeButton, openButton].forEach(elem => {
  elem.addEventListener('click', function () {
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
    body.classList.toggle("overflow-hidden");
  });
});


//features-slider
const firstSliderOptions = {
  'sliderName': 'slider-1',
  '2pauseOnHover': true,
  'stopOnClick': true,
  'autoplayInterval': 5000,
  'arrows': true,
  'prevButtonId': 'prev',
  'nextButtonId': 'next',
  'dots': true
};


let sliderFeatures = new Sl(firstSliderOptions);
sliderFeatures.start();


//services-slider
const secondSliderOptions = {
  'sliderName': 'slider-2',
  'pauseOnHover': true,
  'stopOnClick': true,
  'autoplayInterval': 5000,
  'dots': true
};

let sliderServices = new Sl(secondSliderOptions);
sliderServices.start();



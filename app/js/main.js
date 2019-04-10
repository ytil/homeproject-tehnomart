"use strict";

//slider
$(document).ready(function() {
  $('.features__slider').slick({
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    dots: true,
    prevArrow:
      '<svg class="slide__button-prev" width="22" height="40"><use xlink:href="#icon-icon-left" /></svg>',
    nextArrow:
      '<svg class="slide__button-next" width="22" height="40"><use xlink:href="#icon-icon-right" /></svg>',
    appendDots: '.features__slider',
    dotsClass: 'custom-dots',
  });
});

//tabs
$('.tab-content.service').not(':first').hide()

$('.services__tabs .tab').click(function() {

  $('.services__tabs .tab')
    .removeClass('active')
    .eq($(this).index())
    .addClass('active')

  $('.tab-content')
    .hide()
    .eq($(this).index())
    .fadeIn()

}).eq(0).addClass('active')


//popup close/open
const body = document.body;
const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector("#modal-overlay");
const closeButton = document.querySelector("#close-button");
const openButton = document.querySelector("#open-button");

[modalOverlay, closeButton, openButton].forEach(elem => {
  elem.addEventListener('click', function() {
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
    body.classList.toggle("overflow-hidden");
  });
});


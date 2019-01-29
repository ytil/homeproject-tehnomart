// simple slider by Dmitry Ivannikov

/* Структура HTML:
 * <div class="slider sliderName">
 *   <div class="slide"></div>
 *   <div class="slide"></div>
 *   <div class="slide"></div>
 *
 *   <a href="#" id="prev"></a> // При необходимости
 *   <a href="#" id="next"></a> // При необходимости
 *
 *   <div class="control-panel"> // При необходимости
 *     <a class="control-element" href="#">*</a>
 *     <a class="control-element" href="#">*</a>
 *   </div>
 * </div>
 *
 * Базовые стили: css/slider.css
 *
 * Доступные опции:
 * var options = {
 *  'sliderName': 'slider-1',
 *  'pauseOnHover': true,
 *  'stopOnClick': true,
 *  'autoplayInterval': 5000,
 *  'arrows': true,
 *  'prevButtonId': 'prev',
 *  'nextButtonId': 'next',
 *  'dots': true
 *};
 *
 * Подключение и запуск:
 * let slider = new Sl(options);
 * slider.start();
 *
 * */

function Sl(options) {
  "use strict";

  const sliderName = options.sliderName;
  const allSliderElements = document.querySelectorAll(`.${sliderName} *`);
  const slides = document.querySelectorAll(`.${sliderName} .slide`);

  let prevButton, nextButton, dots;
  let currentSlide = 0;
  let timerId = null;

  let isPaused = true;
  let isStopped = true;


  const changeSlide = function(pause = isPaused, stop = isStopped, goTo) {
    if (pause || stop) {
      return;
    }

    slides[currentSlide].classList.remove('showing');
    dots[currentSlide].classList.remove('active');
    currentSlide = (goTo === undefined)
      ? (currentSlide + 1) % slides.length
      : goTo;
    slides[currentSlide].classList.add('showing');
    dots[currentSlide].classList.add('active');
  };

  const previousSlide = function() {
    let previous = currentSlide !== 0 ? currentSlide - 1 : slides.length - 1;
    changeSlide(false, false, previous);
  };

  // pause autoplay when the mouse is over the slider
  const pauseOnHover = function() {
    allSliderElements.forEach((elem) => {
      elem.addEventListener('mouseover', () => {
        isPaused = true;
      });

      elem.addEventListener('mouseout', () => {
        isPaused = false;
      });
    });
  };

  // stop autoplay when mouse click on slider-elemnt
  const stopOnClick = function() {
    allSliderElements.forEach((elem) => {
      elem.addEventListener('click', () => {
        isStopped = true;
      });
    });
  };

  // control elements
  const arrowsActions = function() {
    prevButton.addEventListener('click', () => {
      previousSlide();
    });

    nextButton.addEventListener('click', () => {
      changeSlide(false, false);
    });
  };
  const dotsActions = function() {
    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        changeSlide(false, false, dotIndex);
      });
    });
  };

  function autoplay() {
    if (timerId) {
      changeSlide();
      timerId = setTimeout(autoplay, options.autoplayInterval);
    }
  }

  // actions listeners
  if (options.pauseOnHover) {
    pauseOnHover();
  }

  if (options.stopOnClick) {
    stopOnClick();
  }

  if (options.arrows) {
    prevButton = document.getElementById(options.prevButtonId);
    nextButton = document.getElementById(options.nextButtonId);
    arrowsActions();
  }

  if (options.dots) {
    dots = document.body.querySelectorAll(`.${sliderName} .control-panel > *`);
    dotsActions();
  }

  this.start = function() {
    isPaused = false;
    isStopped = false;

    if (options.autoplayInterval !== undefined) {
      timerId = true;
      autoplay();
    }
  };

  this.stop = function() {
    isPaused = true;
    isStopped = true;
    timerId = null;
  };
}
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

function Sl(options) {
  "use strict";

  const slider = options.sliderClassName;
  const slide = options.slideClassName;
  const slides = document.querySelectorAll(`${slider} ${slide}`);
  const allSliderElements = document.querySelectorAll(`${slider} *`);
  const slideDidChanged = options.slideDidChanged || null;

  let dots, prev, next;

  let timerId = null;
  let isPaused = true;
  let isStopped = true;

  const state = {
    slide: 0,
    set currentSlide(num) {
      this.slide = num;
      slideDidChanged && slideDidChanged(num);
    },
    get currentSlide() {
      return this.slide;
    }
  };

  function changeSlide(pause = isPaused, stop = isStopped, goTo = "next") {
    if (pause || stop) {
      return;
    }

    slides[state.slide].classList.remove("showing");
    dots[state.slide].classList.remove("active");

    if (goTo === "next") {
      state.currentSlide = (state.slide + 1) % slides.length;
    } else if (goTo === "previous") {
      state.currentSlide =
        state.slide !== 0 ? state.slide !== 0 : slides.length - 1;
    } else {
      state.currentSlide = goTo;
    }

    slides[state.slide].classList.add("showing");
    dots[state.slide].classList.add("active");
  }

  if (options.arrows) {
    prev = document.querySelector(options.prevButtonClassName);
    prev.addEventListener("click", () => {
      changeSlide(false, false, "previous");
    });

    next = document.querySelector(options.nextButtonClassName);
    next.addEventListener("click", () => {
      changeSlide(false, false, "next");
    });
  }

  if (options.dots) {
    dots = document.body.querySelectorAll(
      `${slider} ${options.dotsPanelClassName} ${options.dotClassName}`
    );

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => {
        changeSlide(false, false, dotIndex);
      });
    });
  }

  if (options.pauseOnHover) {
    pauseOnHover();
  }

  if (options.stopOnClick) {
    stopOnClick();
  }

  function pauseOnHover() {
    allSliderElements.forEach(elem => {
      elem.addEventListener("mouseover", () => {
        isPaused = true;
      });

      elem.addEventListener("mouseout", () => {
        isPaused = false;
      });
    });
  }

  function stopOnClick() {
    allSliderElements.forEach(elem => {
      elem.addEventListener("click", () => {
        isStopped = true;
      });
    });
  }

  function autoplay() {
    if (timerId) {
      timerId = setTimeout(function() {
        changeSlide();
        autoplay();
      }, options.autoplayInterval);
    }
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

  this.currentSlide = function() {
    return state.currentSlide;
  };
}

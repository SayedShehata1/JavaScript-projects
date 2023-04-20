'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const nav = document.querySelector(`.nav`);
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContenet = document.querySelectorAll(`.operations__content`);

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener(`click`, openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/////////////////////////
//button scrooling

btnScrollTo.addEventListener(`click`, function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});
//////////////////////////////
//    Page navigation
//1-Add eventListener to the parent element
//2-Determin what element originated the event
document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  e.preventDefault();
  //Matching strategy
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

//Tabbed component

tabsContainer.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.operations__tab`);
  // Guard clause
  if (!clicked) return;
  //Remove active classes
  tabs.forEach(t => t.classList.remove(`operations__tab--active`));
  tabsContenet.forEach(c => c.classList.remove(`operations__content--active`));
  //Activate tab
  clicked.classList.add(`operations__tab--active`);
  //Activate tabs content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

//Menu fade animation
const handleOver = function (e, opacity) {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = link.closest(`.nav`).querySelector(`img`);
    siblings.forEach(function (el) {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
//passing argument into handler
nav.addEventListener(`mouseover`, function (e) {
  handleOver(e, 0.5);
});
nav.addEventListener(`mouseout`, function (e) {
  handleOver(e, 1);
});
//Sticky navigation
const header = document.querySelector(`.header`);
const navHight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add(`sticky`);
  else nav.classList.remove(`sticky`);
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHight}px`,
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll(`.section`);

const revealSection = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else entry.target.classList.remove(`section--hidden`);
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add(`section--hidden`);
});
//  Lazy loading images
const imgTargets = document.querySelectorAll(`img[data-src]`);

const loadImg = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener(`load`, function () {
    entry.target.classList.remove(`lazy-img`);
  });
  imgObserver.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});
imgTargets.forEach(img => imgObserver.observe(img));

//slider
const slider = function () {
  const slides = document.querySelectorAll(`.slide`);
  const slider = document.querySelector(`.slider`);
  const btnRight = document.querySelector(`.slider__btn--right`);
  const btnleft = document.querySelector(`.slider__btn--left`);
  const dotContainer = document.querySelector(`.dots`);
  let currentSlide = 0;
  const maxSlide = slides.length;

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        `beforeend`,
        `<button  class="dots__dot" data-slide="${i}"></button> `
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(`.dots__dot`)
      .forEach(dot => dot.classList.remove(`dots__dot--active`));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add(`dots__dot--active`);
  };
  const goToslide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%`)
    );
  };
  //Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) currentSlide = 0;
    else {
      currentSlide++;
    }
    goToslide(currentSlide);
    activateDot(currentSlide);
  };
  const prevSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlide - 1;
    else {
      currentSlide--;
    }
    goToslide(currentSlide);
    activateDot(currentSlide);
  };

  btnRight.addEventListener(`click`, nextSlide);
  btnleft.addEventListener(`click`, prevSlide);
  document.addEventListener(`keydown`, function (e) {
    if (e.key === `ArrowRight`) nextSlide();
    if (e.key === `ArrowLeft`) prevSlide();
  });
  dotContainer.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`dots__dot`)) {
      const { slide } = e.target.dataset;
      goToslide(slide);
      activateDot(slide);
    }
  });
  const init = function () {
    goToslide(0);
    createDots();
    activateDot(0);
  };
  init();
};
slider();

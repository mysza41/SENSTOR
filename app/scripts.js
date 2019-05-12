const NAVHEIGHT = 0.1;
sectionOverview = document.querySelector('.section-overview');
nav = document.querySelector('.nav');
sectionShop = document.querySelector('.section-shop');
sectionShopContainer = document.querySelector('.section-shop-product-container');
navButtons = document.querySelector('.nav-buttons');
heroButtons = document.querySelector('.header-hero-button-container');
hamburgerButton = document.querySelectorAll('.nav-icon');


window.addEventListener('scroll', scrollHandler);
window.addEventListener('scroll', scrollHandlerShop);
navButtons.addEventListener('click', (e) => navHandler(e));
heroButtons.addEventListener('click', (e) => navHandler(e));
hamburgerButton.forEach(button => button.addEventListener('click', hamburgerHandler));

function hamburgerHandler() {
    nav.classList.toggle('nav-open');
}

function navHandler(e) {
  if(e.target.dataset.target) {
    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      window.scrollTo(0, ease(progress, window.scrollY, document.querySelector(`.${e.target.dataset.target}`).offsetTop - window.scrollY - 0.05 * window.innerHeight, 1500));
      if (progress < 1500) {
          window.requestAnimationFrame(step);
      }
      function ease (t, b, c, d) {
          t /= d;
          return c*t*t + b;
      }
    }
    window.requestAnimationFrame(step);
  }
}

function scrollHandler() {
  displayNav();
}

function scrollHandlerShop() {
  if (window.scrollY >= 0.9 * sectionShop.offsetTop) {
        sectionShopContainer.classList.add('large');
        setTimeout(() => {
            sectionShopContainer.classList.remove('large');
            window.removeEventListener('scroll', scrollHandlerShop);
        }, 500);
    }
}

function displayNav() {
  if (window.scrollY >= sectionOverview.offsetTop - NAVHEIGHT * window.innerHeight && !nav.classList.contains('nav-fixed')) {
    nav.classList.toggle('nav-fixed');
  } else if (window.scrollY < sectionOverview.offsetTop - NAVHEIGHT * window.innerHeight && nav.classList.contains('nav-fixed')) {
    nav.classList.toggle('nav-fixed');
  }
}

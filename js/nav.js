'use strict';

(function () {
  /* ----------------------------
    Мобильное меню
  ---------------------------- */
  var mainMav = document.querySelector('.main-nav');
  var navToggleBtn = mainMav.querySelector('.main-nav__toggle');

  mainMav.classList.remove('main-nav--nojs');

  navToggleBtn.addEventListener('click', function (evt) {
    evt.preventDefault();

    mainMav.classList.toggle('main-nav--closed');
    mainMav.classList.toggle('main-nav--opened');
  })
})();

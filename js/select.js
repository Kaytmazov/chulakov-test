'use strict';

(function () {
  /* ----------------------------
    Стилизация Select
  ---------------------------- */
  function createCustomOption (option) {
    var customOption = document.createElement('li');
    customOption.classList.add('options-list__item');

    if (option.selected) {
      customOption.classList.add('options-list__item--selected');
    }

    customOption.textContent = option.value;

    customOption.addEventListener('click', function () {
      var parent = this.parentNode;
      option.selected = true;
      parent.previousSibling.textContent = this.textContent;
      parent.querySelector('.options-list__item--selected').classList.remove('options-list__item--selected');
      this.classList.add('options-list__item--selected');
    });

    return customOption;
  };

  function createCustomSelect (select) {
    var selectsContainer = document.querySelector('.bank-card__expiry-date');
    var options = select.options;
    var selectedOption = options[select.selectedIndex];

    var customSelect = document.createElement('div');
    var customSelectValue = document.createElement('span');
    var customOptionsWrapper = document.createElement('ul');

    select.style.display = 'none';
    customSelect.classList.add('input-control', 'input-control--select');
    customSelect.tabIndex = '0';

    customSelectValue.textContent = selectedOption.value;
    customSelect.appendChild(customSelectValue);

    customOptionsWrapper.classList.add('options-list');

    Array.from(options).forEach(function (it) {
      customOptionsWrapper.appendChild(createCustomOption(it));
    });


    customSelect.appendChild(customOptionsWrapper);

    customSelect.addEventListener('click', function () {
      this.classList.toggle('input-control--select-open');
    });

    selectsContainer.appendChild(customSelect);
  };

  var monthSelect = document.querySelector('#month');
  var yearSelect = document.querySelector('#year');

  createCustomSelect(monthSelect);
  createCustomSelect(year);
})();

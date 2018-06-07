'use strict';

(function () {
  /* ----------------------------
    Валидация формы
  ---------------------------- */

  function CustomValidation(input) {
    this.invalidities = [];
    this.validityChecks = [];
    this.inputNode = input;
    this.registerListener();
  }

  CustomValidation.prototype = {
    addInvalidity: function(message) {
      this.invalidities.push(message);
    },
    getInvalidities: function() {
      return this.invalidities.join('. \n');
    },
    checkValidity: function(input) {
      for (var i = 0; i < this.validityChecks.length; i++) {
        var isInvalid = this.validityChecks[i].isInvalid(input);

        if (isInvalid) {
          this.addInvalidity(this.validityChecks[i].invalidityMessage)
        }
      }
    },
    checkInput: function() {

      this.inputNode.CustomValidation.invalidities = [];
      this.checkValidity(this.inputNode);

      if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
        this.inputNode.setCustomValidity('');
        this.inputNode.classList.remove('input-control--error');
      } else {
        var message = this.inputNode.CustomValidation.getInvalidities();
        this.inputNode.setCustomValidity(message);
        this.inputNode.classList.add('input-control--error');
      }
    },
    registerListener: function() {
      var CustomValidation = this;

      this.inputNode.addEventListener('input', function() {
        CustomValidation.checkInput();
      });
    }
  };


  var numberValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value.length !== 4;
      },
      invalidityMessage: 'Поле должно содержать 4 символа'
    },
    {
      isInvalid: function(input) {
        var illegalCharacters = input.value.match(/[^0-9]/g);
        return illegalCharacters ? true : false;
      },
      invalidityMessage: 'Только цифры'
    }
  ];

  var nameValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value.length < 4;
      },
      invalidityMessage: 'Минимальная длина имени 4 символа'
    },
    {
      isInvalid: function(input) {
        var illegalCharacters = input.value.match(/[^A-Za-z\s]/g);
        return illegalCharacters ? true : false;
      },
      invalidityMessage: 'Только латинскими буквами'
    }
  ];

  var cvcValidityChecks = [
    {
      isInvalid: function(input) {
        return input.value.length !== 3;
      },
      invalidityMessage: 'Поле должно содержать 3 символа'
    },
    {
      isInvalid: function(input) {
        var illegalCharacters = input.value.match(/[^0-9]/g);
        return illegalCharacters ? true : false;
      },
      invalidityMessage: 'Только цифры'
    }
  ];


  var numberInputs = document.querySelectorAll('.input-control--number');
  var nameInput = document.querySelector('.input-control--name');
  var cvcInput = document.querySelector('.input-control--cvc');

  for (var i = 0; i < numberInputs.length; i++) {
    numberInputs[i].CustomValidation = new CustomValidation(numberInputs[i]);
    numberInputs[i].CustomValidation.validityChecks = numberValidityChecks;
  }

  nameInput.CustomValidation = new CustomValidation(nameInput);
  nameInput.CustomValidation.validityChecks = nameValidityChecks;

  cvcInput.CustomValidation = new CustomValidation(cvcInput);
  cvcInput.CustomValidation.validityChecks = cvcValidityChecks;


  var inputs = document.querySelectorAll('input:not([type="submit"])');
  var submit = document.querySelector('input[type="submit"');
  var form = document.querySelector('.bank-card');

  function validate() {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].CustomValidation.checkInput();
    }
  }

  submit.addEventListener('click', validate);
  form.addEventListener('submit', validate);
})();

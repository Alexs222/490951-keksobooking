'use strict';

(function () {
  // Форма

// Заголовок объявления
  var notice = document.querySelector('.notice');
  var titleInput = notice.querySelector('#title');
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок должен состоять минимум из 30-и символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок не должен превышать 100-а символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  // Цена за ночь
  var selectTypeHouse = notice.querySelector('#type');
  var priceHouse = notice.querySelector('#price');
  var selectChangeTypeHendler = function () {
    switch (selectTypeHouse.value) {
      case 'bungalo':
        priceHouse.placeholder = '0';
        priceHouse.min = 0;
        break;
      case 'flat':
        priceHouse.placeholder = '1000';
        priceHouse.min = 1000;
        break;
      case 'house':
        priceHouse.placeholder = '5000';
        priceHouse.min = 5000;
        break;
      case 'palace':
        priceHouse.placeholder = '10000';
        priceHouse.min = 10000;
        break;
      default:
        break;
    }
  };
  selectTypeHouse.addEventListener('change', selectChangeTypeHendler);

  // Время заезда и выезда
  var timeInSelected = notice.querySelector('#timein');
  var timeOutSelected = notice.querySelector('#timeout');

  var selectChangeTimeInOutHendler = function (evt) {
    if (evt.target === timeInSelected) {
      timeOutSelected.selectedIndex = evt.target.selectedIndex;
    } else {
      timeInSelected.selectedIndex = evt.target.selectedIndex;
    }
  };

  timeInSelected.addEventListener('change', selectChangeTimeInOutHendler);
  timeOutSelected.addEventListener('change', selectChangeTimeInOutHendler);

  // Количество комнат
  var roomNumberSelect = notice.querySelector('#room_number');
  var capacitySelect = notice.querySelector('#capacity');

  var selectChangeRoomAndCaoacityHendler = function (evt) {
    var deleteAttrDisabled = function () {
      for (var j = 0; j < capacitySelect.options.length; j++) {
        capacitySelect.options[j].removeAttribute('disabled');
      }
    };

    if (evt.target.selectedIndex === 3) {
      deleteAttrDisabled();
      capacitySelect.selectedIndex = 3;
      capacitySelect.options[0].setAttribute('disabled', 'disabled');
      capacitySelect.options[1].setAttribute('disabled', 'disabled');
      capacitySelect.options[2].setAttribute('disabled', 'disabled');
    } else if (evt.target.selectedIndex === 0) {
      deleteAttrDisabled();
      capacitySelect.selectedIndex = 2;
      capacitySelect.options[0].setAttribute('disabled', 'disabled');
      capacitySelect.options[1].setAttribute('disabled', 'disabled');
      capacitySelect.options[3].setAttribute('disabled', 'disabled');
    } else if (evt.target.selectedIndex === 1) {
      deleteAttrDisabled();
      capacitySelect.selectedIndex = 1;
      capacitySelect.options[0].setAttribute('disabled', 'disabled');
      capacitySelect.options[3].setAttribute('disabled', 'disabled');
    } else if (evt.target.selectedIndex === 2) {
      deleteAttrDisabled();
      capacitySelect.selectedIndex = 0;
      capacitySelect.options[3].setAttribute('disabled', 'disabled');
    }
  };

  roomNumberSelect.addEventListener('change', selectChangeRoomAndCaoacityHendler);

})();

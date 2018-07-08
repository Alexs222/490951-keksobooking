'use strict';

(function () {
  // Форма
  var priceMinBungalo = 0;
  var priceMinFlat = 1000;
  var priceMinHouse = 5000;
  var priceMinPalace = 10000;

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
  var selectChangeTypeHandler = function () {
    switch (selectTypeHouse.value) {
      case 'bungalo':
        priceHouse.placeholder = priceMinBungalo + '';
        priceHouse.min = priceMinBungalo;
        break;
      case 'flat':
        priceHouse.placeholder = priceMinFlat + '';
        priceHouse.setAttribute('min', priceMinFlat);
        break;
      case 'house':
        priceHouse.placeholder = priceMinHouse + '';
        priceHouse.min = priceMinHouse;
        break;
      case 'palace':
        priceHouse.placeholder = priceMinPalace + '';
        priceHouse.min = priceMinPalace;
        break;
      default:
        break;
    }
  };
  selectTypeHouse.addEventListener('change', selectChangeTypeHandler);

  // Время заезда и выезда
  var timeInSelected = notice.querySelector('#timein');
  var timeOutSelected = notice.querySelector('#timeout');

  var selectChangeTimeInOutHandler = function (evt) {
    if (evt.target === timeInSelected) {
      timeOutSelected.selectedIndex = evt.target.selectedIndex;
    } else {
      timeInSelected.selectedIndex = evt.target.selectedIndex;
    }
  };

  timeInSelected.addEventListener('change', selectChangeTimeInOutHandler);
  timeOutSelected.addEventListener('change', selectChangeTimeInOutHandler);

  // Количество комнат
  var roomNumberSelect = notice.querySelector('#room_number');
  var capacitySelect = notice.querySelector('#capacity');

  var selectChangeRoomAndCapacityHandler = function (evt) {
    var deleteAttrDisabled = function () {
      var capacitySelectOptions = notice.querySelectorAll('#capacity option');
      capacitySelectOptions.forEach(function (option) {
        option.removeAttribute('disabled');
      });
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

  roomNumberSelect.addEventListener('change', selectChangeRoomAndCapacityHandler);

})();

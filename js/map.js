'use strict';

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

var mapElement = document.querySelector('.map');

// Делаем поля не активными
var fieldsetElements = document.querySelectorAll('fieldset');
var disabledElementFormArr = Array.from(fieldsetElements);
for (var i = 0; i < disabledElementFormArr.length; i++) {
  disabledElementFormArr[i].setAttribute('disabled', 'disabled');
}

// Активация страницы
var buttonActivation = document.querySelector('.map__pin--main');

var coordMapPin = {
  'x': buttonActivation.style.left,
  'y': buttonActivation.style.top
};
var formAd = document.querySelector('.ad-form');
var inputAddress = document.querySelector('#address');

// Событие отправки формы на сервер
formAd.addEventListener('submit', function (evt) {
  window.ajax.upload(new FormData(formAd), function () {
    var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)'); // уже было в файле create-block.js
    for (var k = 0; k < mapPinElements.length; k++) {
      mapPinElements[k].remove();
    }
    mapElement.classList.add('map--faded');
    formAd.classList.add('ad-form--disabled');
    for (var j = 0; j < disabledElementFormArr.length; j++) {
      disabledElementFormArr[j].setAttribute('disabled', 'disabled');
    }
    buttonActivation.addEventListener('mouseup', buttonActivationMouseupHandler);
    formAd.reset();
  });
  evt.preventDefault();
});

// Функция обработчик события mouseup на элементе map__pin--main
var buttonActivationMouseupHandler = function () {
  mapElement.classList.remove('map--faded');
  formAd.classList.remove('ad-form--disabled');
  for (var j = 0; j < disabledElementFormArr.length; j++) {
    disabledElementFormArr[j].removeAttribute('disabled');
  }
  inputAddress.value = (parseInt(coordMapPin.x, 10) - MAP_PIN_WIDTH / 2) + ', ' + (parseInt(coordMapPin.y, 10) - MAP_PIN_HEIGHT); // Учитываем ширину метки 62 / 2 и высоту метки 62 + 22
  // window.ajax.load(window.createBlock.onSuccess, window.createBlock.onError); // Инициализируем метки
  // var removeHiddenClass = function (elements) {
  //   for (var k = 0; k < elements.length; k++) {
  //     elements[k].classList.remove('hidden');
  //   }
  // };
  // var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  // removeHiddenClass(mapPinElements);
  window.ajax.load(window.createBlock.onSuccess, window.createBlock.onError);

  buttonActivation.removeEventListener('mouseup', buttonActivationMouseupHandler); // Удаляем обработчик события с главной метки
};

buttonActivation.addEventListener('mouseup', buttonActivationMouseupHandler);

// Расчет ширины метки
var mapWidth = function () {
  var mapPinElement = document.querySelector('.map__pin--main img');
  var mapPinComputed = getComputedStyle(mapPinElement);
  return parseInt(mapPinComputed.borderLeftWidth, 10) + parseInt(mapPinComputed.paddingLeft, 10) + parseInt(mapPinComputed.marginLeft, 10);
};

// Перетаскивание метки
var body = document.querySelector('body');
buttonActivation.addEventListener('mousedown', function (evt) {

  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    inputAddress.value = (buttonActivation.offsetLeft - shift.x + MAP_PIN_WIDTH / 2) + ', ' + (buttonActivation.offsetTop - shift.y + MAP_PIN_HEIGHT); // Учитываем ширину метки 62 / 2 и высоту метки 62 + 22

    if (buttonActivation.offsetTop - shift.y < 130) {
      buttonActivation.style.top = 130;
    } else if (buttonActivation.offsetTop - shift.y > 630) {
      buttonActivation.style.top = 630;
    } else {
      buttonActivation.style.top = (buttonActivation.offsetTop - shift.y) + 'px';
    }

    if (buttonActivation.offsetLeft - shift.x < 0) {
      buttonActivation.style.left = 0;
    } else if (buttonActivation.offsetLeft - shift.x > body.offsetWidth - MAP_PIN_WIDTH - mapWidth()) {
      buttonActivation.style.left = body.offsetWidth - MAP_PIN_WIDTH - mapWidth();
    } else {
      buttonActivation.style.left = (buttonActivation.offsetLeft - shift.x) + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evtDragged) {
        evtDragged.preventDefault();
        buttonActivation.removeEventListener('click', onClickPreventDefault);
      };
      buttonActivation.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

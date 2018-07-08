'use strict';

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var mapElement = document.querySelector('.map');

var disabledFieldset = function () {
  disabledElementFormArr.forEach(function (disabledElementForm) {
    disabledElementForm.setAttribute('disabled', 'disabled');
  });
};


var clearForm = function (valStyle) {
  var DEFAULT_COLOR_SUBMIT_BUTTON = '#ffaa99';
  var DEFAULT_COLOR_LABAL_TEXT = '#999999';
  var inputsForm = formAd.querySelectorAll('input, select, textarea');
  var labelsForm = formAd.querySelectorAll('label');
  var buttonSubmit = formAd.querySelector('.ad-form__submit');
  var labelAvatar = formAd.querySelector('.ad-form-header__drop-zone');
  var labelPhoto = formAd.querySelector('.ad-form__drop-zone');

  if (valStyle === 'none') {
    buttonSubmit.style.borderColor = DEFAULT_COLOR_SUBMIT_BUTTON;
    labelAvatar.style.color = DEFAULT_COLOR_LABAL_TEXT;
    labelPhoto.style.color = DEFAULT_COLOR_LABAL_TEXT;
  } else {
    buttonSubmit.style.borderColor = '';
    labelAvatar.style.color = '';
    labelPhoto.style.color = '';
  }
  inputsForm.forEach(function (inputForm) {
    inputForm.style.border = valStyle;
  });
  labelsForm.forEach(function (labelForm) {
    labelForm.style.boxShadow = valStyle;
  });
};

// Делаем поля не активными
var fieldsetElements = document.querySelectorAll('fieldset');
var disabledElementFormArr = Array.from(fieldsetElements);
disabledFieldset();

var formAd = document.querySelector('.ad-form');
if (formAd.classList.contains('ad-form--disabled')) {
  clearForm('none');
}

// Активация страницы
var buttonActivation = document.querySelector('.map__pin--main');

var coordMapPin = {
  'x': buttonActivation.style.left,
  'y': buttonActivation.style.top
};
var inputAddress = document.querySelector('#address');

// Событие отправки формы на сервер
var deactivate = function () {
  clearForm('none');

  var defaultSrcImg = 'img/muffin-grey.svg';
  var cardBlock = document.querySelector('.map__card');
  if (cardBlock) {
    cardBlock.remove();
  }
  var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  mapPinElements.forEach(function (mapPinElement) {
    mapPinElement.remove();
  });
  buttonActivation.style.left = coordMapPin.x;
  buttonActivation.style.top = coordMapPin.y;

  mapElement.classList.add('map--faded');
  formAd.classList.add('ad-form--disabled');
  disabledFieldset();
  buttonActivation.addEventListener('mouseup', buttonActivationMouseupHandler);

  var defaultPlaceholder = '1000';
  var inputPrice = document.querySelector('#price');
  inputPrice.setAttribute('placeholder', defaultPlaceholder);

  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  previewAvatar.src = defaultSrcImg;

  var preview = document.querySelector('.ad-form__photo');
  var images = document.querySelectorAll('.ad-form__photo-img');
  images.forEach(function (image) {
    preview.removeChild(image);
  });


  formAd.reset();
};

var onSuccessUpload = function () {
  deactivate();
  var msg = document.querySelector('.success');
  msg.classList.remove('hidden');
  document.addEventListener('click', function () {
    msg.classList.add('hidden');
  });
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === window.commonConst.KEY_ESC) {
      msg.classList.add('hidden');
    }
  });
};

var onErrorUpload = function (errorMessage) {
  var DELAY_TIME = 5000;
  var nodeErr = document.createElement('div');
  nodeErr.textContent = errorMessage;
  nodeErr.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  nodeErr.style.position = 'absolute';
  nodeErr.style.left = 0;
  nodeErr.style.right = 0;
  nodeErr.style.fontSize = '30px';
  nodeErr.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', nodeErr);
  setTimeout(function () {
    nodeErr.remove();
  }, DELAY_TIME);
};

formAd.addEventListener('submit', function (evt) {
  window.ajax.upload(new FormData(formAd), onSuccessUpload, onErrorUpload);
  evt.preventDefault();
});

// Сброс формы
var resetForm = document.querySelector('.ad-form__reset');
resetForm.addEventListener('click', deactivate);

// Функция обработчик события mouseup на элементе map__pin--main
var buttonActivationMouseupHandler = function () {


  mapElement.classList.remove('map--faded');
  formAd.classList.remove('ad-form--disabled');
  disabledElementFormArr.forEach(function (disabledElementForm) {
    disabledElementForm.removeAttribute('disabled');
  });
  inputAddress.value = (parseInt(coordMapPin.x, 10) - MAP_PIN_WIDTH / 2) + ', ' + (parseInt(coordMapPin.y, 10) - MAP_PIN_HEIGHT); // Учитываем ширину метки 62 / 2 и высоту метки 62 + 22
  window.ajax.load(window.createBlock.onSuccess, window.createBlock.onError);
  buttonActivation.removeEventListener('mouseup', buttonActivationMouseupHandler); // Удаляем обработчик события с главной метки

  clearForm('');

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
    var MIN_HEIGHT = 130;
    var MAX_HEIGHT = 630;
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

    if (buttonActivation.offsetTop - shift.y < MIN_HEIGHT) {
      buttonActivation.style.top = MIN_HEIGHT;
    } else if (buttonActivation.offsetTop - shift.y > MAX_HEIGHT) {
      buttonActivation.style.top = MAX_HEIGHT;
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

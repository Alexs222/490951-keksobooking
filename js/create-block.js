'use strict';

window.createBlock = (function () {
  var dataArrPins = [];

  var openCard = function (evt, mapElement) {
    var left = evt.currentTarget.style.left;
    var top = evt.currentTarget.style.top;

    var mapFiltersContainerElement = document.querySelector('.map__filters-container');
    dataArrPins.forEach(function (dataArrPin) {
      var pinLeft = dataArrPin.location.x - window.commonConst.POINT_WIDTH / 2 + 'px';
      var pinTop = dataArrPin.location.y - window.commonConst.POINT_HEIGHT + 'px';
      if (pinLeft === left && pinTop === top) {
        mapElement.insertBefore(window.renderMapCard(dataArrPin), mapFiltersContainerElement);
      }
    });
  };

  var buttonClickMapPinsHandler = function (evt) {
    var timeDelay = 100;
    var mapElement = document.querySelector('.map');
    var cardBlock = document.querySelector('.map__card');
    if (!cardBlock) {
      openCard(evt, mapElement);
    } else {
      setTimeout(cardBlock.remove(), timeDelay);
      setTimeout(openCard(evt, mapElement), timeDelay);
    }
  };

  var renderMapPoint = function (point) {
    var similarMapPinTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');
    var pointElement = similarMapPinTemplate.cloneNode(true);
    pointElement.style.left = point.location.x - window.commonConst.POINT_WIDTH / 2 + 'px'; // Учитываем ширину метки
    pointElement.style.top = point.location.y - window.commonConst.POINT_HEIGHT + 'px'; // Учитываем высоту метки

    pointElement.addEventListener('click', buttonClickMapPinsHandler);
    pointElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.commonConst.KEY_ENTER) {
        buttonClickMapPinsHandler(evt);
      }
    });

    var imgElement = pointElement.querySelector('img');
    imgElement.src = point.author.avatar;
    imgElement.alt = point.offer.title;
    return pointElement;
  };

  var renderFragment = function (points) {
    var MAX_PINS = 5;
    var similarMapPinsElement = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    points.filter(function (_, i) {
      return i < MAX_PINS;
    })
    .map(function (e) {
      return renderMapPoint(e);
    })
    .forEach(function (pin) {
      fragment.appendChild(pin);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.map__pin:not(.map__pin--main)'), function (el) {
      el.remove();
    });
    similarMapPinsElement.appendChild(fragment);
  };

  var checkPrice = function (value, selectPrice) {
    var intervalLow = 10000;
    var intervalHigh = 50000;
    switch (selectPrice) {
      case 'middle':
        return value > intervalLow && value < intervalHigh;
      case 'low':
        return value < intervalLow;
      case 'high':
        return value > intervalHigh;
      default:
        return true;
    }
  };
  var checkType = function (value, selectType) {
    return value === selectType || selectType === 'any';
  };
  var checkRoom = function (value, selectRoom) {
    return parseInt(value, 10) === parseInt(selectRoom, 10) || selectRoom === 'any';

  };
  var checkGuest = function (value, selectGuest) {
    return parseInt(value, 10) === parseInt(selectGuest, 10) || selectGuest === 'any';
  };

  var checkCheckBox = function (value, checkBoxWifi) {
    if (checkBoxWifi) {
      return value.indexOf(checkBoxWifi) > -1;
    }
    return true;
  };

  // Фильтрация
  var filterPins = function (filters) {
    var filteredPins = [];
    if (filters) {
      filteredPins = dataArrPins.filter(function (pin) {

        return checkType(pin.offer.type, filters['housing-type']) &&
          checkPrice(pin.offer.price, filters['housing-price']) &&
          checkRoom(pin.offer.rooms, filters['housing-rooms']) &&
          checkGuest(pin.offer.guests, filters['housing-guests']) &&
          checkCheckBox(pin.offer.features, filters['wifi']) &&
          checkCheckBox(pin.offer.features, filters['dishwasher']) &&
          checkCheckBox(pin.offer.features, filters['parking']) &&
          checkCheckBox(pin.offer.features, filters['washer']) &&
          checkCheckBox(pin.offer.features, filters['elevator']) &&
          checkCheckBox(pin.offer.features, filters['conditioner']);
      });
    } else {
      filteredPins = dataArrPins;
    }
    return filteredPins;
  };

  var generateSelectFilters = function (filters) {
    var selectElements = filterBlock.querySelectorAll('.map__filter');
    selectElements.forEach(function (selectElement) {
      var selectElementName = selectElement.getAttribute('name');
      filters[selectElementName] = selectElement.options[selectElement.selectedIndex].value;
    });
    return filters;
  };

  var generateCheckBoxFilters = function (filters) {
    var checkboxElements = filterBlock.querySelectorAll('.map__checkbox');
    checkboxElements.forEach(function (checkBoxElement) {
      var checkBoxElementValue = checkBoxElement.value;
      if (checkBoxElement.checked) {
        filters[checkBoxElementValue] = checkBoxElement.value;
      }
    });
    return filters;
  };

  // Функции обработчики на селектах
  var onFilterChange = window.debounce(function () {
    var filters = {};
    var cardBlock = document.querySelector('.map__card');
    if (cardBlock) {
      cardBlock.remove();
    }
    filters = generateSelectFilters(filters);
    filters = generateCheckBoxFilters(filters);
    renderFragment(filterPins(filters));
  });

  // События на селектах
  var filterBlock = document.querySelector('.map__filters-container');

  var selectElements = filterBlock.querySelectorAll('.map__filter');
  selectElements.forEach(function (selectElement) {
    selectElement.addEventListener('change', onFilterChange);
  });
  var checkboxElements = filterBlock.querySelectorAll('.map__checkbox');
  checkboxElements.forEach(function (checkboxElement) {
    checkboxElement.addEventListener('change', onFilterChange);
  });

  // Получение массива данных
  return {
    onSuccess: function (points) {
      dataArrPins = points;
      renderFragment(filterPins());
    },
    onError: function (errorMessage) {
      var DELAY_TIME = 10000;
      var nodeErr = document.createElement('div');
      nodeErr.textContent = errorMessage;
      nodeErr.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; padding: 20px;';
      nodeErr.style.position = 'fixed';
      nodeErr.style.left = 0;
      nodeErr.style.right = 0;
      nodeErr.style.fontSize = '30px';
      nodeErr.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', nodeErr);
      setTimeout(function () {
        nodeErr.remove();
      }, DELAY_TIME);
    }
  };
})();

'use strict';

window.createBlock = (function () {
  var dataArrPins = [];

  var openCard = function (evt, mapElement) {
    var left = evt.currentTarget.style.left;
    var top = evt.currentTarget.style.top;

    var mapFiltersContainerElement = document.querySelector('.map__filters-container');
    for (var j = 0; j < dataArrPins.length; j++) {
      var pinLeft = dataArrPins[j].location.x - window.commonConst.POINT_WIDTH / 2 + 'px';
      var pinTop = dataArrPins[j].location.y - window.commonConst.POINT_HEIGHT + 'px';
      if (pinLeft === left && pinTop === top) {
        mapElement.insertBefore(window.renderMapCard(dataArrPins[j]), mapFiltersContainerElement);
        break;
      }
    }
  };

  var buttonClickMapPinsHandler = function (evt) {
    var mapElement = document.querySelector('.map');
    var cardBlock = document.querySelector('.map__card');
    if (!cardBlock) {
      openCard(evt, mapElement);
    } else {
      setTimeout(cardBlock.remove(), 100);
      setTimeout(openCard(evt, mapElement), 100);
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
      if (evt.keyCode === 13) {
        buttonClickMapPinsHandler(evt);
      }
    });

    var imgElement = pointElement.querySelector('img');
    imgElement.src = point.author.avatar;
    imgElement.alt = point.offer.title;
    return pointElement;
  };

  var renderFragment = function (points) {
    var similarMapPinsElement = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    var pointsLength = (points.length <= 5) ? points.length : 5;
    for (var k = 0; k < pointsLength; k++) {
      var element = points[k];
      var pin = renderMapPoint(element);
      fragment.appendChild(pin);
    }
    Array.prototype.forEach.call(document.querySelectorAll('.map__pin:not(.map__pin--main)'), function (el) {
      el.remove();
    });
    similarMapPinsElement.appendChild(fragment);
  };

  var checkPrice = function (value, selectPrice) {
    switch (selectPrice) {
      case 'middle':
        return value > 10000 && value < 50000;
      case 'low':
        return value < 10000;
      case 'high':
        return value > 50000;
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
    } else {
      return true;
    }
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
      var nodeErr = document.createElement('div');
      nodeErr.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      nodeErr.style.position = 'absolute';
      nodeErr.style.left = 0;
      nodeErr.style.right = 0;
      nodeErr.style.fontSize = '30px';

      nodeErr.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', nodeErr);
    },
  };
})();

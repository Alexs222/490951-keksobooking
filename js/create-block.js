'use strict';

window.createBlock = (function () {
  var dataArrPins = [];
  // var filteredPins = [];

  var openCard = function (evt, mapElement) {
    var left = evt.currentTarget.style.left;
    var top = evt.currentTarget.style.top;


    var mapFiltersContainerElement = document.querySelector('.map__filters-container');
    for (var j = 0; j < dataArrPins.length; j++) {
      var pinLeft = dataArrPins[j].location.x - window.commonConst.POINT_WIDTH / 2 + 'px';
      var pinTop = dataArrPins[j].location.y - window.commonConst.POINT_HEIGHT + 'px';
      if (pinLeft === left && pinTop === top) {
        // console.log(mapPinElements[j]);
        // console.log(evtCopi);

        mapElement.insertBefore(window.renderMapCard(dataArrPins[j]), mapFiltersContainerElement);
        break;
      }
    }
  };


  var buttonClickMapPinsHandler = function (evt) {

    var mapElement = document.querySelector('.map');
    // var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    // console.log(mapPinElements);


    var cardElement = document.querySelector('.map__card');
    if (!cardElement) {
      openCard(evt, mapElement);
    } else {
      setTimeout(cardElement.remove(), 100);
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
    // pointElement.classList.add('hidden');

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
    for (var k = 0; k < points.length; k++) {
      var element = points[k];
      var pin = renderMapPoint(element);
      fragment.appendChild(pin);
    }
    Array.prototype.forEach.call(document.querySelectorAll('.map__pin:not(.map__pin--main)'), function (el) {
      el.remove();
    });
    similarMapPinsElement.appendChild(fragment);
  };


  // Фильтрация
  var filterPins = function (filters) {
    var filteredPins = [];
    if (filters) {
      filteredPins = dataArrPins.filter(function (pin) {
        // var tipeElement = filterBlock.querySelector('#housing-type');
        // console.log(pin.offer.type);

        return pin.offer.type === filters.typeHouse;
        // return pin;
      });
      // console.log(filteredPins);

    } else {
      filteredPins = dataArrPins;
    }
    return filteredPins;
  };

  // Функции обработчики на селектах
  // var typeValue = '';
  var onSelectChangeType = function () {
    var typeValue = tipeElement.options[tipeElement.selectedIndex].value;
    // console.log(typeValue);
    var filters = {
      typeHouse: typeValue,
    };
    renderFragment(filterPins(filters));
  };

  // События на селектах
  var filterBlock = document.querySelector('.map__filters-container');
  var tipeElement = filterBlock.querySelector('#housing-type');
  tipeElement.addEventListener('change', onSelectChangeType);


  // Получение массива данных
  return {
    onSuccess: function (points) {
      dataArrPins = points;
      // console.log(dataArrPins);
      renderFragment(filterPins());
      // updateMapPins();
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
  // var onSuccess = function (points) {
  //   dataArrPins = points;
  //   console.log(dataArrPins);
  //   renderFragment(filterPins());
  //   // updateMapPins();
  // };
  // var onError = function (errorMessage) {
  //   var nodeErr = document.createElement('div');
  //   nodeErr.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  //   nodeErr.style.position = 'absolute';
  //   nodeErr.style.left = 0;
  //   nodeErr.style.right = 0;
  //   nodeErr.style.fontSize = '30px';

  //   nodeErr.textContent = errorMessage;
  //   document.body.insertAdjacentElement('afterbegin', nodeErr);
  // };

  // window.ajax.load(onSuccess, onError);
})();

// return {
//   onSuccess: function (points) {
//     var fragment = document.createDocumentFragment();
//     for (var k = 0; k < points.length; k++) {
//       var element = points[k];
//       fragment.appendChild(renderMapPoint(element));
//     }
//     similarMapPinsElement.appendChild(fragment);
//   },
//   onError: function (errorMessage) {
//     var nodeErr = document.createElement('div');
//     nodeErr.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
//     nodeErr.style.position = 'absolute';
//     nodeErr.style.left = 0;
//     nodeErr.style.right = 0;
//     nodeErr.style.fontSize = '30px';

//     nodeErr.textContent = errorMessage;
//     document.body.insertAdjacentElement('afterbegin', nodeErr);
//   }
// };

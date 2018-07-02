'use strict';

(function () {
  var buttonClickMapPinsHandler = function (evt) {

    var mapElement = document.querySelector('.map');
    var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    var openCard = function () {
      var evtCopi = evt.currentTarget;
      var mapFiltersContainerElement = document.querySelector('.map__filters-container');
      for (var j = 0; j < mapPinElements.length; j++) {
        if (mapPinElements[j].style.left === evtCopi.style.left && mapPinElements[j].style.top === evtCopi.style.top) {
          // console.log(mapPinElements[j]);
          // console.log(evtCopi);

          cardElement = mapElement.insertBefore(window.renderMapCard(filteredPins[j]), mapFiltersContainerElement);
        }
      }

      // var onLoadArr = function (points) {
      //   var mapFiltersContainerElement = document.querySelector('.map__filters-container');
      //   for (var j = 0; j < mapPinElements.length; j++) {
      //     if (mapPinElements[j].style.left === evtCopi.style.left && mapPinElements[j].style.top === evtCopi.style.top) {
      //       cardElement = mapElement.insertBefore(window.renderMapCard(points[j]), mapFiltersContainerElement);
      //     }
      //   }
      // };

      // var onLoadError = function (errorMessage) {
      //   var nodeErr = document.createElement('div');
      //   nodeErr.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      //   nodeErr.style.position = 'absolute';
      //   nodeErr.style.left = 0;
      //   nodeErr.style.right = 0;
      //   nodeErr.style.fontSize = '30px';
      //   nodeErr.textContent = errorMessage;
      //   document.body.insertAdjacentElement('afterbegin', nodeErr);
      // };
      // window.ajax.load(onLoadArr, onLoadError);
    };

    var cardElement = document.querySelector('.map__card');
    if (!cardElement) {
      openCard();
    } else {
      setTimeout(cardElement.remove(), 100);
      setTimeout(openCard(), 100);
    }

    // Закрытие карточк
    var closeCard = function () {
      var closeElement = document.querySelector('.popup__close');
      if (cardElement) {
        closeElement.addEventListener('click', function () {
          cardElement.remove();
        });
        document.addEventListener('keydown', function (e) {
          if (e.keyCode === 27) {
            cardElement.remove();
          }
        });
      }
    };
    setTimeout(closeCard, 500);
  };

  var renderMapPoint = function (point) {
    var similarMapPinTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');
    var pointElement = similarMapPinTemplate.cloneNode(true);
    pointElement.style.left = point.location.x - window.commonConst.POINT_WIDTH / 2 + 'px'; // Учитываем ширину метки
    pointElement.style.top = point.location.y - window.commonConst.POINT_HEIGHT + 'px'; // Учитываем высоту метки
    pointElement.classList.add('hidden');

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
      fragment.appendChild(renderMapPoint(element));
    }
    similarMapPinsElement.appendChild(fragment);
  };

  // Функции обработчики на селектах
  var typeValue = '';
  var onSelectChangeType = function () {
    typeValue = tipeElement.options[tipeElement.selectedIndex].value;
    console.log(typeValue);
    // return typeValue;
  };

  // Фильтрация
  var filteredPins = [];
  var updateMapPins = function () {
    filteredPins = dataArrPins.filter(function (pin) {
      // var tipeElement = filterBlock.querySelector('#housing-type');
      // console.log(pin.offer.type);

      return pin.offer.type === 'house';
      // return pin;
    });
    console.log(filteredPins);

    renderFragment(filteredPins);
  };


  // События на селектах
  var filterBlock = document.querySelector('.map__filters-container');
  var tipeElement = filterBlock.querySelector('#housing-type');
  tipeElement.addEventListener('change', onSelectChangeType);


  // Получение массива данных
  var dataArrPins = [];
  var onSuccess = function (points) {
    dataArrPins = points;
    console.log(dataArrPins);

    updateMapPins();
  };
  var onError = function (errorMessage) {
    var nodeErr = document.createElement('div');
    nodeErr.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    nodeErr.style.position = 'absolute';
    nodeErr.style.left = 0;
    nodeErr.style.right = 0;
    nodeErr.style.fontSize = '30px';

    nodeErr.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', nodeErr);
  };

  window.ajax.load(onSuccess, onError);
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

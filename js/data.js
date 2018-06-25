'use strict';

window.data = (function () {
  var NAME_HOUSING = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
  var TIME_IN_OUT = ['12:00', '13:00', '14:00'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var COUNT_POINTS = 8;
  var MAX_WIDTH = 900;
  var MIN_WIDTH = 300;
  var MAX_HEIGHT = 630;
  var MIN_HEIGHT = 130;
  var PRICE_MAX = 1000000;
  var PRICE_MIN = 1000;
  var ROOMS_MAX = 5;
  var ROOMS_MIN = 1;
  var GUESTS_MAX = 10;
  var GUESTS_MIN = 5;

  var calculationCoordinates = function () {
    return {
      'x': Math.floor(Math.random() * (MAX_WIDTH - window.commonConst.POINT_WIDTH - MIN_WIDTH) + MIN_WIDTH),
      'y': Math.floor(Math.random() * (MAX_HEIGHT - window.commonConst.POINT_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT + window.commonConst.POINT_HEIGHT)
    };
  };

  var randomStrGenerator = function (arrStr) {
    var stringTotal = [];
    var strLength = Math.floor(Math.random() * (arrStr.length - 1) + 1);
    for (var i = 0; i < strLength; i++) {
      var elementStr = arrStr[Math.floor(Math.random() * arrStr.length)];
      if (!stringTotal.includes(elementStr)) {
        stringTotal.push(elementStr);
      }
    }
    return stringTotal;
  };

  var randomDataGenerator = function () {
    var ads = [];
    for (var i = 0; i < COUNT_POINTS; i++) {
      var coords = calculationCoordinates();
      var ad =
        {
          'author': {
            'avatar': 'img/avatars/user' + '0' + (i + 1) + '.png'
          },
          'offer': {
            'title': NAME_HOUSING[i],
            'address': coords.x + ', ' + coords.y,
            'price': Math.floor(Math.random() * (PRICE_MAX - PRICE_MIN) + PRICE_MIN),
            'type': TYPE_HOUSING[Math.floor(Math.random() * TYPE_HOUSING.length)],
            'rooms': Math.floor(Math.random() * (ROOMS_MAX - ROOMS_MIN) + ROOMS_MIN),
            'guests': Math.floor(Math.random() * (GUESTS_MAX - GUESTS_MIN) + GUESTS_MIN),
            'checkin': TIME_IN_OUT[Math.floor(Math.random() * TIME_IN_OUT.length)],
            'checkiout': TIME_IN_OUT[Math.floor(Math.random() * TIME_IN_OUT.length)],
            'features': randomStrGenerator(window.commonConst.FACILITIES),
            'description': '',
            'photos': PHOTOS
          },
          'location': {
            'x': coords.x,
            'y': coords.y
          }
        };

      ads.push(ad);
    }
    return ads;
  };

  var adsData = randomDataGenerator();
  return adsData;
})();


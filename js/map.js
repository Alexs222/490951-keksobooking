'use strict';

var NAME_HOUSING = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var TIME_IN_OUT = ['12:00', '13:00', '14:00'];
var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var COUNT_POINTS = 8;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var POINT_WIDTH = 50;
var POINT_HEIGHT = 70;
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

var similarMapPinTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');

var similarMapPinsElement = document.querySelector('.map__pins');

var calculationCoordinates = function () {
  return {
    'x': Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH) + MIN_WIDTH),
    'y': Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT)
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
          // 'address': location.x + ', ' + location.y,
          'address': coords.x + ', ' + coords.y,
          'price': Math.floor(Math.random() * (PRICE_MAX - PRICE_MIN) + PRICE_MIN),
          'type': TYPE_HOUSING[Math.floor(Math.random() * TYPE_HOUSING.length)],
          'rooms': Math.floor(Math.random() * (ROOMS_MAX - ROOMS_MIN) + ROOMS_MIN),
          'guests': Math.floor(Math.random() * (GUESTS_MAX - GUESTS_MIN) + GUESTS_MIN),
          'checkin': TIME_IN_OUT[Math.floor(Math.random() * TIME_IN_OUT.length)],
          'checkiout': TIME_IN_OUT[Math.floor(Math.random() * TIME_IN_OUT.length)],
          'features': randomStrGenerator(FACILITIES),
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

var renderMapPoint = function (point) {
  var pointElement = similarMapPinTemplate.cloneNode(true);
  pointElement.style.left = point.location.x - POINT_WIDTH / 2 + 'px'; // Учитываем ширину метки
  pointElement.style.top = point.location.y - POINT_HEIGHT + 'px'; // Учитываем высоту метки
  var imgElement = pointElement.querySelector('img');
  imgElement.src = point.author.avatar;
  imgElement.alt = point.offer.title;
  return pointElement;
};

var createBlock = function (points) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < points.length; i++) {
    var element = points[i];
    fragment.appendChild(renderMapPoint(element));
  }
  return fragment;
};

var adsData = randomDataGenerator();
// similarMapPinsElement.appendChild(createBlock(adsData));

// Создаем объявление
var oneElementData = adsData[0];

var similarMapCardTemplate = document.querySelector('template')
    .content
    .querySelector('.map__card');
var mapElement = document.querySelector('.map');
var mapFiltersContainerElement = document.querySelector('.map__filters-container');

var renderMapCard = function (card) {
  var cardElement = similarMapCardTemplate.cloneNode(true);
  var titleCard = cardElement.querySelector('.popup__title');
  titleCard.textContent = card.offer.title;
  var addressCard = cardElement.querySelector('.popup__text--address');
  addressCard.textContent = card.offer.address;
  var priceCard = cardElement.querySelector('.popup__text--price');
  priceCard.textContent = card.offer.price + '₽/руб';
  var typeCard = cardElement.querySelector('.popup__type');
  switch (card.offer.type) {
    case 'flat':
      typeCard.textContent = 'Квартира';
      break;
    case 'palace':
      typeCard.textContent = 'Дворец';
      break;
    case 'house':
      typeCard.textContent = 'Дом';
      break;
    case 'bungalo':
      typeCard.textContent = 'Бунгало';
      break;
    default:
      typeCard.textContent = 'Нет такого варианта размещения';
      break;
  }
  var guestsRoomsCard = cardElement.querySelector('.popup__text--capacity');
  guestsRoomsCard.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';

  var timeInOutCard = cardElement.querySelector('.popup__text--time');
  timeInOutCard.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkiout;

  var featuresListCard = cardElement.querySelector('.popup__features');
  var featureItemWiFi = featuresListCard.querySelector('.popup__feature--wifi');
  var featureItemDishwasher = featuresListCard.querySelector('.popup__feature--dishwasher');
  var featureItemParking = featuresListCard.querySelector('.popup__feature--parking');
  var featureItemWasher = featuresListCard.querySelector('.popup__feature--washer');
  var featureItemElevator = featuresListCard.querySelector('.popup__feature--elevator');
  var featureItemConditioner = featuresListCard.querySelector('.popup__feature--conditioner');

  for (var j = 0; j < FACILITIES.length; j++) {
    for (var i = 0; i < card.offer.features.length; i++) {
      if (FACILITIES[j] !== card.offer.features[i]) {
        switch (card.offer.features[i]) {
          case 'wifi':
            featureItemWiFi.remove();
            break;
          case 'dishwasher':
            featureItemDishwasher.remove();
            break;
          case 'parking':
            featureItemParking.remove();
            break;
          case 'washer':
            featureItemWasher.remove();
            break;
          case 'elevator':
            featureItemElevator.remove();
            break;
          case 'conditioner':
            featureItemConditioner.remove();
            break;
          default:
            break;
        }
      }
    }
  }

  var descriptionCard = cardElement.querySelector('.popup__description');
  descriptionCard.textContent = card.offer.description;

  var photosListCard = cardElement.querySelector('.popup__photos');
  var photoItemCard = cardElement.querySelector('.popup__photo');
  photoItemCard.remove();
  for (var index = 0; index < card.offer.photos.length; index++) {
    var element = photoItemCard.cloneNode(true);
    element.src = card.offer.photos[index];
    photosListCard.appendChild(element);
  }

  var avatarCard = cardElement.querySelector('.popup__avatar');
  avatarCard.src = card.author.avatar;

  return cardElement;
};

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

// Функция обработчик события mouseup на элементе map__pin--main
var buttonActivationMouseupHandler = function () {
  mapElement.classList.remove('map--faded');
  formAd.classList.remove('.ad-form--disabled');
  for (var j = 0; j < disabledElementFormArr.length; j++) {
    disabledElementFormArr[j].removeAttribute('disabled');
  }
  inputAddress.value = (parseInt(coordMapPin.x, 10) - MAP_PIN_WIDTH / 2) + ', ' + (parseInt(coordMapPin.y, 10) - MAP_PIN_HEIGHT); // Учитываем ширину метки 62 / 2 и высоту метки 62 + 22
  similarMapPinsElement.appendChild(createBlock(adsData));

  var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  for (var k = 0; k < mapPinElements.length; k++) {
    mapPinElements[k].addEventListener('click', buttonClickMapPinsHandler);
  }

  buttonActivation.removeEventListener('mouseup', buttonActivationMouseupHandler); // Удаляем обработчик события с главной метки

};

// Функция обработчик события click на элементе map__pin
var buttonClickMapPinsHandler = function (evt) {
  var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)'); // надо разобраться

  var openCard = function () {
    for (var j = 0; j < mapPinElements.length; j++) {
      if (mapPinElements[j].style.left === evt.currentTarget.style.left && mapPinElements[j].style.top === evt.currentTarget.style.top) {
        cardElement = mapElement.insertBefore(renderMapCard(adsData[j]), mapFiltersContainerElement);
      }
    }
  };

  var cardElement = document.querySelector('.map__card');
  if (!cardElement) {
    openCard();
  } else {
    cardElement.remove();
    openCard();
  }

  // Закрытие карточк
  var closeElement = document.querySelector('.popup__close');
  closeElement.addEventListener('click', function () {
    cardElement.remove();
  });

};

buttonActivation.addEventListener('mouseup', buttonActivationMouseupHandler);


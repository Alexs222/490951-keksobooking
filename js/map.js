'use strict';

var NAME_HOUSING = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var TIME_IN_OUT = ['12:00', '13:00', '14:00'];
var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var similarMapPinTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');

var similarMapPinsElement = document.querySelector('.map__pins');

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

// var randomOrderGenerator = function (arrOrder) {
//   var orderArr = [];
//   while (orderArr.length < arrOrder.length) {
//     var order = arrOrder[Math.floor(Math.random() * arrOrder.length)];
//     if (!(orderArr.includes(order))) {
//       orderArr.push(order);
//     }
//   }
//   return orderArr;
// };

var randomDataGenerator = function () {
  var ads = [];
  for (var i = 0; i < 8; i++) {
    var ad =
      {
        'author': {
          'avatar': 'img/avatars/user' + '0' + (i + 1) + '.png'
        },
        'offer': {
          'title': NAME_HOUSING[i],
          'address': location.x + ', ' + location.y,
          'price': Math.floor(Math.random() * (1000000 - 1000) + 1000),
          'type': TYPE_HOUSING[Math.floor(Math.random() * TYPE_HOUSING.length)],
          'rooms': Math.floor(Math.random() * (5 - 1) + 1),
          'guests': Math.floor(Math.random() * (10 - 5) + 5),
          'checkin': TIME_IN_OUT[Math.floor(Math.random() * TIME_IN_OUT.length)],
          'checkiout': TIME_IN_OUT[Math.floor(Math.random() * TIME_IN_OUT.length)],
          'features': randomStrGenerator(FACILITIES),
          'description': '',
          'photos': PHOTOS
        },
        'location': {
          'x': Math.floor(Math.random() * (900 - 300) + 300),
          'y': Math.floor(Math.random() * (630 - 130) + 130)
        }
      };

    ads.push(ad);
  }
  return ads;
};

var renderMapPoint = function (point) {
  var pointElement = similarMapPinTemplate.cloneNode(true);
  pointElement.style.left = point.location.x - 50 / 2 + 'px'; // Учитываем ширину метки
  pointElement.style.top = point.location.y - 70 + 'px'; // Учитываем высоту метки
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
similarMapPinsElement.appendChild(createBlock(adsData));

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

mapElement.insertBefore(renderMapCard(oneElementData), mapFiltersContainerElement);
'use strict';
// Создаем объявление
(function () {

  window.renderMapCard = function (card) {
    var similarMapCardTemplate = document.querySelector('template')
    .content
    .querySelector('.map__card');
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
    timeInOutCard.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var featuresListCard = cardElement.querySelector('.popup__features');
    var featuresItemCards = featuresListCard.querySelectorAll('.popup__feature');
    var arrIncludEleFeatures = [];
    for (var j = 0; j < window.commonConst.FACILITIES.length; j++) {
      for (var i = 0; i < card.offer.features.length; i++) {
        if (window.commonConst.FACILITIES[j] === card.offer.features[i]) {
          arrIncludEleFeatures.push(featuresItemCards[j]);
        }
      }
    }
    featuresItemCards.forEach(function (featuresItemCard) {
      featuresItemCard.remove();
    });
    arrIncludEleFeatures.forEach(function (arrIncludEleFeature) {
      featuresListCard.appendChild(arrIncludEleFeature);
    });

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

    // Закрываем карточку
    var closeElement = cardElement.querySelector('.popup__close');
    closeElement.addEventListener('click', function () {
      cardElement.remove();
    });
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 27) {
        cardElement.remove();
      }
    });

    return cardElement;
  };

})();

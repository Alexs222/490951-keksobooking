'use strict';

(function () {
  var renderMapPoint = function (point) {
    var similarMapPinTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');
    var pointElement = similarMapPinTemplate.cloneNode(true);
    pointElement.style.left = point.location.x - window.commonConst.POINT_WIDTH / 2 + 'px'; // Учитываем ширину метки
    pointElement.style.top = point.location.y - window.commonConst.POINT_HEIGHT + 'px'; // Учитываем высоту метки
    var imgElement = pointElement.querySelector('img');
    imgElement.src = point.author.avatar;
    imgElement.alt = point.offer.title;
    return pointElement;
  };

  window.createBlock = function (points) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < points.length; i++) {
      var element = points[i];
      fragment.appendChild(renderMapPoint(element));
    }
    return fragment;
  };
})();


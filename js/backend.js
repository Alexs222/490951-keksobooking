'use strict';
window.ajax = (function () {
  var URL_DATA = 'https://js.dump.academy/keksobooking/data';
  var URL_OUT = 'https://js.dump.academy/keksobooking';

  return {
    load: function (onLoad, onError) {
      var longTimeOut = 10000;
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          var message = xhr.statusText;
          if (xhr.status === 400) {
            message = xhr.response.reduce(function (msg, item) {
              return msg + item.fieldName + ' ' + item.errorMessage + ';';
            }, '');
          }
          onError('Статус ответа: ' + xhr.status + ' ' + message);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });
      xhr.timeout = longTimeOut;
      xhr.open('GET', URL_DATA);
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var longTimeOut = 10000;
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);

        } else {
          var message = xhr.statusText;
          if (xhr.status === 400) {
            message = xhr.response.reduce(function (msg, item) {
              return msg + item.fieldName + ' ' + item.errorMessage + ';';
            }, '');
          }
          onError('Статус ответа: ' + xhr.status + ' ' + message);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });
      xhr.timeout = longTimeOut;
      xhr.open('POST', URL_OUT);
      xhr.send(data);
    }
  };
})();


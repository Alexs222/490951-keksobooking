'use strict';
window.ajax = (function () {
  var URL_DATA = 'https://js.dump.academy/keksobooking/data';
  var URL_OUT = 'https://js.dump.academy/keksobooking';

  return {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа:' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });
      xhr.timeout = 10000;
      xhr.open('GET', URL_DATA);
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);

        } else {
          onError('Статус ответа:' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });
      xhr.timeout = 10000;
      xhr.open('POST', URL_OUT);
      xhr.send(data);
    }
  };
  // window.load = function (onLoad, onError) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';

  //   xhr.addEventListener('load', function () {
  //     if (xhr.status === 200) {
  //       onLoad(xhr.response);
  //     } else {
  //       onError('Статус ответа:' + xhr.status + ' ' + xhr.statusText);
  //     }
  //   });
  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });
  //   xhr.addEventListener('timeout', function () {
  //     onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
  //   });
  //   xhr.timeout = 10000;
  //   xhr.open('GET', URL);
  //   xhr.send();
  // };

  // window.upload = function (data, onSuccess) {
  //   var xmr = new XMLHttpRequest();
  //   xmr.responseType = 'json';
  //   xmr.addEventListener('load', function () {
  //     onSuccess(xmr.response);
  //   });
  //   xmr.open('POST', URL);
  //   xmr.send(data);
  // };
})();


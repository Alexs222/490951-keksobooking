'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var fileChooser = document.querySelector('.ad-form__input');
  var preview = document.querySelector('.ad-form__photo');
  var image = document.createElement('img');
  image.classList.add('ad-form__photo-img');
  image.style.width = 100 + '%';
  image.style.height = 100 + '%';

  var readFile = function (chooser, imgEl) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imgEl.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };


  var onChangeInputFile = function (evt) {
    if (evt.currentTarget.name === 'avatar') {
      readFile(fileChooserAvatar, previewAvatar);
    } else if (evt.currentTarget.name === 'images') {
      preview.appendChild(image);
      readFile(fileChooser, image);
    }
  };

  fileChooserAvatar.addEventListener('change', onChangeInputFile);
  fileChooser.addEventListener('change', onChangeInputFile);

})();

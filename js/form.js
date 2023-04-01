import {isEscapeKey, body} from './util.js';
import {PATTERN_ERROR_TEXT, REPEAT_ERROR_TEXT, FIVE_ERROR_TEXT, COMMENTARY_ERROR_TEXT} from './data.js';

const sectionPictures = document.querySelector('.pictures');
const form = sectionPictures.querySelector('.img-upload__form');
const formOverlay = sectionPictures.querySelector('.img-upload__overlay');
const formInput = sectionPictures.querySelector('.img-upload__input');
const closeForm = sectionPictures.querySelector('.img-upload__cancel');
const hashtagField = sectionPictures.querySelector('.text__hashtags');
const textField = sectionPictures.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-uplpad__field-wrapper__error',
});

function manageUploads() {
  formInput.addEventListener('change', openUserModal);
}

const hasFocus = () =>
  document.activeElement === hashtagField || document.activeElement === textField;

function openUserModal () {
  formOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt) && !hasFocus()) {
      evt.preventDefault();
      closeFormModal();
    }
  });
  closeForm.addEventListener('click', () => {
    closeFormModal();
  });
}

function closeFormModal () {
  formOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  formInput.value = '';

  document.removeEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      formOverlay.classList.add('hidden');
    }
  });
}

function noRepeats(str) {
  if (str === ' ') {
    return true;
  }
  const lowercased = str.split(/[ ]+/).map((match) => match.toLowerCase());
  const set = new Set(lowercased);
  if (set.size === lowercased.length) {
    return true;
  }
  return false;
}

function matchPattern(str) {
  if (str === ' ') {
    return false;
  }
  const elems = str.split(/[ ]+/);

  const pattern = /^$|(^#[\w\dа-яё]{1,19}$)/;
  for (const elem of elems) {
    if (!pattern.test(elem)) {
      return false;
    }
  }
  return true;
}

function noMoreThanFive(str) {
  const elems = str.split(/[ ]+/);
  if (elems.length < 6) {
    return true;
  }
  return false;
}

function textValidator(str) {
  if (str.length <= 140) {
    return true;
  }
  return false;
}

pristine.addValidator(hashtagField, matchPattern, PATTERN_ERROR_TEXT);
pristine.addValidator(hashtagField, noRepeats, REPEAT_ERROR_TEXT);
pristine.addValidator(hashtagField, noMoreThanFive, FIVE_ERROR_TEXT);
pristine.addValidator(textField, textValidator, COMMENTARY_ERROR_TEXT);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const valid = pristine.validate();
  if (valid) {
    form.submit();
  }
});

export {manageUploads};

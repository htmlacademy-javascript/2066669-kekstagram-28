import {STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE} from './data.js';

const sectionPictures = document.querySelector('.pictures');
const plusButton = sectionPictures.querySelector('.scale__control--smaller');
const minusButton = sectionPictures.querySelector('.scale__control--bigger');
const scaleInput = sectionPictures.querySelector('.scale__control--value');
const image = sectionPictures.querySelector('.img-upload__preview img');

function scaleImage(val) {
  image.style.transform = `scale(${val / 100})`;
  scaleInput.value = `${val}%`;
}

function onMinusClick() {
  const actual = parseInt(scaleInput.value, 10);
  let newValue = actual - STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
}

function onPlusClick() {
  const actual = parseInt(scaleInput.value, 10);
  let newValue = actual + STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
}

const resetScale = () => scaleImage(DEFAULT_SCALE);

plusButton.addEventListener('click', onMinusClick);
minusButton.addEventListener('click', onPlusClick);

export {resetScale};

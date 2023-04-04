const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];
const DEFAULT = 0;
let chosenEffect = EFFECTS[DEFAULT];

const sectionPictures = document.querySelector('.pictures');
const image = sectionPictures.querySelector('.img-upload__preview img');
const effects = sectionPictures.querySelector('.effects');
const slider = sectionPictures.querySelector('.effect-level__slider');
const sliderContainerElement = sectionPictures.querySelector('.img-upload__effect-level');
const effectLevelElement = sectionPictures.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === EFFECTS[DEFAULT];

function updateSlider() {
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start:chosenEffect.max,
  });

  sliderContainerElement.classList.remove('hidden');

  if (isDefault()) {
    sliderContainerElement.classList.add('hidden');
  }
}

function onEffectsChange(evt) {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  image.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
}

function onSliderUpdate() {
  const sliderValue = slider.noUiSlider.get();
  if (isDefault()) {
    image.style.filter = EFFECTS[DEFAULT].style;
  } else {
    image.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }
  effectLevelElement.value = sliderValue;
}

function resetEffects() {
  chosenEffect = EFFECTS[DEFAULT];
  updateSlider();
}

noUiSlider.create(slider, {
  range: {
    min: EFFECTS[DEFAULT].min,
    max: EFFECTS[DEFAULT].max,
  },
  start: EFFECTS[DEFAULT].max,
  step: EFFECTS[DEFAULT].step,
  connect: 'lower',
});
updateSlider();

effects.addEventListener('change', onEffectsChange);
slider.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};

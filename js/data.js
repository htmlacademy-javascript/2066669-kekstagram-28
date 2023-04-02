import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './util.js';

const PICTURE_TOTAL = 25;
const AVATAR_TOTAL = 6;
const LIKE_MIN = 15;
const LIKE_MAX = 200;
const COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTIONS = [
  'Пляж отеля',
  'Указатель',
  'Дикий пляж',
  'Дама с фотоаппаратом',
  'Необычная еда',
  'Макларен',
  'Десерт',
  'Напитки',
  'Дама с самолетом',
  'Обувница',
  'Пляжный забор',
  'Ауди',
  'Блюдо из овощей',
  'Суши котик',
  'Необычные ботинки',
  'Самолет в небе',
  'Хор',
  'Лоурайдер',
  'Тапки с подсветкой',
  'Пальмы',
  'Курица с овощами',
  'Закат',
  'Краб',
  'Концерт',
  'Джиппинг',
];
const NAMES = [
  'Артем',
  'Данил',
  'Александр',
  'Максим',
  'Семен',
  'Иван',
];
const PATTERN_ERROR_TEXT = 'Хэштэг должен начинаться с # и состоять только из букв и чисел';
const REPEAT_ERROR_TEXT = 'Хэштэги не должны повторяться';
const FIVE_ERROR_TEXT = 'Не более 5 хэштэгов';
const COMMENTARY_ERROR_TEXT = 'Комментарий не должен быть длинее 140 символов';
const STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 55;

//Получение случайного числа.


function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePictureId = createRandomIdFromRangeGenerator(1, PICTURE_TOTAL);


const generateCOmmentId = createIdGenerator();

const getRandomMassage = (elements) => {
  const messageAmount = getRandomInteger(1, 2);
  const resultMessage = [];

  for (let i = 0; i < messageAmount; i++) {
    resultMessage.push(getRandomArrayElement(elements));
  }
  return resultMessage.join(' ');
};

const createComments = () => ({
  id: generateCOmmentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_TOTAL)}.svg`,
  message: getRandomMassage(COMMENTS_MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const generateComments = (amount) => {
  const resultComments = [];

  for (let i = 0; i < amount; i++) {
    resultComments.push(createComments());
  }
  return resultComments;
};

const createPicture = (a) => ({
  id: a,
  url: `photos/${a}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN, LIKE_MAX),
  comments: generateComments(getRandomInteger(1, 20)),
});

const createPictures = () => {
  const resultPictures = [];

  for (let i = 0; i < PICTURE_TOTAL; i++) {
    resultPictures.push(createPicture(generatePictureId()));
  }
  return resultPictures;
};

export {createPictures, generateComments, PATTERN_ERROR_TEXT, REPEAT_ERROR_TEXT, FIVE_ERROR_TEXT, COMMENTARY_ERROR_TEXT, STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE};

import {generateRandomNumber} from '../utils.js';

const tagslimit = {
  MIN: 0,
  MAX: 3
};

const TITLES = [
  `Изучить теорию`,
  `Пересмотреть лекцию`,
  `Покрутить демки`,
  `Почитать конспект`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const TAGS = [
  `homework`,
  `theory`,
  `practice`,
  `demo`,
  `intensive`,
  `keks`
];

const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const generateRandomBoolean = () => Math.random() >= 0.5;

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const generateRandomDate = () => (Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000);

const generateTags = () => Array.from(new Set(createNumberRange(generateRandomNumber(tagslimit.MIN, tagslimit.MAX)).map(() => getRandomArrayElement(TAGS))));

const generateCard = () => ({
  title: getRandomArrayElement(TITLES),
  deadlineToggleValue: true,
  dueDate: generateRandomDate(),
  tags: generateTags(),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: getRandomArrayElement(COLORS),
  repeatingDays: {
    mo: generateRandomBoolean(),
    tu: generateRandomBoolean(),
    we: generateRandomBoolean(),
    th: generateRandomBoolean(),
    fr: generateRandomBoolean(),
    sa: generateRandomBoolean(),
    su: generateRandomBoolean()
  },
  isFavorite: generateRandomBoolean(),
  isDone: generateRandomBoolean()
});

const createNumberRange = (limit) => (
  Array.from(new Array(limit), (_, i) => i)
);

export const generateCards = (limit) => (
  createNumberRange(limit).map(() => generateCard())
);

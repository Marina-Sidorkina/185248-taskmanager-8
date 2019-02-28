import {generateRandomNumber} from '../utils';
import {COLORS} from '../constants';

const tagsLimit = {
  MIN: 0,
  MAX: 3
};

const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

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

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const generateRandomBoolean = () => Math.random() >= 0.5;
const generateRandomDate = () => (Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000);
const generateRepeatingDays = () => new Map(DAYS.map((day) => [day, generateRandomBoolean()]));
const generateTags = () => TAGS.sort(() => Math.random() - 0.5).slice(tagsLimit.MIN, generateRandomNumber(tagsLimit.MIN, tagsLimit.MAX));

const createNumberRange = (limit) => Array.from(new Array(limit), (_, i) => i);

const generateCard = () => ({
  title: getRandomArrayElement(TITLES),
  deadlineToggleValue: true,
  dueDate: generateRandomDate(),
  tags: generateTags(),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: getRandomArrayElement(COLORS),
  repeatingDays: generateRepeatingDays(),
  isFavorite: generateRandomBoolean(),
  isDone: generateRandomBoolean()
});

export const generateCards = (limit) => (
  createNumberRange(limit).map(generateCard)
);

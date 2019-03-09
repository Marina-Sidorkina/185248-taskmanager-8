import {getRandomArrayElement} from '../utils';
import {generateRandomBoolean} from '../utils';
import {generateRandomDate} from '../utils';
import {generateRandomArray} from '../utils';
import {createNumberRange} from '../utils';

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

const generateRepeatingDays = () => new Map(DAYS.map((day) => [day, generateRandomBoolean()]));

const generateCard = () => ({
  title: getRandomArrayElement(TITLES),
  deadlineToggleValue: true,
  dueDate: generateRandomDate(),
  tags: new Set(generateRandomArray(TAGS, tagsLimit.MIN, tagsLimit.MAX)),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: getRandomArrayElement(COLORS),
  repeatingDays: generateRepeatingDays(),
  isFavorite: generateRandomBoolean(),
  isDone: generateRandomBoolean()
});

export const generateCards = (limit) => (
  createNumberRange(limit).map(generateCard)
);

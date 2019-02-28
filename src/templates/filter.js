import {generateRandomNumber} from '../utils';

const NAMES = [`ALL`, `OVERDUE`, `TODAY`, `FAVORITES`, `Repeating`, `Tags`, `ARCHIVE`];

const createInputTemplate = (name, status) => {
  const number = generateRandomNumber(1, 15);

  return (
    `<input
      type="radio"
      id="filter__${name.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      value="${number}"
      ${status}
    />
    <label for="filter__${name.toLowerCase()}" class="filter__label">
      ${name} <span class="filter__all-count">${number}</span></label
    >`
  );
};

export const createFilterTemplate = () => (
  NAMES
    .map((name) => {
      const status = name === `TODAY` ? `checked` : ``;
      return createInputTemplate(name, status);
    })
    .join(``)
);

export const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

export const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
export const generateRandomBoolean = () => Math.random() >= 0.5;
export const generateRandomDate = () => (Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000);
export const generateRandomArray = (array, min, max) => array.sort(() => Math.random() - 0.5).slice(min, generateRandomNumber(min, max));

export const createNumberRange = (limit) => Array.from(new Array(limit), (_, i) => i);
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


export const hasRepeatedDay = (repeatingDays) => Object.entries(repeatingDays).some(([_, isRepeatable]) => isRepeatable)

export const checkRepeatingDays = (object, array) => { // @TODO: rename
  for (const pair of Object.entries(object)) {
    if (!array.some((key) => key === pair[0])) {
      object[pair[0]] = false;
    }
  }
};

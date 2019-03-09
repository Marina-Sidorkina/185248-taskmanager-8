export const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
export const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];
export const generateRandomBoolean = () => Math.random() >= 0.5;
export const generateRandomDate = () => (Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000);

export const createElement = (template, callback = (newElement) => newElement.firstChild) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return callback(newElement);
};

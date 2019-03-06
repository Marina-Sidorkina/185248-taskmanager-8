export const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);

export const createCardDivElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

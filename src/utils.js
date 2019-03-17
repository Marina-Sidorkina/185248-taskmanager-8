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

export const resetDisabilityStatus = (element, value) => (
  value ? element.removeAttribute(`disabled`) : element.setAttribute(`disabled`, `disabled`)
);
export const resetYesNoStatus = (element, value) => (
  value ? (element.textContent = `yes`) : (element.textContent = `no`)
);

export const makeArrayFromObject = (object) => Object.keys(object).map((key) => [key, object[key]]);

export const checkRepeatingDays = (object, array) => {
  for (const pair of makeArrayFromObject(object)) {
    if (!array.some((key) => key === pair[0])) {
      object[pair[0]] = false;
    }
  }
};

export const removeCardColor = (element, array) => {
  for (const color of array) {
    const cls = `card--` + color;
    element.classList.remove(cls);
  }
};

export const addNewHashtag = (element) => {
  const hashtagsList = element.querySelector(`.card__hashtag-list`);
  const hashtag = element.querySelector(`.card__hashtag-input`).value.replace(/#/, ``);
  const template = `<span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="${hashtag}"
      class="card__hashtag-hidden-input"
    />
    <button type="button" class="card__hashtag-name">
      #${hashtag}
    </button>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>`;
  hashtagsList.appendChild(createElement(template));
};

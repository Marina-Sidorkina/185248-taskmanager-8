export const createFilterTemplate = (data) => {
  return (
    `<input
      type="radio"
      id="filter__${data._name.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      value="${data._number}"
      ${data._status}
    />
    <label for="filter__${data._name.toLowerCase()}" class="filter__label">
      ${data._name} <span class="filter__all-count">${data._number}</span></label
    >`
  );
};

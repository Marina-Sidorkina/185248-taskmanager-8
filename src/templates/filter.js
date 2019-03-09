export const createFilterTemplate = (data) => (
  `<section class="main__filter filter container">
    ${data
      .map((item) => (
        `<input
          type="radio"
          id="filter__${item.name.toLowerCase()}"
          class="filter__input visually-hidden"
          name="filter"
          value="${item.number}"
          ${item.status}
        />
        <label for="filter__${item.name.toLowerCase()}" class="filter__label">
          ${item.name} <span class="filter__all-count">${item.number}</span></label
        >`
      ))
      .join(``)}
  </section>`
);

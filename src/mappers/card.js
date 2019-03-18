export default (target) => (
  {
    hashtag: (value) => (target.tags.add(value)),
    text: (value) => (target.title = value),
    color: (value) => (target.color = value),
    repeat: (value) => (target.repeatingDays[value] = true),
    date: (value) => (target.dueDate = `${value}, 2019, `),
    time: (value) => (target.dueDate = Date.parse(target.dueDate + value))
  }
);

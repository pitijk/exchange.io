const dateToString = date => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};
// today is today's day of the week, but 1 week earlier. Coz api isn't updating that fast.

export const today = () => {
  const today = new Date();
  today.setDate(today.getDate() - 7);
  return dateToString(today);
};

export const yesterday = () => {
  const today = new Date();
  today.setDate(today.getDate() - 8);
  return dateToString(today);
};

export const calcValues = (amount, shortcut, exchangeRates) => {
  const currentValue = amount / exchangeRates.latest[shortcut];
  const previousValue = exchangeRates.yesterday
    ? amount / exchangeRates.yesterday[shortcut]
    : currentValue;
  return { currentValue, previousValue };
};

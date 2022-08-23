export const convertSecondText = (s) => {
  if (s == NaN) return "0:00";
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
};

export const convertSecond = (s) => {
  return parseInt(s / 1000000.0);
};

export const millisToMinutesAndSeconds = (microseconds) => {
  var seconds = parseInt(microseconds / 1000000.0);
  return convertSecondText(seconds);
};

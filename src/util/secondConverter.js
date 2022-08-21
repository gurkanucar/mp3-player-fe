export const convertSecond = (s) => {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
};

export const millisToMinutesAndSeconds = (microseconds) => {
  var seconds = parseInt(microseconds / 1000000.0);
  return convertSecond(seconds);
};

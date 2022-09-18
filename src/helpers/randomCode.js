export default (min = 100000, max = 999999) => {
  const num = Math.ceil(Math.random() * (max - min) + min);

  return num;
};

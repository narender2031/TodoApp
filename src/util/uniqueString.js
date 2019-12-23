export const uniqueString = () => {
  let string = 'abcdefghijklmnopqrstuvwxyz';
  let str = '';
  for (let i = 1; i <= 6; i++) {
    let randomCharacter = string.charAt(
      Math.floor(Math.random() * string.length),
    );
    str += randomCharacter;
  }
  return str;
};

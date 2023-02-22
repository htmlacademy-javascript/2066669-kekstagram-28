//Функция для проверки длины строки.
const testSymbols = (string, symbols) => string.length <= symbols;
testSymbols();

//Функция для проверки, является ли строка палиндромом.
const palindrom = (string) => {
  const newString = string.toLowerCase().replaceAll(' ', '');
  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += newString.at(i);
  }
  return newString === reverseString;
};
palindrom();

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры.

const extractNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt(result, 10);
};
extractNumber();

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.

const myPadStart = (string, minLenght, pad) => {
  const actualPad = minLenght - string.length;
  if (actualPad <= 0) {
    return string;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
};
myPadStart();

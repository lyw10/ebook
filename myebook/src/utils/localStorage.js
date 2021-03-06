import Storage from "web-storage-cache";

const localStorage = new Storage();

export function setLocalStorage(key, value) {
  return localStorage.set(key, value);
}

export function getLocalStorage(key) {
  return localStorage.get(key);
}

export function removeLocalStorage(key) {
  return localStorage.delete(key);
}

export function clearLocalStorage() {
  return localStorage.clear();
}

export function setBookObject(fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`);
  if (!book) book = {};
  book[key] = value;

  setLocalStorage(`${fileName}-info`, book);
}

export function getBookObject(fileName, key) {
  let book = getLocalStorage(`${fileName}-info`);
  return book ? book[key] : null;
}

export function getFontFamily(fileName) {
  return getBookObject(fileName, "fontFamily");
}

export function saveFontFamily(fileName, font) {
  return setBookObject(fileName, "fontFamily", font);
}

export function getFontSize(fileName) {
  return getBookObject(fileName, "fontSize");
}

export function saveFontSize(fileName, fontSize) {
  setBookObject(fileName, "fontSize", fontSize);
}

export function getTheme(fileName) {
  return getBookObject(fileName, "theme");
}

export function saveTheme(fileName, theme) {
  setBookObject(fileName, "theme", theme);
}

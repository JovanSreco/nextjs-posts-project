export function nameValidate(value) {
  let clearSpaces = value.replace(/\s+/g, " ").trim();
  return /\w{3}/.test(clearSpaces);
}
export function emailValidate(mail) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}
export function messageValidate(value) {
  let clearSpaces = value.replace(/\s+/g, " ").trim();
  return /\w{1}/.test(clearSpaces);
}

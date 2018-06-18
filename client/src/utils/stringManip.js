export const removeHTML = text => {
  return text.replace(/<(?:.|\n)*?>/gm, '');
};

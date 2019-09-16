export const tagsValidity = (input, taglist) => {
  if (input.length < 1) return 'A tag must be more than a character';
  if (input.length > 30) return 'Tag must be less than 30 characters';
  if (/^[-._]$/gi.test(input)) return 'Tag must contain alphabets';
  if (/[-]{2,}|[.]{2,}|[_]{2,}/gi.test(input)
  || /\s{2,}/.test(input) || /[^a-z-._\s]/gi.test(input)) {
    return 'Only letters, a space between words, a dot, an underscore and a dash allowed';
  }
  if (taglist.includes(input)) return 'Tag already exists';
};

export const descriptionValidity = (input) => {
  if (input.length === 0) return false;
  if (input.length < 20) return 'Description must be more than 20 letters';
  if (input.length > 500) return 'Description must be less than 500 letters';
};

export const categoryValidity = (input) => {
  if (input.length < 1) return 'Category is Required';
};

export const titleValidity = (input) => {
  if (input.length < 3 && input.length > 0) return 'Title must be more than 2 letters';
  if (input.length > 250) return 'Title must be less than 250 letters';
};

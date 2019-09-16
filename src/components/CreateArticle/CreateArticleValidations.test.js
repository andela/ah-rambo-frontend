import {
  tagsValidity,
  descriptionValidity,
  categoryValidity,
  titleValidity
} from './CreateArticleValidations';
let error;
describe('Create Article Validations Test', () => {
  it('throws error when tag input is invalid', () => {
    error = tagsValidity('', 'taglist')
    expect(error).toEqual('A tag must be more than a character');

    error = tagsValidity('kjfgnjdfnkjnfdkjnfjdnoinfdoioidfnoi', 'taglist')
    expect(error).toEqual('Tag must be less than 30 characters');
    
    error = tagsValidity('-', 'taglist')
    expect(error).toEqual('Tag must contain alphabets');

    error = tagsValidity('dh------------', 'taglist')
    expect(error).toEqual('Only letters, a space between words, a dot, an underscore and a dash allowed');
    
    error = tagsValidity('  kjbkjnjnkjnk    ', 'taglist')
    expect(error).toEqual('Only letters, a space between words, a dot, an underscore and a dash allowed');
    
    error = tagsValidity('/////////', 'taglist')
    expect(error).toEqual('Only letters, a space between words, a dot, an underscore and a dash allowed');

    error = tagsValidity('tag', ['tag','list'])
    expect(error).toEqual('Tag already exists');

    error = tagsValidity('lists', ['tag','list'])
    expect(error).not.toEqual('Tag already exists');
  });

  it('throws error when description input is invalid', () => {
    error = descriptionValidity('')
    expect(error).toEqual(false);
    
    error = descriptionValidity('taglist')
    expect(error).toEqual('Description must be more than 20 letters');

    error = descriptionValidity(new Array(100).fill('abcde').join(''))
    expect(error).not.toEqual('Description must be less than 500 letters');

    error = descriptionValidity(new Array(100).fill('abcde').join(','))
    expect(error).toEqual('Description must be less than 500 letters');
  });

  it('throws error when category input is invalid', () => {
    error = categoryValidity('')
    expect(error).toEqual('Category is Required');

    error = categoryValidity('hjbjhb')
    expect(error).not.toEqual('Category is Required');
  });

  it('throws error when title input is invalid', () => {
    error = titleValidity('st')
    expect(error).toEqual('Title must be more than 2 letters');

    error = titleValidity(new Array(50).fill('abcd3e').join(''))
    expect(error).toEqual('Title must be less than 250 letters');

    error = titleValidity(new Array(50).fill('abcde').join(''))
    expect(error).not.toEqual('Title must be less than 250 letters');
  });
});


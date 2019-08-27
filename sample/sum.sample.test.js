const sum = require('./sum.sample');

describe('Sample Sum Function', () => {
  it('returns 4 when arguments are 1 and 3', () => {
    expect(sum(1, 3)).toEqual(4);
  });
});

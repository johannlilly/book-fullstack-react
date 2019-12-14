/* eslint-disable no-undef */
import Modash from './Modash';

describe('Modash', () => {
  it('`truncate()`: truncates a string', () => {
    const string = 'there was one catch, and that was CATCH-22';
    expect(
      Modash.truncate(string, 19)
    ).toEqual('there was one catch...');
  });
});

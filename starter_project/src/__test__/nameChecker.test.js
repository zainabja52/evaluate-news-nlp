// starter_project\src\__test__\nameChecker.test.js
import { checkForName } from '../client/js/nameChecker';

describe('Captain Name Checker', () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });

  test('alerts welcome for valid captain', () => {
    checkForName('Picard');
    expect(window.alert).toHaveBeenCalledWith('Welcome, Captain!');
  });

  test('alerts error for invalid captain', () => {
    checkForName('Riker');
    expect(window.alert).toHaveBeenCalledWith('Enter a valid captain name');
  });

  test('handles case sensitivity', () => {
    checkForName('picard');
    expect(window.alert).toHaveBeenCalledWith('Enter a valid captain name');
  });
});

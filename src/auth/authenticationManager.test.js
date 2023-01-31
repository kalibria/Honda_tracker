const { isTokenExpired } = require('./authenticationManager');

describe('testing isTokenExpired function', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('return true if current time is 5 minutes less than the decode token', () => {
    jest.setSystemTime(1675076100000); // 30.01.23 13:55
    const decodeToken = 1675076400; //30.01.23 14:00

    expect(isTokenExpired(decodeToken)).toBe(true);
  });

  test('return true if current time is 3 minutes less than the decode token', () => {
    jest.setSystemTime(1675076229000); // 30.01.23 13:57
    const decodeToken = 1675076400; //30.01.23 14:00

    expect(isTokenExpired(decodeToken)).toBe(true);
  });

  test('return false if current time is 10 minutes less than the decode token', () => {
    jest.setSystemTime(1675075800000); // 30.01.23 13:50
    const decodeToken = 1675076400; //30.01.23 14:00

    expect(isTokenExpired(decodeToken)).toBe(false);
  });

  test('return true if current time is 10 minutes more than the decode token', () => {
    jest.setSystemTime(1675077000000); // 30.01.23 14:10
    const decodeToken = 1675076400; //30.01.23 14:00

    expect(isTokenExpired(decodeToken)).toBe(true);
  });

  test('return true if current time is equal to the decode token', () => {
    jest.setSystemTime(1675076400000); // 30.01.23 14:00
    const decodeToken = 1675076400; //30.01.23 14:00

    expect(isTokenExpired(decodeToken)).toBe(true);
  });
});

import { validateTwoDimensionalArray, TWO_DIMENSIONAL_ARRAY_ERROR, expectEquality } from '../../src/common';

describe('When using the common function validateTwoDimensionalArray', () => {
    test('if an empty, one-dimensional array is passed, no error is thrown', () => {
        runErrorTest([], '');
    });
    test('if a two-dimensional array is passed, no error is thrown', () => {
        runErrorTest([[]], '');
    });
    test('if a non-empty, one-dimensional array is passed, no error is thrown', () => {
        runErrorTest(['testing', 1], TWO_DIMENSIONAL_ARRAY_ERROR);
    });
});

const runErrorTest = (testArray: any | any[] | any[][], expectedMessage: string): void => {
    let message = '';
    try {
        validateTwoDimensionalArray(testArray);
    } catch (error) {
        message = error.message;
    }
    expectEquality(message, expectedMessage);
};

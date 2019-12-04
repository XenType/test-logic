import { validateTwoDimensionalArray, TWO_DIMENSIONAL_ARRAY_ERROR, expectEquality } from '../../src/common';

describe('When using the common function validateTwoDimensionalArray', () => {
    test('if an empty, one-dimensional array is passed, no error is thrown and a modified array is returned', () => {
        const result = runErrorTest([], '');
        expectEquality(result, [[]]);
    });
    test('if a two-dimensional array is passed, no error is thrown and the original array is returned', () => {
        const result = runErrorTest([[]], '');
        expectEquality(result, [[]]);
    });
    test('if a non-empty, one-dimensional array is passed, no error is thrown and a modified array is returned', () => {
        const result = runErrorTest(['testing', 1], '');
        expectEquality(result, [['testing', 1]]);
    });
    test('if a non-empty array, with some elements being non-arrays is passed, the expected error is thrown', () => {
        runErrorTest([['test', 1], ['check', 2], 'ooops', ['final', 3]], TWO_DIMENSIONAL_ARRAY_ERROR);
    });
});

const runErrorTest = (testArray: any | any[] | any[][], expectedMessage: string): undefined | any[][] => {
    let message = '';
    let result = undefined;
    try {
        result = validateTwoDimensionalArray(testArray);
    } catch (error) {
        message = error.message;
    }
    expectEquality(message, expectedMessage);
    return result;
};

// TestFunctionResult constants
/* tslint:disable variable-name */
export const testArguments_NoError = [1, 'test'];
export const testArguments_WithError = [2, 'error'];
export const testArguments_ToEqual = [3, 'value'];
export const testArguments_ToStrictEqual = [4, 'strict'];
export const testErrorMessage = 'test message';
export const expectedToEqualResult = 'test result';
export const expectedNotToEqualResult = 'different result';
export const expectedToStrictEqualResult: { a: any; b: string } = { a: undefined, b: 'test' };
export const expectedNotToStrictEqualResult = { a: 1, b: 'test' };
export const expectedMustUseStrictEqualResult = { b: 'test' };
// TestFunctionUsage constants
export const testArguments_SingleCall = [1, 'once'];
export const testArguments_TripleCall = [3, 'thrice'];
export const expectedArguments_SingleCall = [[1, 'once', true]];
export const expectedArguments_WrongValues = [[1, 'eeek', true]];
export const expectedArguments_TooManyCalls = [
    [3, 'thrice', true],
    [3, 'thrice', true],
    [3, 'thrice', true],
    [3, 'eeek', true],
];

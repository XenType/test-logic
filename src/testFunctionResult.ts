import { expectEquality, TestFunctionBundle } from './common';

export class TestFunctionResult {
    public static runsWithoutErrorAsync = async (functionBundle: TestFunctionBundle): Promise<void> => {
        await TestFunctionResult.throwsErrorAsync(functionBundle, '');
        return;
    };
    public static runsWithoutError = (functionBundle: TestFunctionBundle): void => {
        TestFunctionResult.throwsError(functionBundle, '');
        return;
    };
    public static throwsErrorAsync = async (functionBundle: TestFunctionBundle, expectedErrorMessage: string): Promise<void> => {
        let message = '';
        try {
            await functionBundle.functionToTest(...functionBundle.args);
        } catch (err) {
            message = err.message;
        }
        expectEquality(message, expectedErrorMessage);
        return;
    };
    public static throwsError = (functionBundle: TestFunctionBundle, expectedErrorMessage: string): void => {
        let message = '';
        try {
            functionBundle.functionToTest(...functionBundle.args);
        } catch (err) {
            message = err.message;
        }
        expectEquality(message, expectedErrorMessage);
        return;
    };
    public static returnsExpectedAsync = async (functionBundle: TestFunctionBundle, expectedResult: any, useStrictEqual?: boolean): Promise<void> => {
        const result = await functionBundle.functionToTest(...functionBundle.args);
        expectEquality(result, expectedResult, useStrictEqual);
        return;
    };
    public static returnsExpected = (functionBundle: TestFunctionBundle, expectedResult: any, useStrictEqual: boolean = false): void => {
        const result = functionBundle.functionToTest(...functionBundle.args);
        expectEquality(result, expectedResult, useStrictEqual);
        return;
    };
}

import { expectEquality, TestClassMethodBundle } from './common';

export class TestClassMethodResult {
    public static runsWithoutErrorAsync = async (classBundle: TestClassMethodBundle): Promise<void> => {
        let message = '';
        try {
            await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch (error) {
            message = error.message;
        }
        expectEquality(message, '');
        return;
    };
    public static runsWithoutError = (classBundle: TestClassMethodBundle): void => {
        let message = '';
        try {
            classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch (error) {
            message = error.message;
        }
        expectEquality(message, '');
        return;
    };
    public static throwsErrorAsync = async (classBundle: TestClassMethodBundle, expectedErrorMessage: string): Promise<void> => {
        let message = '';
        try {
            await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch (error) {
            message = error.message;
        }
        expectEquality(message, expectedErrorMessage);
        return;
    };
    public static throwsError = (classBundle: TestClassMethodBundle, expectedErrorMessage: string): void => {
        let message = '';
        try {
            classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch (error) {
            message = error.message;
        }
        expectEquality(message, expectedErrorMessage);
        return;
    };
    public static returnsExpectedAsync = async (classBundle: TestClassMethodBundle, expectedResult: any, useStrictEqual?: boolean): Promise<void> => {
        const result = await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        expectEquality(result, expectedResult, useStrictEqual);
        return;
    };
    public static returnsExpected = (classBundle: TestClassMethodBundle, expectedResult: any, useStrictEqual?: boolean): void => {
        const result = classBundle.classToTest[classBundle.methodName](...classBundle.args);
        expectEquality(result, expectedResult, useStrictEqual);
        return;
    };
}

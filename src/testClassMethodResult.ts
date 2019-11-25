import { expectEquality, ITestClassMethodBundle } from './common';

export class TestClassMethodResult {
    public static runsWithoutErrorAsync = async (classBundle: ITestClassMethodBundle): Promise<void> => {
        let message = '';
        try {
            await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch (error) {
            message = error.message;
        }
        expectEquality(message, '');
        return;
    };
    public static runsWithoutError = (classBundle: ITestClassMethodBundle): void => {
        let message = '';
        try {
            classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch (error) {
            message = error.message;
        }
        expectEquality(message, '');
        return;
    };
    public static throwsErrorAsync = async (classBundle: ITestClassMethodBundle, expectedErrorMessage: string): Promise<void> => {
        let message = '';
        try {
            await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch (error) {
            message = error.message;
        }
        expectEquality(message, expectedErrorMessage);
        return;
    };
    public static throwsError = (classBundle: ITestClassMethodBundle, expectedErrorMessage: string): void => {
        let message = '';
        try {
            classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch (error) {
            message = error.message;
        }
        expectEquality(message, expectedErrorMessage);
        return;
    };
    public static returnsExpectedAsync = async (
        classBundle: ITestClassMethodBundle,
        expectedResult: any,
        useStrictEqual?: boolean,
    ): Promise<void> => {
        const result = await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        expectEquality(result, expectedResult, useStrictEqual);
        return;
    };
    public static returnsExpected = (classBundle: ITestClassMethodBundle, expectedResult: any, useStrictEqual?: boolean): void => {
        const result = classBundle.classToTest[classBundle.methodName](...classBundle.args);
        expectEquality(result, expectedResult, useStrictEqual);
        return;
    };
}

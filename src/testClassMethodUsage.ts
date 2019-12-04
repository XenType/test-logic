import { ICalledClassMethodBundle, ICalledFunctionBundle, ITestClassMethodBundle, validateTwoDimensionalArray } from './common';

export class TestClassMethodUsage {
    public static callsFunctionTimesAsync = async (classBundle: ITestClassMethodBundle, calledBundle: ICalledFunctionBundle): Promise<void> => {
        try {
            await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        expect(calledBundle.calledFunction).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsFunctionTimes = (classBundle: ITestClassMethodBundle, calledBundle: ICalledFunctionBundle): void => {
        try {
            classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        expect(calledBundle.calledFunction).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsFunctionWithArgumentsAsync = async (
        classBundle: ITestClassMethodBundle,
        calledBundle: ICalledFunctionBundle,
    ): Promise<void> => {
        let expectedArgs;
        if (calledBundle.expectedArgs) {
            expectedArgs = validateTwoDimensionalArray(calledBundle.expectedArgs);
        }
        try {
            await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        for (const argSet of expectedArgs || []) {
            expect(calledBundle.calledFunction).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
    public static callsFunctionWithArguments = (classBundle: ITestClassMethodBundle, calledBundle: ICalledFunctionBundle): void => {
        let expectedArgs;
        if (calledBundle.expectedArgs) {
            expectedArgs = validateTwoDimensionalArray(calledBundle.expectedArgs);
        }
        try {
            classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        for (const argSet of expectedArgs || []) {
            expect(calledBundle.calledFunction).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
    public static callsClassMethodTimesAsync = async (classBundle: ITestClassMethodBundle, calledBundle: ICalledClassMethodBundle): Promise<void> => {
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        expect(methodSpy).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsClassMethodTimes = (classBundle: ITestClassMethodBundle, calledBundle: ICalledClassMethodBundle): void => {
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        expect(methodSpy).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsClassMethodWithArgumentsAsync = async (
        classBundle: ITestClassMethodBundle,
        calledBundle: ICalledClassMethodBundle,
    ): Promise<void> => {
        let expectedArgs;
        if (calledBundle.expectedArgs) {
            expectedArgs = validateTwoDimensionalArray(calledBundle.expectedArgs);
        }
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        for (const argSet of expectedArgs || []) {
            expect(methodSpy).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
    public static callsClassMethodWithArguments = (classBundle: ITestClassMethodBundle, calledBundle: ICalledClassMethodBundle): void => {
        let expectedArgs;
        if (calledBundle.expectedArgs) {
            expectedArgs = validateTwoDimensionalArray(calledBundle.expectedArgs);
        }
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        for (const argSet of expectedArgs || []) {
            expect(methodSpy).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
}

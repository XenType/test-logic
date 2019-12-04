import { ICalledClassMethodBundle, ICalledFunctionBundle, ITestFunctionBundle, validateTwoDimensionalArray } from './common';

export class TestFunctionUsage {
    public static callsFunctionTimesAsync = async (functionBundle: ITestFunctionBundle, calledBundle: ICalledFunctionBundle): Promise<void> => {
        try {
            await functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        expect(calledBundle.calledFunction).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsFunctionWithArgumentsAsync = async (
        functionBundle: ITestFunctionBundle,
        calledBundle: ICalledFunctionBundle,
    ): Promise<void> => {
        let expectedArgs;
        if (calledBundle.expectedArgs) {
            expectedArgs = validateTwoDimensionalArray(calledBundle.expectedArgs);
        }
        try {
            await functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        for (const argSet of expectedArgs || []) {
            expect(calledBundle.calledFunction).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
    public static callsFunctionTimes = (functionBundle: ITestFunctionBundle, calledBundle: ICalledFunctionBundle): void => {
        try {
            functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        expect(calledBundle.calledFunction).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsFunctionWithArguments = (functionBundle: ITestFunctionBundle, calledBundle: ICalledFunctionBundle): void => {
        let expectedArgs;
        if (calledBundle.expectedArgs) {
            expectedArgs = validateTwoDimensionalArray(calledBundle.expectedArgs);
        }
        try {
            functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        for (const argSet of expectedArgs || []) {
            expect(calledBundle.calledFunction).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
    public static callsClassMethodTimesAsync = async (functionBundle: ITestFunctionBundle, calledBundle: ICalledClassMethodBundle): Promise<void> => {
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            await functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        expect(methodSpy).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsClassMethodWithArgumentsAsync = async (
        functionBundle: ITestFunctionBundle,
        calledBundle: ICalledClassMethodBundle,
    ): Promise<void> => {
        let expectedArgs;
        if (calledBundle.expectedArgs) {
            expectedArgs = validateTwoDimensionalArray(calledBundle.expectedArgs);
        }
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            await functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        for (const argSet of expectedArgs || []) {
            expect(methodSpy).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
    public static callsClassMethodTimes = (functionBundle: ITestFunctionBundle, calledBundle: ICalledClassMethodBundle): void => {
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        expect(methodSpy).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsClassMethodWithArguments = (functionBundle: ITestFunctionBundle, calledBundle: ICalledClassMethodBundle): void => {
        let expectedArgs;
        if (calledBundle.expectedArgs) {
            expectedArgs = validateTwoDimensionalArray(calledBundle.expectedArgs);
        }
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        for (const argSet of expectedArgs || []) {
            expect(methodSpy).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
}

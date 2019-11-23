import { CalledClassMethodBundle, CalledFunctionBundle, TestFunctionBundle } from './types';

export class TestFunctionUsage {
    public static callsFunctionTimesAsync = async (functionBundle: TestFunctionBundle, calledBundle: CalledFunctionBundle): Promise<void> => {
        try {
            await functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        expect(calledBundle.calledFunction).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsFunctionWithArgumentsAsync = async (functionBundle: TestFunctionBundle, calledBundle: CalledFunctionBundle): Promise<void> => {
        try {
            await functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        for (const argSet of calledBundle.expectedArgs || []) {
            expect(calledBundle.calledFunction).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
    public static callsFunctionTimes = (functionBundle: TestFunctionBundle, calledBundle: CalledFunctionBundle): void => {
        try {
            functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        expect(calledBundle.calledFunction).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsFunctionWithArguments = (functionBundle: TestFunctionBundle, calledBundle: CalledFunctionBundle): void => {
        try {
            functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        for (const argSet of calledBundle.expectedArgs || []) {
            expect(calledBundle.calledFunction).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
    public static callsClassMethodTimesAsync = async (functionBundle: TestFunctionBundle, calledBundle: CalledClassMethodBundle): Promise<void> => {
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            await functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        expect(methodSpy).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsClassMethodWithArgumentsAsync = async (
        functionBundle: TestFunctionBundle,
        calledBundle: CalledClassMethodBundle,
    ): Promise<void> => {
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            await functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        for (const argSet of calledBundle.expectedArgs || []) {
            expect(methodSpy).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
    public static callsClassMethodTimes = (functionBundle: TestFunctionBundle, calledBundle: CalledClassMethodBundle): void => {
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        expect(methodSpy).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsClassMethodWithArguments = (functionBundle: TestFunctionBundle, calledBundle: CalledClassMethodBundle): void => {
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            functionBundle.functionToTest(...functionBundle.args);
        } catch {}
        for (const argSet of calledBundle.expectedArgs || []) {
            expect(methodSpy).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
}

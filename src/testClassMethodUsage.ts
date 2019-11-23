import { TestClassMethodBundle, CalledFunctionBundle, CalledClassMethodBundle } from './types';

export class TestClassMethodUsage {
    public static callsFunctionTimesAsync = async (classBundle: TestClassMethodBundle, calledBundle: CalledFunctionBundle): Promise<void> => {
        try {
            await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        expect(calledBundle.calledFunction).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsFunctionTimes = (classBundle: TestClassMethodBundle, calledBundle: CalledFunctionBundle): void => {
        try {
            classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        expect(calledBundle.calledFunction).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsFunctionWithArgumentsAsync = async (classBundle: TestClassMethodBundle, calledBundle: CalledFunctionBundle): Promise<void> => {
        try {
            await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        for (let argSet of calledBundle.expectedArgs || []) {
            expect(calledBundle.calledFunction).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
    public static callsFunctionWithArguments = (classBundle: TestClassMethodBundle, calledBundle: CalledFunctionBundle): void => {
        try {
            classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        for (let argSet of calledBundle.expectedArgs || []) {
            expect(calledBundle.calledFunction).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
    public static callsClassMethodTimesAsync = async (classBundle: TestClassMethodBundle, calledBundle: CalledClassMethodBundle): Promise<void> => {
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        expect(methodSpy).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsClassMethodTimes = (classBundle: TestClassMethodBundle, calledBundle: CalledClassMethodBundle): void => {
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        expect(methodSpy).toHaveBeenCalledTimes(calledBundle.times || 0);
        return;
    };
    public static callsClassMethodWithArgumentsAsync = async (
        classBundle: TestClassMethodBundle,
        calledBundle: CalledClassMethodBundle,
    ): Promise<void> => {
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            await classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        for (let argSet of calledBundle.expectedArgs || []) {
            expect(methodSpy).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
    public static callsClassMethodWithArguments = (classBundle: TestClassMethodBundle, calledBundle: CalledClassMethodBundle): void => {
        const methodSpy = jest.spyOn(calledBundle.calledClass, calledBundle.calledMethodName);
        try {
            classBundle.classToTest[classBundle.methodName](...classBundle.args);
        } catch {}
        for (let argSet of calledBundle.expectedArgs || []) {
            expect(methodSpy).toHaveBeenCalledWith(...argSet);
        }
        return;
    };
}

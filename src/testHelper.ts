import { TestFunctionBundle, TestClassMethodBundle, CalledFunctionBundle, CalledClassMethodBundle } from './types';

export class TestHelper {
    public static convertArgumentsToArray = (...args: any[]): any[] => {
        return args;
    };
    public static BundleTestFunction = (functionToTest: Function, args: any[]): TestFunctionBundle => {
        return { functionToTest, args };
    };
    public static BundleTestClassMethod = (classToTest: any, methodName: string, args: any[]): TestClassMethodBundle => {
        return { classToTest, methodName, args };
    };
    public static BundleCalledFunction = (calledFunction: Function, times?: number, expectedArgs?: any[][]): CalledFunctionBundle => {
        return { calledFunction, times, expectedArgs };
    };
    public static BundleCalledClassMethod = (
        calledClass: any,
        calledMethodName: string,
        times?: number,
        expectedArgs?: any[][],
    ): CalledClassMethodBundle => {
        return { calledClass, calledMethodName, times, expectedArgs };
    };
}

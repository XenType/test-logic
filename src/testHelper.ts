import { CalledClassMethodBundle, CalledFunctionBundle, TestClassMethodBundle, TestFunction, TestFunctionBundle } from './common';

export class TestHelper {
    public static convertArgumentsToArray = (...args: any[]): any[] => {
        return args;
    };
    public static bundleTestFunction = (functionToTest: TestFunction, args: any[]): TestFunctionBundle => {
        return { functionToTest, args };
    };
    public static bundleTestClassMethod = (classToTest: any, methodName: string, args: any[]): TestClassMethodBundle => {
        return { classToTest, methodName, args };
    };
    public static bundleCalledFunction = (calledFunction: TestFunction, timesOrArguments?: number | any[][]): CalledFunctionBundle => {
        const { times, expectedArgs } = determineTimesAndArguments(timesOrArguments);
        return { calledFunction, times, expectedArgs };
    };
    public static bundleCalledClassMethod = (calledClass: any, methodName: string, timesOrArguments?: number | any[][]): CalledClassMethodBundle => {
        const { times, expectedArgs } = determineTimesAndArguments(timesOrArguments);
        return { calledClass, calledMethodName: methodName, times, expectedArgs };
    };
}

interface ITimesAndArguments {
    times: number;
    expectedArgs: any[][];
}
const determineTimesAndArguments = (timesOrArguments?: number | any[][]): ITimesAndArguments => {
    let times = 0;
    let expectedArgs: any[][] = [];
    if (timesOrArguments) {
        if (typeof timesOrArguments === 'number') {
            times = timesOrArguments as number;
            for (let i = 0; i < times; i++) {
                expectedArgs.push([]);
            }
        } else {
            expectedArgs = timesOrArguments;
            times = expectedArgs.length;
        }
    }
    return { times, expectedArgs };
};

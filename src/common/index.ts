export const expectEquality = (result: any, expectedResult: any, useStrictEqual: boolean = false): void => {
    if (useStrictEqual) {
        expect(result).toStrictEqual(expectedResult);
    } else {
        expect(result).toEqual(expectedResult);
    }
    return;
};

export type TestSyncFunction = (...args: any[]) => any;
export type TestAsyncFunction = (...args: any[]) => Promise<any>;
export type TestFunction = TestSyncFunction | TestAsyncFunction;
export interface ITestFunctionBundle {
    functionToTest: TestFunction;
    args: any[];
}
export interface ITestClassMethodBundle {
    classToTest: any;
    methodName: string;
    args: any[];
}
export interface ICalledFunctionBundle {
    calledFunction: TestFunction;
    times?: number;
    expectedArgs?: any[][];
}
export interface ICalledClassMethodBundle {
    calledClass: any;
    calledMethodName: string;
    times?: number;
    expectedArgs?: any[][];
}

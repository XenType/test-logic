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
export type TestFunctionBundle = {
    functionToTest: TestFunction;
    args: any[];
};
export type TestClassMethodBundle = {
    classToTest: any;
    methodName: string;
    args: any[];
};
export type CalledFunctionBundle = {
    calledFunction: TestFunction;
    times?: number;
    expectedArgs?: any[][];
};
export type CalledClassMethodBundle = {
    calledClass: any;
    calledMethodName: string;
    times?: number;
    expectedArgs?: any[][];
};

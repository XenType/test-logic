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
export interface TestFunctionBundle {
    functionToTest: TestFunction;
    args: any[];
}
export interface TestClassMethodBundle {
    classToTest: any;
    methodName: string;
    args: any[];
}
export interface CalledFunctionBundle {
    calledFunction: TestFunction;
    times?: number;
    expectedArgs?: any[][];
}
export interface CalledClassMethodBundle {
    calledClass: any;
    calledMethodName: string;
    times?: number;
    expectedArgs?: any[][];
}

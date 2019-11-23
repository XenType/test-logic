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

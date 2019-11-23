export type TestFunctionBundle = {
    functionToTest: Function;
    args: any[];
};
export type TestClassMethodBundle = {
    classToTest: any;
    methodName: string;
    args: any[];
};
export type CalledFunctionBundle = {
    calledFunction: Function;
    times?: number;
    expectedArgs?: any[][];
};
export type CalledClassMethodBundle = {
    calledClass: any;
    calledMethodName: string;
    times?: number;
    expectedArgs?: any[][];
};

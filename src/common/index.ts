export const expectEquality = (result: any, expectedResult: any, useStrictEqual: boolean = false): void => {
    if (useStrictEqual) {
        expect(result).toStrictEqual(expectedResult);
    } else {
        expect(result).toEqual(expectedResult);
    }
    return;
};

export const TWO_DIMENSIONAL_ARRAY_ERROR = `Called Bundle Error: Argument array is not valid
Valid argument array examples:
    * An empty, one-dimensional array - use when no calls should be made to a function or class method
        * example: []
    * A two-dimensional array - the first dimension represents the number of calls, the second represents the arguments of each call
        * one call with two arguments: [[arg1, arg2]]
        * three calls with two arguments each: [[arg1, arg2], [arg3, arg4], [arg5, arg6]]`;

export const validateTwoDimensionalArray = (testArray: any | any[] | any[][]): any[][] | never => {
    if (Array.isArray(testArray)) {
        let nonArrayFound = false;
        let arrayFound = false;
        for (const item of testArray) {
            if (Array.isArray(item)) {
                arrayFound = true;
            } else {
                nonArrayFound = true;
            }
        }
        if (!arrayFound) {
            return [testArray];
        }
        if (!nonArrayFound) {
            return testArray;
        }
    }
    throw new Error(TWO_DIMENSIONAL_ARRAY_ERROR);
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

import { testErrorMessage, testArguments_ToEqual, expectedToEqualResult, testArguments_ToStrictEqual, expectedToStrictEqualResult } from './constants';
import { calledFunction } from './functions';
import {} from './sim_module';
export class TestClass {
    public static async testMethodAsync(a: number, b: string, c: boolean): Promise<any> {
        for (let i = 0; i < a; i++) {
            calledFunction(a, b, true);
        }
        if (a === testArguments_ToEqual[0]) {
            return expectedToEqualResult;
        }
        if (a === testArguments_ToStrictEqual[0]) {
            return expectedToStrictEqualResult;
        }
        return;
    }
    public static testMethod(a: number, b: string, c: boolean): any {
        for (let i = 0; i < a; i++) {
            calledFunction(a, b, true);
        }
        if (a === testArguments_ToEqual[0]) {
            return expectedToEqualResult;
        }
        if (a === testArguments_ToStrictEqual[0]) {
            return expectedToStrictEqualResult;
        }
        return;
    }
}

export class ErrorTestClass {
    public static async testMethodAsync(a: number, b: string, c: boolean): Promise<void> {
        throw new Error(testErrorMessage);
    }
    public static testMethod(a: number, b: string, c: boolean): void {
        throw new Error(testErrorMessage);
    }
}

export class PrimaryTestClass {
    public static async testMethodAsync(a: number, b: string): Promise<void> {
        for (let i = 0; i < a; i++) {
            SecondaryTestClass.secondaryMethod(a, b, true);
        }
        return;
    }
    public static testMethod(a: number, b: string): void {
        for (let i = 0; i < a; i++) {
            SecondaryTestClass.secondaryMethod(a, b, true);
        }
        return;
    }
}
export class SecondaryTestClass {
    public static secondaryMethod(a: number, b: string, c: boolean): void {
        return;
    }
}

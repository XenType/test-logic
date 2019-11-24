import TestLogic from '../src';
//import { myFunction } from '.';
//import { CalledClass } from 'called-class';
const myFunction = (a: number, b: boolean) => {
    if (a !== 1) {
        return 'processing';
    }
    if (b) {
        return 'complete';
    }
    return 'idle';
};
const calledFunction = () => {
    return;
};
class MyClass {
    constructor() {
        //
    }
    public myMethod = (a: number, b: string, c: string) => {
        if (a > 0 && a < 10) {
            CalledClass.calledMethod(1, b);
            return;
        } else if (a >= 10) {
            CalledClass.calledMethod(1, b);
            CalledClass.calledMethod(2, c);
        }
        return;
    };
}
class CalledClass {
    public static calledMethod = (a: number, b: string) => {
        return;
    };
}

const myClass = new MyClass();
// used to call your class method in different ways
const zeroTimesArgs = TestLogic.TestHelper.convertArgumentsToArray(0, 'start', 'finish');
const oneTimeArgs = TestLogic.TestHelper.convertArgumentsToArray(4, 'start', 'finish');
const twoTimesArgs = TestLogic.TestHelper.convertArgumentsToArray(20, 'start', 'finish');
// variations in calls made to the dependency
const expectedFirstArg = TestLogic.TestHelper.convertArgumentsToArray(1, 'start');
const expectedSecondArg = TestLogic.TestHelper.convertArgumentsToArray(2, 'finish');
// expected calls to dependency in different tests
const expectedOneTimeArgs = TestLogic.TestHelper.convertArgumentsToArray(expectedFirstArg);
const expectedTwoTimesArgs = TestLogic.TestHelper.convertArgumentsToArray(expectedFirstArg, expectedSecondArg);

describe('When using an instance of MyClass', () => {
    describe('and passing arguments that should not result in a call to CalledClass.calledMethod', () => {
        const testBundle = TestLogic.TestHelper.bundleTestClassMethod(myClass, 'myMethod', zeroTimesArgs);
        const calledBundle = TestLogic.TestHelper.bundleCalledClassMethod(CalledClass, 'calledMethod');
        test('it is called 0 times', () => {
            TestLogic.TestClassMethodUsage.callsClassMethodTimes(testBundle, calledBundle);
        });
    });
    describe('and passing arguments that should result in a call to CalledClass.calledMethod one time', () => {
        // bundle the class with arguments that should result in a single call
        const testBundle = TestLogic.TestHelper.bundleTestClassMethod(myClass, 'myMethod', oneTimeArgs);
        // bundle the expected usage paramters for a single call
        const calledBundle = TestLogic.TestHelper.bundleCalledClassMethod(CalledClass, 'calledMethod', expectedOneTimeArgs);
        test('it is called 1 time', () => {
            TestLogic.TestClassMethodUsage.callsClassMethodTimes(testBundle, calledBundle);
        });
        test('with expected arguments', () => {
            TestLogic.TestClassMethodUsage.callsClassMethodWithArguments(testBundle, calledBundle);
        });
    });
    describe('and passing arguments that should result in a call to CalledClass.calledMethod two times', () => {
        // bundle the class with arguments that should result in two calls
        const testBundle = TestLogic.TestHelper.bundleTestClassMethod(myClass, 'myMethod', twoTimesArgs);
        // bundle the expected usage paramters for two calls
        const calledBundle = TestLogic.TestHelper.bundleCalledClassMethod(CalledClass, 'calledMethod', expectedTwoTimesArgs);
        test('it is called 2 times', () => {
            TestLogic.TestClassMethodUsage.callsClassMethodTimes(testBundle, calledBundle);
        });
        test('with expected arguments each time', () => {
            TestLogic.TestClassMethodUsage.callsClassMethodWithArguments(testBundle, calledBundle);
        });
    });
});

// const firstArgument = 1;
// const secondArgument = 'test';
// const thirdArgument = false;

//const argArray = TestLogic.TestHelper.convertArgumentsToArray(firstArgument, secondArgument, thirdArgument);

// const argArray = TestLogic.TestHelper.convertArgumentsToArray(123, 'test');
// const functionBundle = TestLogic.TestHelper.bundleTestFunction(myFunction, argArray);

// const myClassInstance = new MyClass();
// const argArray = TestLogic.TestHelper.convertArgumentsToArray(123, 'test');
// const classBundle = TestLogic.TestHelper.bundleTestClassMethod(myClassInstance, 'myMethod', argArray);

// const expectedFirstArgArray = TestLogic.TestHelper.convertArgumentsToArray(123, 'test');
// const expectedSecondArgArray = TestLogic.TestHelper.convertArgumentsToArray(432, 'complete');
// const calledWithArray = TestLogic.TestHelper.convertArgumentsToArray(expectedFirstArgArray, expectedSecondArgArray);
// const calledBundle = TestLogic.TestHelper.bundleCalledClassMethod(CalledClass, 'calledMethod', calledWithArray);

// const expectedArgArray = TestLogic.TestHelper.convertArgumentsToArray(123, 'test');
// const calledWithArray = TestLogic.TestHelper.convertArgumentsToArray(expectedArgArray);
// const calledBundle = TestLogic.TestHelper.bundleCalledFunction(myFunction, calledWithArray);

const completeArgs = TestLogic.TestHelper.convertArgumentsToArray(1, true);
const idleArgs = TestLogic.TestHelper.convertArgumentsToArray(1, false);
const processingArgs = TestLogic.TestHelper.convertArgumentsToArray(20, true);
const completeResult = 'complete';
const idleResult = 'idle';
const processingResult = 'processing';
describe('When using myFunction', () => {
    test('and passing completeArgs, it returns complete', () => {
        const testBundle = TestLogic.TestHelper.bundleTestFunction(myFunction, completeArgs);
        TestLogic.TestFunctionResult.returnsExpected(testBundle, completeResult);
    });
    test('and passing idleArgs, it returns idle', () => {
        const testBundle = TestLogic.TestHelper.bundleTestFunction(myFunction, idleArgs);
        TestLogic.TestFunctionResult.returnsExpected(testBundle, idleResult);
    });
    test('and passing processingArgs, it returns processing', () => {
        const testBundle = TestLogic.TestHelper.bundleTestFunction(myFunction, processingArgs);
        TestLogic.TestFunctionResult.returnsExpected(testBundle, processingResult);
    });
});

describe('...', () => {
    test('...', () => {
        expect(1).toEqual(1);
    });
});

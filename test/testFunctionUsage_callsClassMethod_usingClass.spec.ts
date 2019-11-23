import { TestFunctionUsage } from '../src/testFunctionUsage';
import { testFunctionAsync, testFunction, calledFunction } from './fixtures/functions';
import {
    expectedArguments_SingleCall,
    testArguments_SingleCall,
    testArguments_TripleCall,
    expectedArguments_TooManyCalls,
    expectedArguments_WrongValues
} from './fixtures/constants';
import { TestClass } from './fixtures/classes';
import { TestHelper } from '../src/testHelper';
jest.mock('./fixtures/functions', () => ({
    testFunctionAsync: jest.fn(
        async (a: number, b: string): Promise<any> => {
            for (let i = 0; i < a; i++) {
                await TestClass.testMethodAsync(a, b, true);
            }
            return;
        }
    ),
    testFunction: jest.fn((a: number, b: string): any => {
        for (let i = 0; i < a; i++) {
            TestClass.testMethod(a, b, true);
        }
        return;
    }),
    calledFunction: jest.fn((a: number, b: string, c: boolean): any => {
        return;
    })
}));

describe('When using TestFunctionUsage helper class', () => {
    const asyncSingleCallBundle = TestHelper.BundleTestFunction(testFunctionAsync, testArguments_SingleCall);
    const asyncTripleCallBundle = TestHelper.BundleTestFunction(testFunctionAsync, testArguments_TripleCall);
    const singleCallBundle = TestHelper.BundleTestFunction(testFunction, testArguments_SingleCall);
    const tripleCallBundle = TestHelper.BundleTestFunction(testFunction, testArguments_TripleCall);
    const asyncSingleCalledBundle = TestHelper.BundleCalledClassMethod(
        TestClass,
        'testMethodAsync',
        testArguments_SingleCall[0] as number,
        expectedArguments_SingleCall
    );
    const asyncWrongValuesCalledBundle = TestHelper.BundleCalledClassMethod(
        TestClass,
        'testMethodAsync',
        testArguments_SingleCall[0] as number,
        expectedArguments_WrongValues
    );
    const asyncTooManyCalledBundle = TestHelper.BundleCalledClassMethod(
        TestClass,
        'testMethodAsync',
        testArguments_SingleCall[0] as number,
        expectedArguments_TooManyCalls
    );
    const singleCalledBundle = TestHelper.BundleCalledClassMethod(TestClass, 'testMethod', testArguments_SingleCall[0] as number, expectedArguments_SingleCall);
    const wrongValuesCalledBundle = TestHelper.BundleCalledClassMethod(TestClass, 'testMethod', testArguments_SingleCall[0] as number, expectedArguments_WrongValues);
    const tooManyCalledBundle = TestHelper.BundleCalledClassMethod(TestClass, 'testMethod', testArguments_SingleCall[0] as number, expectedArguments_TooManyCalls);
    describe('and calling callsClassMethodTimesAsync', () => {
        describe('it calls the test function', () => {
            test('one time', async () => {
                await TestFunctionUsage.callsClassMethodTimesAsync(asyncSingleCallBundle, asyncSingleCalledBundle);
                expect(testFunctionAsync).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                await TestFunctionUsage.callsClassMethodTimesAsync(asyncSingleCallBundle, asyncSingleCalledBundle);
                expect(testFunctionAsync).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionUsage.callsClassMethodTimesAsync(asyncSingleCallBundle, asyncSingleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called a number of times different than the specified value, an assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionUsage.callsClassMethodTimesAsync(asyncTripleCallBundle, asyncSingleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling callsClassMethodWithArgumentsAsync', () => {
        describe('it calls the test function', () => {
            test('one time', async () => {
                await TestFunctionUsage.callsClassMethodWithArgumentsAsync(asyncSingleCallBundle, asyncSingleCalledBundle);
                expect(testFunctionAsync).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                await TestFunctionUsage.callsClassMethodWithArgumentsAsync(asyncSingleCallBundle, asyncSingleCalledBundle);
                expect(testFunctionAsync).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionUsage.callsClassMethodWithArgumentsAsync(asyncSingleCallBundle, asyncSingleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called different arguments than those specified, an assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionUsage.callsClassMethodWithArgumentsAsync(asyncTripleCallBundle, asyncWrongValuesCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
        test('when the calledFunction is called a number of times different than those specified, an assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionUsage.callsClassMethodWithArgumentsAsync(asyncTripleCallBundle, asyncTooManyCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling callsClassMethodTimes', () => {
        describe('it calls the test function', () => {
            test('one time', () => {
                TestFunctionUsage.callsClassMethodTimes(singleCallBundle, singleCalledBundle);
                expect(testFunction).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                TestFunctionUsage.callsClassMethodTimes(singleCallBundle, singleCalledBundle);
                expect(testFunction).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', () => {
            let message = '';
            try {
                TestFunctionUsage.callsClassMethodTimes(singleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called a number of times different than the specified value, an assertion is raised', () => {
            let message = '';
            try {
                TestFunctionUsage.callsClassMethodTimes(tripleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling callsClassMethodWithArguments', () => {
        describe('it calls the test function', () => {
            test('one time', () => {
                TestFunctionUsage.callsClassMethodWithArguments(singleCallBundle, singleCalledBundle);
                expect(testFunction).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                TestFunctionUsage.callsClassMethodWithArguments(singleCallBundle, singleCalledBundle);
                expect(testFunction).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', () => {
            let message = '';
            try {
                TestFunctionUsage.callsClassMethodWithArguments(singleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called different arguments than those specified, an assertion is raised', () => {
            let message = '';
            try {
                TestFunctionUsage.callsClassMethodWithArguments(tripleCallBundle, wrongValuesCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
        test('when the calledFunction is called a number of times different than those specified, an assertion is raised', () => {
            let message = '';
            try {
                TestFunctionUsage.callsClassMethodWithArguments(tripleCallBundle, tooManyCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
});

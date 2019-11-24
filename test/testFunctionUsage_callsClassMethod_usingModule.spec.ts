import { TestFunctionUsage } from '../src/testFunctionUsage';
import { testFunctionAsync, testFunction, calledFunction } from './fixtures/functions';
import {
    expectedArguments_SingleCall,
    testArguments_SingleCall,
    testArguments_TripleCall,
    expectedArguments_TooManyCalls,
    expectedArguments_WrongValues,
} from './fixtures/constants';
import * as TestModule from './fixtures/sim_module';
import { TestHelper } from '../src/testHelper';
jest.mock('./fixtures/functions', () => ({
    testFunctionAsync: jest.fn(
        async (a: number, b: string): Promise<any> => {
            for (let i = 0; i < a; i++) {
                await TestModule.testFunctionAsMethodAsync(a, b, true);
            }
            return;
        },
    ),
    testFunction: jest.fn((a: number, b: string): any => {
        for (let i = 0; i < a; i++) {
            TestModule.testFunctionAsMethod(a, b, true);
        }
        return;
    }),
}));

describe('When using TestFunctionUsage helper class', () => {
    const asyncSingleCallBundle = TestHelper.bundleTestFunction(testFunctionAsync, testArguments_SingleCall);
    const asyncTripleCallBundle = TestHelper.bundleTestFunction(testFunctionAsync, testArguments_TripleCall);
    const singleCallBundle = TestHelper.bundleTestFunction(testFunction, testArguments_SingleCall);
    const tripleCallBundle = TestHelper.bundleTestFunction(testFunction, testArguments_TripleCall);
    const asyncSingleCalledBundle = TestHelper.bundleCalledClassMethod(TestModule, 'testFunctionAsMethodAsync', expectedArguments_SingleCall);
    const asyncWrongValuesCalledBundle = TestHelper.bundleCalledClassMethod(TestModule, 'testFunctionAsMethodAsync', expectedArguments_WrongValues);
    const asyncTooManyCalledBundle = TestHelper.bundleCalledClassMethod(TestModule, 'testFunctionAsMethodAsync', expectedArguments_TooManyCalls);
    const singleCalledBundle = TestHelper.bundleCalledClassMethod(TestModule, 'testFunctionAsMethod', expectedArguments_SingleCall);
    const wrongValuesCalledBundle = TestHelper.bundleCalledClassMethod(TestModule, 'testFunctionAsMethod', expectedArguments_WrongValues);
    const tooManyCalledBundle = TestHelper.bundleCalledClassMethod(TestModule, 'testFunctionAsMethod', expectedArguments_TooManyCalls);
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

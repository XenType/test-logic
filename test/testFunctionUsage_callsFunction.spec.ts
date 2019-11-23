import { TestFunctionUsage } from '../src/testFunctionUsage';
import { testFunctionAsync, testFunction, calledFunction } from './fixtures/functions';
import {
    expectedArguments_SingleCall,
    testArguments_SingleCall,
    testArguments_TripleCall,
    expectedArguments_TooManyCalls,
    expectedArguments_WrongValues
} from './fixtures/constants';
import { TestHelper } from '../src/testHelper';
jest.mock('./fixtures/functions', () => ({
    testFunctionAsync: jest.fn(
        async (a: number, b: string): Promise<any> => {
            for (let i = 0; i < a; i++) {
                calledFunction(a, b, true);
            }
            return;
        }
    ),
    testFunction: jest.fn((a: number, b: string): any => {
        for (let i = 0; i < a; i++) {
            calledFunction(a, b, true);
        }
        return;
    }),
    calledFunction: jest.fn((a: number, b: string, c: boolean): any => {
        return;
    })
}));

describe('When using TestFunctionUsage helper class', () => {
    const asyncSingleCallBundle = TestHelper.BundleTestFunction(testFunctionAsync, /* */ testArguments_SingleCall);
    const asyncTripleCallBundle = TestHelper.BundleTestFunction(testFunctionAsync, /* */ testArguments_TripleCall);
    const singleCallBundle = TestHelper.BundleTestFunction(testFunction, /* */ testArguments_SingleCall);
    const tripleCallBundle = TestHelper.BundleTestFunction(testFunction, /* */ testArguments_TripleCall);
    const singleCalledBundle = TestHelper.BundleCalledFunction(calledFunction, /* */ testArguments_SingleCall[0] as number, /* */ expectedArguments_SingleCall);
    const wrongValuesCalledBundle = TestHelper.BundleCalledFunction(calledFunction, /* */ testArguments_SingleCall[0] as number, /* */ expectedArguments_WrongValues);
    const tooManyCalledBundle = TestHelper.BundleCalledFunction(calledFunction, /* */ testArguments_SingleCall[0] as number, /* */ expectedArguments_TooManyCalls);
    describe('and calling callsFunctionTimesAsync', () => {
        describe('it calls the test function', () => {
            test('one time', async () => {
                await TestFunctionUsage.callsFunctionTimesAsync(asyncSingleCallBundle, singleCalledBundle);
                expect(testFunctionAsync).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                await TestFunctionUsage.callsFunctionTimesAsync(asyncSingleCallBundle, singleCalledBundle);
                expect(testFunctionAsync).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionUsage.callsFunctionTimesAsync(asyncSingleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called a number of times different than the specified value, an assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionUsage.callsFunctionTimesAsync(asyncTripleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling callsFunctionWithArgumentsAsync', () => {
        describe('it calls the test function', () => {
            test('one time', async () => {
                await TestFunctionUsage.callsFunctionWithArgumentsAsync(asyncSingleCallBundle, singleCalledBundle);
                expect(testFunctionAsync).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                await TestFunctionUsage.callsFunctionWithArgumentsAsync(asyncSingleCallBundle, singleCalledBundle);
                expect(testFunctionAsync).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionUsage.callsFunctionWithArgumentsAsync(asyncSingleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called different arguments than those specified, an assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionUsage.callsFunctionWithArgumentsAsync(asyncTripleCallBundle, wrongValuesCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
        test('when the calledFunction is called a number of times different than those specified, an assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionUsage.callsFunctionWithArgumentsAsync(asyncTripleCallBundle, tooManyCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling callsFunctionTimes', () => {
        describe('it calls the test function', () => {
            test('one time', () => {
                TestFunctionUsage.callsFunctionTimes(singleCallBundle, singleCalledBundle);
                expect(testFunction).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                TestFunctionUsage.callsFunctionTimes(singleCallBundle, singleCalledBundle);
                expect(testFunction).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', () => {
            let message = '';
            try {
                TestFunctionUsage.callsFunctionTimes(singleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called a number of times different than the specified value, an assertion is raised', () => {
            let message = '';
            try {
                TestFunctionUsage.callsFunctionTimes(tripleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling callsFunctionWithArguments', () => {
        describe('it calls the test function', () => {
            test('one time', () => {
                TestFunctionUsage.callsFunctionWithArguments(singleCallBundle, singleCalledBundle);
                expect(testFunction).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                TestFunctionUsage.callsFunctionWithArguments(singleCallBundle, singleCalledBundle);
                expect(testFunction).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', () => {
            let message = '';
            try {
                TestFunctionUsage.callsFunctionWithArguments(singleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called different arguments than those specified, an assertion is raised', () => {
            let message = '';
            try {
                TestFunctionUsage.callsFunctionWithArguments(tripleCallBundle, wrongValuesCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
        test('when the calledFunction is called a number of times different than those specified, an assertion is raised', () => {
            let message = '';
            try {
                TestFunctionUsage.callsFunctionWithArguments(tripleCallBundle, tooManyCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
});

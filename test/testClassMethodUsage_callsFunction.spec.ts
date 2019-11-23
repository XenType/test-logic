import { TestClassMethodUsage } from '../src/testClassMethodUsage';
import { calledFunction } from './fixtures/functions';
import { TestClass } from './fixtures/classes';
import {
    expectedArguments_SingleCall,
    testArguments_SingleCall,
    testArguments_TripleCall,
    expectedArguments_TooManyCalls,
    expectedArguments_WrongValues
} from './fixtures/constants';
import { TestHelper } from '../src/testHelper';
jest.mock('./fixtures/functions', () => ({
    calledFunction: jest.fn((a: number, b: string, c: boolean): any => {
        return;
    })
}));

describe('When using TestClassMethodUsage helper class', () => {
    const asyncSingleCallBundle = TestHelper.BundleTestClassMethod(TestClass, /* */ 'testMethodAsync', /* */ testArguments_SingleCall);
    const asyncTripleCallBundle = TestHelper.BundleTestClassMethod(TestClass, /* */ 'testMethodAsync', /* */ testArguments_TripleCall);
    const singleCallBundle = TestHelper.BundleTestClassMethod(TestClass, /* */ 'testMethod', /* */ testArguments_SingleCall);
    const tripleCallBundle = TestHelper.BundleTestClassMethod(TestClass, /* */ 'testMethod', /* */ testArguments_TripleCall);
    const singleCalledBundle = TestHelper.BundleCalledFunction(calledFunction, /* */ testArguments_SingleCall[0] as number, /* */ expectedArguments_SingleCall);
    const wrongValuesCalledBundle = TestHelper.BundleCalledFunction(calledFunction, /* */ testArguments_SingleCall[0] as number, /* */ expectedArguments_WrongValues);
    const tooManyCalledBundle = TestHelper.BundleCalledFunction(calledFunction, /* */ testArguments_SingleCall[0] as number, /* */ expectedArguments_TooManyCalls);
    describe('and calling callsFunctionTimesAsync', () => {
        describe('it calls the test class method', () => {
            test('one time', async () => {
                const methodSpy = jest.spyOn(asyncSingleCallBundle.classToTest, asyncSingleCallBundle.methodName);
                await TestClassMethodUsage.callsFunctionTimesAsync(asyncSingleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                const methodSpy = jest.spyOn(asyncSingleCallBundle.classToTest, asyncSingleCallBundle.methodName);
                await TestClassMethodUsage.callsFunctionTimesAsync(asyncSingleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodUsage.callsFunctionTimesAsync(asyncSingleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called a number of times different than the specified value, an assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodUsage.callsFunctionTimesAsync(asyncTripleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling callsFunctionWithArgumentsAsync', () => {
        describe('it calls the test function', () => {
            test('one time', async () => {
                const methodSpy = jest.spyOn(asyncSingleCallBundle.classToTest, asyncSingleCallBundle.methodName);
                await TestClassMethodUsage.callsFunctionWithArgumentsAsync(asyncSingleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                const methodSpy = jest.spyOn(asyncSingleCallBundle.classToTest, asyncSingleCallBundle.methodName);
                await TestClassMethodUsage.callsFunctionWithArgumentsAsync(asyncSingleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodUsage.callsFunctionWithArgumentsAsync(asyncSingleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called different arguments than those specified, an assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodUsage.callsFunctionWithArgumentsAsync(asyncTripleCallBundle, wrongValuesCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
        test('when the calledFunction is called a number of times different than those specified, an assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodUsage.callsFunctionWithArgumentsAsync(asyncTripleCallBundle, tooManyCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling callsFunctionTimes', () => {
        describe('it calls the test method', () => {
            test('one time', () => {
                const methodSpy = jest.spyOn(singleCallBundle.classToTest, singleCallBundle.methodName);
                TestClassMethodUsage.callsFunctionTimes(singleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                const methodSpy = jest.spyOn(singleCallBundle.classToTest, singleCallBundle.methodName);
                TestClassMethodUsage.callsFunctionTimes(singleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodUsage.callsFunctionTimes(singleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called a number of times different than the specified value, an assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodUsage.callsFunctionTimes(tripleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling callsFunctionWithArguments', () => {
        describe('it calls the test function', () => {
            test('one time', () => {
                const methodSpy = jest.spyOn(singleCallBundle.classToTest, singleCallBundle.methodName);
                TestClassMethodUsage.callsFunctionWithArguments(singleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                const methodSpy = jest.spyOn(singleCallBundle.classToTest, singleCallBundle.methodName);
                TestClassMethodUsage.callsFunctionWithArguments(singleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodUsage.callsFunctionWithArguments(singleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called different arguments than those specified, an assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodUsage.callsFunctionWithArguments(tripleCallBundle, wrongValuesCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
        test('when the calledFunction is called a number of times different than those specified, an assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodUsage.callsFunctionWithArguments(tripleCallBundle, tooManyCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
});

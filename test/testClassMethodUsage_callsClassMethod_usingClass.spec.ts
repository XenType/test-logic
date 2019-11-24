import { TestClassMethodUsage } from '../src/testClassMethodUsage';
import {
    expectedArguments_SingleCall,
    testArguments_SingleCall,
    testArguments_TripleCall,
    expectedArguments_TooManyCalls,
    expectedArguments_WrongValues,
} from './fixtures/constants';
import { PrimaryTestClass, SecondaryTestClass } from './fixtures/classes';
import { TestHelper } from '../src/testHelper';

describe('When using TestClassMethodUsage helper class', () => {
    const asyncSingleCallBundle = TestHelper.bundleTestClassMethod(PrimaryTestClass, 'testMethodAsync', testArguments_SingleCall);
    const asyncTripleCallBundle = TestHelper.bundleTestClassMethod(PrimaryTestClass, 'testMethodAsync', testArguments_TripleCall);
    const singleCallBundle = TestHelper.bundleTestClassMethod(PrimaryTestClass, 'testMethodAsync', testArguments_SingleCall);
    const tripleCallBundle = TestHelper.bundleTestClassMethod(PrimaryTestClass, 'testMethodAsync', testArguments_TripleCall);
    const singleCalledBundle = TestHelper.bundleCalledClassMethod(SecondaryTestClass, 'secondaryMethod', expectedArguments_SingleCall);
    const wrongValuesCalledBundle = TestHelper.bundleCalledClassMethod(SecondaryTestClass, 'secondaryMethod', expectedArguments_WrongValues);
    const tooManyCalledBundle = TestHelper.bundleCalledClassMethod(SecondaryTestClass, 'secondaryMethod', expectedArguments_TooManyCalls);
    describe('and calling callsClassMethodTimesAsync', () => {
        describe('it calls the test method', () => {
            test('one time', async () => {
                const methodSpy = jest.spyOn(asyncSingleCallBundle.classToTest, asyncSingleCallBundle.methodName);
                await TestClassMethodUsage.callsClassMethodTimesAsync(asyncSingleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                const methodSpy = jest.spyOn(asyncSingleCallBundle.classToTest, asyncSingleCallBundle.methodName);
                await TestClassMethodUsage.callsClassMethodTimesAsync(asyncSingleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodUsage.callsClassMethodTimesAsync(asyncSingleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called a number of times different than the specified value, an assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodUsage.callsClassMethodTimesAsync(asyncTripleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling callsClassMethodWithArgumentsAsync', () => {
        describe('it calls the test function', () => {
            test('once', async () => {
                const methodSpy = jest.spyOn(asyncSingleCallBundle.classToTest, asyncSingleCallBundle.methodName);
                await TestClassMethodUsage.callsClassMethodWithArgumentsAsync(asyncSingleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                const methodSpy = jest.spyOn(asyncSingleCallBundle.classToTest, asyncSingleCallBundle.methodName);
                await TestClassMethodUsage.callsClassMethodWithArgumentsAsync(asyncSingleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodUsage.callsClassMethodWithArgumentsAsync(asyncSingleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called different arguments than those specified, an assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodUsage.callsClassMethodWithArgumentsAsync(asyncTripleCallBundle, wrongValuesCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
        test('when the calledFunction is called a number of times different than those specified, an assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodUsage.callsClassMethodWithArgumentsAsync(asyncTripleCallBundle, tooManyCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling callsClassMethodTimes', () => {
        describe('it calls the test method', () => {
            test('one time', () => {
                const methodSpy = jest.spyOn(singleCallBundle.classToTest, singleCallBundle.methodName);
                TestClassMethodUsage.callsClassMethodTimes(singleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                const methodSpy = jest.spyOn(singleCallBundle.classToTest, singleCallBundle.methodName);
                TestClassMethodUsage.callsClassMethodTimes(singleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodUsage.callsClassMethodTimes(singleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called a number of times different than the specified value, an assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodUsage.callsClassMethodTimes(tripleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling callsClassMethodWithArguments', () => {
        describe('it calls the test function', () => {
            test('one time', async () => {
                const methodSpy = jest.spyOn(singleCallBundle.classToTest, singleCallBundle.methodName);
                TestClassMethodUsage.callsClassMethodWithArguments(singleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                const methodSpy = jest.spyOn(singleCallBundle.classToTest, singleCallBundle.methodName);
                TestClassMethodUsage.callsClassMethodWithArguments(singleCallBundle, singleCalledBundle);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_SingleCall);
            });
        });
        test('when the calledFunction is called the specified number of times, no assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodUsage.callsClassMethodWithArguments(singleCallBundle, singleCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).toEqual('');
        });
        test('when the calledFunction is called different arguments than those specified, an assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodUsage.callsClassMethodWithArguments(tripleCallBundle, wrongValuesCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
        test('when the calledFunction is called a number of times different than those specified, an assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodUsage.callsClassMethodWithArguments(tripleCallBundle, tooManyCalledBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
});

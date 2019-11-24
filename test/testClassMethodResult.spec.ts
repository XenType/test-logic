import { TestClassMethodResult } from '../src/testClassMethodResult';
import { TestClass, ErrorTestClass } from './fixtures/classes';
import {
    testArguments_NoError,
    testErrorMessage,
    testArguments_ToEqual,
    expectedToEqualResult,
    expectedNotToEqualResult,
    testArguments_ToStrictEqual,
    expectedToStrictEqualResult,
    expectedMustUseStrictEqualResult,
    expectedNotToStrictEqualResult,
} from './fixtures/constants';
import { expectEquality } from '../src/common';
import { TestHelper } from '../src/testHelper';

describe('When using TestClassMethodResult helper class', () => {
    const asyncClassBundle = TestHelper.bundleTestClassMethod(TestClass, 'testMethodAsync', testArguments_NoError);
    const asyncErrorClassBundle = TestHelper.bundleTestClassMethod(ErrorTestClass, 'testMethodAsync', testArguments_NoError);
    const asyncToEqualClassBundle = TestHelper.bundleTestClassMethod(TestClass, 'testMethodAsync', testArguments_ToEqual);
    const asyncToStrictEqualClassBundle = TestHelper.bundleTestClassMethod(TestClass, 'testMethodAsync', testArguments_ToStrictEqual);
    const classBundle = TestHelper.bundleTestClassMethod(TestClass, 'testMethod', testArguments_NoError);
    const errorClassBundle = TestHelper.bundleTestClassMethod(ErrorTestClass, 'testMethod', testArguments_NoError);
    const toEqualClassBundle = TestHelper.bundleTestClassMethod(TestClass, 'testMethod', testArguments_ToEqual);
    const toStrictEqualClassBundle = TestHelper.bundleTestClassMethod(TestClass, 'testMethod', testArguments_ToStrictEqual);
    describe('and calling runsWithoutErrorAsync', () => {
        describe('it calls the class method', () => {
            test('one time', async () => {
                const methodSpy = jest.spyOn(TestClass, 'testMethodAsync');
                await TestClassMethodResult.runsWithoutErrorAsync(asyncClassBundle);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                const methodSpy = jest.spyOn(TestClass, 'testMethodAsync');
                await TestClassMethodResult.runsWithoutErrorAsync(asyncClassBundle);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_NoError);
            });
        });
        test('when no error is thrown, no assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodResult.runsWithoutErrorAsync(asyncClassBundle);
            } catch (error) {
                message = error.message;
            }
            expectEquality(message, '');
        });
        test('when an error is thrown, an assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodResult.runsWithoutErrorAsync(asyncErrorClassBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling runsWithoutError', () => {
        describe('it calls the class method', () => {
            test('one time', () => {
                const methodSpy = jest.spyOn(TestClass, 'testMethod');
                TestClassMethodResult.runsWithoutError(classBundle);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                const methodSpy = jest.spyOn(TestClass, 'testMethod');
                TestClassMethodResult.runsWithoutError(classBundle);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_NoError);
            });
        });
        test('when no error is thrown, no assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodResult.runsWithoutError(classBundle);
            } catch (error) {
                message = error.message;
            }
            expectEquality(message, '');
        });
        test('when an error is thrown, an assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodResult.runsWithoutError(errorClassBundle);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling throwsErrorAsync', () => {
        describe('it calls the class method', () => {
            test('one time', async () => {
                const methodSpy = jest.spyOn(ErrorTestClass, 'testMethodAsync');
                await TestClassMethodResult.throwsErrorAsync(asyncErrorClassBundle, testErrorMessage);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                const methodSpy = jest.spyOn(ErrorTestClass, 'testMethodAsync');
                await TestClassMethodResult.throwsErrorAsync(asyncErrorClassBundle, testErrorMessage);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_NoError);
            });
        });
        test('when no error is thrown, an assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodResult.throwsErrorAsync(asyncClassBundle, testErrorMessage);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
        test('when an error is thrown, an assertion is raised', async () => {
            let message = '';
            try {
                await TestClassMethodResult.throwsErrorAsync(asyncErrorClassBundle, testErrorMessage);
            } catch (error) {
                message = error.message;
            }
            expectEquality(message, '');
        });
    });
    describe('and calling throwsError', () => {
        describe('it calls the class method', () => {
            test('one time', () => {
                const methodSpy = jest.spyOn(ErrorTestClass, 'testMethod');
                TestClassMethodResult.throwsError(errorClassBundle, testErrorMessage);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                const methodSpy = jest.spyOn(ErrorTestClass, 'testMethod');
                TestClassMethodResult.throwsError(errorClassBundle, testErrorMessage);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_NoError);
            });
        });
        test('when no error is thrown, no assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodResult.throwsError(classBundle, testErrorMessage);
            } catch (error) {
                message = error.message;
            }
            expect(message).not.toEqual('');
        });
        test('when an error is thrown, an assertion is raised', () => {
            let message = '';
            try {
                TestClassMethodResult.throwsError(errorClassBundle, testErrorMessage);
            } catch (error) {
                message = error.message;
            }
            expectEquality(message, '');
        });
    });
    describe('and calling returnsExpectedAsync', () => {
        describe('it calls the test method', () => {
            test('one time', async () => {
                const methodSpy = jest.spyOn(TestClass, 'testMethodAsync');
                await TestClassMethodResult.returnsExpectedAsync(asyncToEqualClassBundle, expectedToEqualResult);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                const methodSpy = jest.spyOn(TestClass, 'testMethodAsync');
                await TestClassMethodResult.returnsExpectedAsync(asyncToEqualClassBundle, expectedToEqualResult);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_ToEqual);
            });
        });
        describe('and when the returned result can be compared with either .toEqual and .toStrictEqual', () => {
            describe('and when no useStrictEqual argument is passed', () => {
                test('when expected result is returned, no assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToEqualClassBundle, expectedToEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToEqualClassBundle, expectedNotToEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
            describe('and when useStrictEqual is false', () => {
                test('when expected result is returned, no assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToEqualClassBundle, expectedToEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToEqualClassBundle, expectedNotToEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
            describe('and when useStrictEqual is true', () => {
                test('when expected result is returned, no assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToEqualClassBundle, expectedToEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToEqualClassBundle, expectedNotToEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
        });
        describe('and when the returned result can only be compared with .toStrictEqual effectively', () => {
            describe('and when no useStrictEqual argument is passed', () => {
                test('when expected result is returned with no strict equal differences, no assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToStrictEqualClassBundle, expectedToStrictEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected contains only strict equal differences, no assertion is raised', async () => {
                    // This is expected behavior when the method is called in this way
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToStrictEqualClassBundle, expectedMustUseStrictEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned because of loose equal differences, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToStrictEqualClassBundle, expectedNotToStrictEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
            describe('and when useStrictEqual is false', () => {
                test('when expected result is returned, no assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToStrictEqualClassBundle, expectedToStrictEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected contains only strict equal differences, no assertion is raised', async () => {
                    // This is expected behavior when the method is called in this way
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToStrictEqualClassBundle, expectedMustUseStrictEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToStrictEqualClassBundle, expectedNotToStrictEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
            describe('and when useStrictEqual is true', () => {
                test('when expected result is returned, no assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToStrictEqualClassBundle, expectedToStrictEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected contains only strict equal differences, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToStrictEqualClassBundle, expectedMustUseStrictEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
                test('when expected result is not returned, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestClassMethodResult.returnsExpectedAsync(asyncToStrictEqualClassBundle, expectedNotToStrictEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
        });
    });
    describe('and calling returnsExpected', () => {
        describe('it calls the test method', () => {
            test('one time', () => {
                const methodSpy = jest.spyOn(TestClass, 'testMethod');
                TestClassMethodResult.returnsExpected(toEqualClassBundle, expectedToEqualResult);
                expect(methodSpy).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                const methodSpy = jest.spyOn(TestClass, 'testMethod');
                TestClassMethodResult.returnsExpected(toEqualClassBundle, expectedToEqualResult);
                expect(methodSpy).toHaveBeenCalledWith(...testArguments_ToEqual);
            });
        });
        describe('and when the returned result can be compared with either .toEqual and .toStrictEqual', () => {
            describe('and when no useStrictEqual argument is passed', () => {
                test('when expected result is returned, no assertion is raised', () => {
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toEqualClassBundle, expectedToEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toEqualClassBundle, expectedNotToEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
            describe('and when useStrictEqual is false', () => {
                test('when expected result is returned, no assertion is raised', () => {
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toEqualClassBundle, expectedToEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toEqualClassBundle, expectedNotToEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
            describe('and when useStrictEqual is true', () => {
                test('when expected result is returned, no assertion is raised', () => {
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toEqualClassBundle, expectedToEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toEqualClassBundle, expectedNotToEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
        });
        describe('and when the returned result can only be compared with .toStrictEqual effectively', () => {
            describe('and when no useStrictEqual argument is passed', () => {
                test('when expected result is returned with no strict equal differences, no assertion is raised', () => {
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toStrictEqualClassBundle, expectedToStrictEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected contains only strict equal differences, no assertion is raised', () => {
                    // This is expected behavior when the method is called in this way
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toStrictEqualClassBundle, expectedMustUseStrictEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned because of loose equal differences, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toStrictEqualClassBundle, expectedNotToStrictEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
            describe('and when useStrictEqual is false', () => {
                test('when expected result is returned, no assertion is raised', () => {
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toStrictEqualClassBundle, expectedToStrictEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected contains only strict equal differences, no assertion is raised', () => {
                    // This is expected behavior when the method is called in this way
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toStrictEqualClassBundle, expectedMustUseStrictEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toStrictEqualClassBundle, expectedNotToStrictEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
            describe('and when useStrictEqual is true', () => {
                test('when expected result is returned, no assertion is raised', () => {
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toStrictEqualClassBundle, expectedToStrictEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected contains only strict equal differences, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toStrictEqualClassBundle, expectedMustUseStrictEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
                test('when expected result is not returned, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestClassMethodResult.returnsExpected(toStrictEqualClassBundle, expectedNotToStrictEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
        });
    });
});

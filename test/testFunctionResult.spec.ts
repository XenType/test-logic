import { TestHelper } from '../src/testHelper';
import { TestFunctionResult } from '../src/testFunctionResult';
import { testFunctionAsync, testFunction } from './fixtures/functions';
import {
    expectedToStrictEqualResult,
    testArguments_NoError,
    testErrorMessage,
    testArguments_WithError,
    expectedToEqualResult,
    expectedNotToEqualResult,
    testArguments_ToEqual,
    testArguments_ToStrictEqual,
    expectedNotToStrictEqualResult,
    expectedMustUseStrictEqualResult
} from './fixtures/constants';
import { expectEquality } from '../src/common';
jest.mock('./fixtures/functions', () => ({
    testFunctionAsync: jest.fn(
        async (a: number, b: string): Promise<any> => {
            if (a === testArguments_WithError[0]) {
                throw new Error(testErrorMessage);
            }
            if (a === testArguments_ToEqual[0]) {
                return expectedToEqualResult;
            }
            if (a === testArguments_ToStrictEqual[0]) {
                return expectedToStrictEqualResult;
            }
            return;
        }
    ),
    testFunction: jest.fn((a: number, b: string): any => {
        if (a === testArguments_WithError[0]) {
            throw new Error(testErrorMessage);
        }
        if (a === testArguments_ToEqual[0]) {
            return expectedToEqualResult;
        }
        if (a === testArguments_ToStrictEqual[0]) {
            return expectedToStrictEqualResult;
        }
        return;
    })
}));

describe('When using TestFunctionResult helper class', () => {
    const asyncNoErrorBundle = TestHelper.BundleTestFunction(testFunctionAsync, testArguments_NoError);
    const asyncErrorBundle = TestHelper.BundleTestFunction(testFunctionAsync, testArguments_WithError);
    const asyncToEqualBundle = TestHelper.BundleTestFunction(testFunctionAsync, testArguments_ToEqual);
    const asyncStrictEqualBundle = TestHelper.BundleTestFunction(testFunctionAsync, testArguments_ToStrictEqual);
    const noErrorBundle = TestHelper.BundleTestFunction(testFunction, testArguments_NoError);
    const errorBundle = TestHelper.BundleTestFunction(testFunction, testArguments_WithError);
    const toEqualBundle = TestHelper.BundleTestFunction(testFunction, testArguments_ToEqual);
    const strictEqualBundle = TestHelper.BundleTestFunction(testFunction, testArguments_ToStrictEqual);
    describe('and calling runsWithoutErrorAsync', () => {
        describe('it calls the test function', () => {
            test('one time', async () => {
                await TestFunctionResult.runsWithoutErrorAsync(asyncNoErrorBundle);
                expect(testFunctionAsync).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                await TestFunctionResult.runsWithoutErrorAsync(asyncNoErrorBundle);
                expect(testFunctionAsync).toHaveBeenCalledWith(...testArguments_NoError);
            });
        });
        test('when no error is thrown, no assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionResult.runsWithoutErrorAsync(asyncNoErrorBundle);
            } catch (err) {
                message = err.message;
            }
            expectEquality(message, '');
        });
        test('when an error is thrown, an assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionResult.runsWithoutErrorAsync(asyncErrorBundle);
            } catch (err) {
                message = err.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling runsWithoutError', () => {
        describe('it calls the test function', () => {
            test('one time', () => {
                TestFunctionResult.runsWithoutError(noErrorBundle);
                expect(testFunction).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                TestFunctionResult.runsWithoutError(noErrorBundle);
                expect(testFunction).toHaveBeenCalledWith(...testArguments_NoError);
            });
        });
        test('when no error is thrown, no assertion is raised', () => {
            let message = '';
            try {
                TestFunctionResult.runsWithoutError(noErrorBundle);
            } catch (err) {
                message = err.message;
            }
            expectEquality(message, '');
        });
        test('when an error is thrown, an assertion is raised', () => {
            let message = '';
            try {
                TestFunctionResult.runsWithoutError(errorBundle);
            } catch (err) {
                message = err.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling throwsErrorAsync', () => {
        describe('it calls the test function', () => {
            test('one time', async () => {
                await TestFunctionResult.throwsErrorAsync(asyncErrorBundle, testErrorMessage);
                expect(testFunctionAsync).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                await TestFunctionResult.throwsErrorAsync(asyncErrorBundle, testErrorMessage);
                expect(testFunctionAsync).toHaveBeenCalledWith(...testArguments_WithError);
            });
        });
        test('when expected error is thrown, no assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionResult.throwsErrorAsync(asyncErrorBundle, testErrorMessage);
            } catch (err) {
                message = err.message;
            }
            expectEquality(message, '');
        });
        test('when no error or unexpected error is thrown, an assertion is raised', async () => {
            let message = '';
            try {
                await TestFunctionResult.throwsErrorAsync(asyncNoErrorBundle, testErrorMessage);
            } catch (err) {
                message = err.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling throwsError', () => {
        describe('it calls the test function', () => {
            test('one time', () => {
                TestFunctionResult.throwsError(errorBundle, testErrorMessage);
                expect(testFunction).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                TestFunctionResult.throwsError(errorBundle, testErrorMessage);
                expect(testFunction).toHaveBeenCalledWith(...testArguments_WithError);
            });
        });
        test('when expected error is thrown, no assertion is raised', () => {
            let message = '';
            try {
                TestFunctionResult.throwsError(errorBundle, testErrorMessage);
            } catch (err) {
                message = err.message;
            }
            expectEquality(message, '');
        });
        test('when no error or unexpected error is thrown, an assertion is raised', () => {
            let message = '';
            try {
                TestFunctionResult.throwsError(noErrorBundle, testErrorMessage);
            } catch (err) {
                message = err.message;
            }
            expect(message).not.toEqual('');
        });
    });
    describe('and calling returnsExpectedAsync', () => {
        describe('it calls the test function', () => {
            test('one time', async () => {
                await TestFunctionResult.returnsExpectedAsync(asyncToEqualBundle, expectedToEqualResult);
                expect(testFunctionAsync).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', async () => {
                await TestFunctionResult.returnsExpectedAsync(asyncToEqualBundle, expectedToEqualResult);
                expect(testFunctionAsync).toHaveBeenCalledWith(...testArguments_ToEqual);
            });
        });
        describe('and when the returned result can be compared with either .toEqual and .toStrictEqual', () => {
            describe('and when no useStrictEqual argument is passed', () => {
                test('when expected result is returned, no assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestFunctionResult.returnsExpectedAsync(asyncToEqualBundle, expectedToEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestFunctionResult.returnsExpectedAsync(asyncToEqualBundle, expectedNotToEqualResult);
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
                        await TestFunctionResult.returnsExpectedAsync(asyncToEqualBundle, expectedToEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestFunctionResult.returnsExpectedAsync(asyncToEqualBundle, expectedNotToEqualResult, false);
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
                        await TestFunctionResult.returnsExpectedAsync(asyncToEqualBundle, expectedToEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestFunctionResult.returnsExpectedAsync(asyncToEqualBundle, expectedNotToEqualResult, true);
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
                        await TestFunctionResult.returnsExpectedAsync(asyncStrictEqualBundle, expectedToStrictEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected contains only strict equal differences, no assertion is raised', async () => {
                    // This is expected behavior when the method is called in this way
                    let message = '';
                    try {
                        await TestFunctionResult.returnsExpectedAsync(asyncStrictEqualBundle, expectedMustUseStrictEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned because of loose equal differences, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestFunctionResult.returnsExpectedAsync(asyncStrictEqualBundle, expectedNotToStrictEqualResult);
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
                        await TestFunctionResult.returnsExpectedAsync(asyncStrictEqualBundle, expectedToStrictEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected contains only strict equal differences, no assertion is raised', async () => {
                    // This is expected behavior when the method is called in this way
                    let message = '';
                    try {
                        await TestFunctionResult.returnsExpectedAsync(asyncStrictEqualBundle, expectedMustUseStrictEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestFunctionResult.returnsExpectedAsync(asyncStrictEqualBundle, expectedNotToStrictEqualResult, false);
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
                        await TestFunctionResult.returnsExpectedAsync(asyncStrictEqualBundle, expectedToStrictEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected contains only strict equal differences, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestFunctionResult.returnsExpectedAsync(asyncStrictEqualBundle, expectedMustUseStrictEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
                test('when expected result is not returned, an assertion is raised', async () => {
                    let message = '';
                    try {
                        await TestFunctionResult.returnsExpectedAsync(asyncStrictEqualBundle, expectedNotToStrictEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
        });
    });
    describe('and calling returnsExpected', () => {
        describe('it calls the test function', () => {
            test('one time', () => {
                TestFunctionResult.returnsExpected(toEqualBundle, expectedToEqualResult);
                expect(testFunction).toHaveBeenCalledTimes(1);
            });
            test('with expected arguments', () => {
                TestFunctionResult.returnsExpected(toEqualBundle, expectedToEqualResult);
                expect(testFunction).toHaveBeenCalledWith(...testArguments_ToEqual);
            });
        });
        describe('and when the returned result can be compared with either .toEqual and .toStrictEqual', () => {
            describe('and when no useStrictEqual argument is passed', () => {
                test('when expected result is returned, no assertion is raised', () => {
                    let message = '';
                    try {
                        TestFunctionResult.returnsExpected(toEqualBundle, expectedToEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestFunctionResult.returnsExpected(toEqualBundle, expectedNotToEqualResult);
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
                        TestFunctionResult.returnsExpected(toEqualBundle, expectedToEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestFunctionResult.returnsExpected(toEqualBundle, expectedNotToEqualResult, false);
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
                        TestFunctionResult.returnsExpected(toEqualBundle, expectedToEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestFunctionResult.returnsExpected(toEqualBundle, expectedNotToEqualResult, true);
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
                        TestFunctionResult.returnsExpected(strictEqualBundle, expectedToStrictEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected contains only strict equal differences, no assertion is raised', () => {
                    // This is expected behavior when the method is called in this way
                    let message = '';
                    try {
                        TestFunctionResult.returnsExpected(strictEqualBundle, expectedMustUseStrictEqualResult);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned because of loose equal differences, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestFunctionResult.returnsExpected(strictEqualBundle, expectedNotToStrictEqualResult);
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
                        TestFunctionResult.returnsExpected(strictEqualBundle, expectedToStrictEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected contains only strict equal differences, no assertion is raised', () => {
                    // This is expected behavior when the method is called in this way
                    let message = '';
                    try {
                        TestFunctionResult.returnsExpected(strictEqualBundle, expectedMustUseStrictEqualResult, false);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected result is not returned, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestFunctionResult.returnsExpected(strictEqualBundle, expectedNotToStrictEqualResult, false);
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
                        TestFunctionResult.returnsExpected(strictEqualBundle, expectedToStrictEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expectEquality(message, '');
                });
                test('when expected contains only strict equal differences, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestFunctionResult.returnsExpected(strictEqualBundle, expectedMustUseStrictEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
                test('when expected result is not returned, an assertion is raised', () => {
                    let message = '';
                    try {
                        TestFunctionResult.returnsExpected(strictEqualBundle, expectedNotToStrictEqualResult, true);
                    } catch (err) {
                        message = err.message;
                    }
                    expect(message).not.toEqual('');
                });
            });
        });
    });
});

# test-logic

TestLogic is a collection of static helper classes for jest tests to help prevent code repetition and increase test writing speed.

## Installation

Use [npm](https://nodejs.org/en/download/) to install the test-logic package. Include the --save-dev argument if this module will only be used in your tests.

```bash
npm install test-logic --save-dev
```

If using TypeScript, install type definitions.

```bash
npm install @types/test-logic --save-dev
```

## Usage

### Include options

Include the entire suite of test helper classes.

Example:

```javascript
import TestLogic from 'test-logic';
```

Include specific test helper classes.

Example:

```javascript
import { TestClassMethodResult } from 'test-logic/testClassMethodResult';
import { TestClassMethodUsage } from 'test-logic/testClassMethodUsage';
import { TestFunctionResult } from 'test-logic/testFunctionResult';
import { TestFunctionUsage } from 'test-logic/testFunctionUsage';
import { TestHelper } from 'test-logic/TestHelper';
```

### Using the TestHelper class

The TestHelper class provides convenient methods to format your existing fixtures for testing by one of the 'test usage' or 'test result' classes in TestLogic.

#### Using convertArgumentsToArray

TestLogic classes require you to provide function and method arguments in the form of an array where the array index corresponds to the argument's order in the function or method signature. This simple method adds readability to your tests by replacing an array declaration with a descriptive method indicating the original purpose of the source elements.

Example: Creating an argument array that is expressed in the same pattern as the signature of the function or method that will be tested.

```javascript
import TestLogic from 'test-logic';

const firstArgument = 1;
const secondArgument = 'test';
const thirdArgument = false;

const argArray = TestLogic.TestHelper.convertArgumentsToArray(firstArgument, secondArgument, thirdArgument);
```

Instead of:

```javascript
const argArray = [firstArgument, secondArgument, thirdArgument];
```

#### Using bundle methods for functions or class methods you wish to run during the test

Each bundle method helps you neatly package functions, classes and their arguments into objects needed by Testlogic classes.

Bundling the function 'myFunction' to run during the test with the arguments (123, 'test'):

```javascript
import TestLogic from 'test-logic';
import { myFunction } from '.';

const argArray = TestLogic.TestHelper.convertArgumentsToArray(123, 'test');
const functionBundle = TestLogic.TestHelper.bundleTestFunction(myFunction, argArray);
```

Bundling the class method 'myClassInstance.myMethod' to run during the test with the arguments (123, 'test'):

```javascript
import TestLogic from 'test-logic';
import { MyClass } from '.';

const myClassInstance = new MyClass();
const argArray = TestLogic.TestHelper.convertArgumentsToArray(123, 'test');
const classBundle = TestLogic.TestHelper.bundleTestClassMethod(myClassInstance, 'myMethod', argArray);
```

#### Using bundle methods to test for integration with functions or class methods you expect to be run by your code

When testing integration with other functions and class methods, bundle the expected interactions for use by TestLogic classes depending on the requirements of your test. The provided bundle methods of the TestHelper class each contain an optional 'timesOrArguments' as their final argument. The following uniform behavior applies to all bundle methods:

-   omitted or undefined: 0 calls will be expected to the function or class method being bundled.
-   number (num): The function or class method being bundled will be expected to have been called num times. Each call will be expected to have passed no arguments.
-   any[][] (argArray): The function or class method will be expected to have been called argArray.length times. A zero length array is permitted, but will be treated the same as being omitted or undefined. For non-zero length arrays, the first call will expect arguments of (...argArray[0]), the second (...argArray[1]), etc.

##### Called class method bundles

Classes used in these bundles should be imported, and if required instantiated, prior to bundling. When testing the use of a class instance by your method or function, the instance must be passed to the function, method (or in some cases the class constructor for non-static methods) in order for TestLogic to test integration.

Depending on your needs, the class can be [mocked](https://jestjs.io/docs/en/es6-class-mocks#the-4-ways-to-create-an-es6-class-mock) but it is not required. You do _not_ need to provide jest spies.

Example: Bundling the expected use of the static method 'CalledClass.calledMethod' 2 times, first with the arguments (123, 'test') then with the arguments (432, 'complete'):

```javascript
import TestLogic from 'test-logic';
import { CalledClass } from '.';

const expectedFirstArgArray = TestLogic.TestHelper.convertArgumentsToArray(123, 'test');
const expectedSecondArgArray = TestLogic.TestHelper.convertArgumentsToArray(432, 'complete');
const calledWithArray = TestLogic.TestHelper.convertArgumentsToArray(expectedFirstArgArray, expectedSecondArgArray);

const calledBundle = TestLogic.TestHelper.bundleCalledClassMethod(CalledClass, 'calledMethod', calledWithArray);
```

Alternatively, if you are not worried about line width:

```javascript
const calledBundle = TestLogic.TestHelper.bundleCalledClassMethod(CalledClass, 'calledMethod', [expectedFirstArgArray, expectedSecondArgArray]);
```

##### Called function bundles

Functions used in these bundles should be imported and mocked, using [jest.mock()](https://jestjs.io/docs/en/mock-functions.html#:~:targetText=Mock%20functions%20allow%20you%20to,time%20configuration%20of%20return%20values.) to implement the behavior desired during the test.

Example: Bundling the expected use of the function 'myFunction' 1 time, with the arguments (123, 'test');

```javascript
import TestLogic from 'test-logic';

const expectedArgArray = TestLogic.TestHelper.convertArgumentsToArray(123, 'test');

const calledBundle = TestLogic.TestHelper.bundleCalledFunction(myFunction, [calledWithArray]);
```

NOTE: The 2nd argument must still be an array of expected argument arrays. Take care when working with single calls, as array depth will be less obvious.

### Using result test classes

The TestClassMethodResult and TestFunctionResult classes run a bundled class method or function and evaluate the results of the operation. Test classes include synchronous and asynchronous versions for each test type. The following methods are currently supported on each result test class:

-   runsWithoutError & runsWithoutErrorAsync: The bundled class method or function will execute with the given arguments and no error will be thrown.
-   runsWithError & runsWithErrorAsync: The bundled class method or function will execute with the given arguments and throw an error with a message equal to the expectedErrorMessage argument.
-   returnsExpected & returnsExpectedAsync: The bundled class method or function will execute with the given arguements returning a result equal to the expectedResult argument. Strict equality can be enabled with the useStrictEqual argument.

### Using usage test classes

The TestClassMethodUsage and TestFunctionUsage classes run a bundled class method or function and evaluate its usage of a second bundled function or class. Usage test classes ignore any errors thrown by your tested class method or function, allowing you to test integration even in situations that are expected to generate an error. See important requirements on preparing the second bundle above, under "Using bundle methods to test for integration with functions or class methods you expect to be run by your code". Test classes include synchronous and asynchronous versions for each test type. The following methods are currently supported on each usage test class:

-   callsClassMethodTimes, callsClassMethodTimesAsync, callsFunctionTimes, callsFunctionTimesAsync: When executing the first bundle (class method or function with arguments) the function or class method within the second bundle will be called the specified number of times.
-   callsClassWithArguments, callsClassWithArgumentsAsync, callsFunctionWithArguments, callsFunctionWithArgumentsAsync: When executing the first bundle (class method or function with arguments) the function or class method within the second bundle will be called with each element of the specified arguments array.

### Full Examples

#### Testing the result of your function

Your function, 'myFunction', should return a value of 'complete' when passed the arguments (1, true), 'idle' when passed (1, false), and 'processing' when passed anything else.

```javascript
import TestLogic from 'test-logic';
import { myFunction } from '.';

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
```

#### Testing the usage of a function by your class method

Your class, 'MyClass' has a dependency of 'CalledClass'. 'MyClass.myMethod' has three arguments (count, minText, maxText) and should call 'CalledClass.calledMethod', a static method, as follows:

-   count = 0, calls 0 times
-   count greater than 0 but less than 10, calls 1 time with (1, minText) for arguments
-   count 10 or greater, calls 2 times with (1, minText) for the first argument set and (2, maxText) for the second argument set

```javascript
import TestLogic from 'test-logic';
import { MyClass } from '.';
import { CalledClass } from 'called-class';

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
```

## Contributing

Please suggest any changes via issue first to open a discussion. This project will be expanded, but no roadmap has been created at this time. Pull Requests are welcome if you find an bug and resolution, otherwise please also create issues for reporting bugs.

## License

[ISC](https://opensource.org/licenses/ISC)

# test-logic

TestLogic is a collection of static helper classes to help prevent code repetition and increase test writing speed.

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

Include the entire suite of test helper classes

```javascript
import TestLogic from 'test-logic';
```

Include specific test helper classes

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

A simple method that adds readability to your tests by replacing a simple array declaration with a descriptive method indicating the original purpose of the source elements.

```javascript
import TestLogic from 'test-logic';

const firstArgument = 1;
const secondArgument = { a: 'test' };
const thridArgument = false;

const args = TestLogic.TestHelper.convertArgumentsToArray(firstArgument, secondArgument, thirdArgument);
```

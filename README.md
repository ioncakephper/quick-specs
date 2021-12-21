# quick-specs

[![ioncakephper - quick-specs](https://img.shields.io/static/v1?label=ioncakephper&message=quick-specs&color=blue&logo=github)](https://github.com/ioncakephper/quick-specs "Go to GitHub repo")
[![stars - quick-specs](https://img.shields.io/github/stars/ioncakephper/quick-specs?style=social)](https://github.com/ioncakephper/quick-specs)
[![forks - quick-specs](https://img.shields.io/github/forks/ioncakephper/quick-specs?style=social)](https://github.com/ioncakephper/quick-specs)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![Dependency Status](https://www.versioneye.com/user/projects/quick-specs/badge.svg)](https://www.versioneye.com/user/projects/quick-specs)
[![Latest Stable Version](https://img.shields.io/npm/v/quick-specs.svg)](https://www.npmjs.com/package/quick-specs)
[![NPM Downloads](https://img.shields.io/npm/dt/quick-specs.svg)](https://www.npmjs.com/package/quick-specs)
[![NPM Downloads](https://img.shields.io/npm/dm/quick-specs.svg)](https://www.npmjs.com/package/quick-specs)

Create test files quickly from .yaml files. Put your test or specification title in a .yaml file, and create test files for Jest or Jasmine. Useful for developers and designers who want to write specification quickly, and write the specification test code later.

## Installation

Install globally to use the CLI tool.

```bash
npm i -g quick-specs
```

## Usage

You can use `quick-specs` either as a CLI tool, or inside your `javacript` code.

### CLI

If you installed `quick-specs` globally, you can use the `quickspecs` tool at the command prompt. For example,

```bash
quickspecs -h
```

```txt
Usage: quickspecs [options] <input>

Quickly generate specification files for Jasmine/Jest

Arguments:
  input                       path to input filename in YAML format (default        
                              extension: .yaml)

Options:
  -V, --version               output the version number
  -o, --output <outfilename>  specification filename
  -p, --path <path>           path to specification folder (default: "tests")       
  -t, --target <platform>     target platform (choices: "jest", "jasmine", default: 
                              "jest")
  -h, --help                  display help for command
```

### Input file examples

1. A list of test cases

Create `example-1.yaml`:

```yaml
- Returns a positive number
- Converts negative numbers to positive
- Acccepts empty parameter list
```

```bash
quickspecs example-1
```

```js
it('Returns a positive number', () => {
    // Your code goes here...
    expect(true).toBe(true);
})

it('Converts negative numbers to positive', () => {
    // Your code goes here...
    expect(true).toBe(true);
})

it('Acccepts empty parameter list', () => {
    // Your code goes here...
    expect(true).toBe(true);
})
```

2. A test suite with several test cases

Create `example-2.yaml`:

```yaml
suite: My function
items:
    - Returns a positive number
    - Converts negative numbers to positive
    - Acccepts empty parameter list
```


```bash
quickspecs example-2
```

```js
describe('My function', () => {
    it('Returns a positive number', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

    it('Converts negative numbers to positive', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

    it('Acccepts empty parameter list', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

})
```

3. A list of test suites, each suite has several test cases

Create `example-3.yaml`:

```yaml
-
    suite: My first function
    items:
        - Returns a positive number
        - Converts negative numbers to positive
        - Acccepts empty parameter list

-
    suite: My second function
    items:
        - Returns a positive number
        - Converts negative numbers to positive
        - Acccepts empty parameter list

```


```bash
quickspecs example-3
```

```js
describe('My first function', () => {
    it('Returns a positive number', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

    it('Converts negative numbers to positive', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

    it('Acccepts empty parameter list', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

})

describe('My second function', () => {
    it('Returns a positive number', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

    it('Converts negative numbers to positive', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

    it('Acccepts empty parameter list', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

})
```


4. Test suite with a mixture of suite and test cases

Create `example-4.yaml`:

```yaml
-
    suite: My first function
    items:

        - 
            suite: Dealing with test data
            items:
                - works with large numbers
                - works with small numbers
                - returns undefined when given non-numbers

        - Returns a positive number
        - Converts negative numbers to positive
        - Acccepts empty parameter list

-
    suite: My second function
    items:
        - Returns a positive number
        - Converts negative numbers to positive
        - Acccepts empty parameter list

```

```bash
quickspecs example-4
```

```js
describe('My first function', () => {
    describe('Dealing with test data', () => {
        it('works with large numbers', () => {
            // Your code goes here...
            expect(true).toBe(true);
        })

        it('works with small numbers', () => {
            // Your code goes here...
            expect(true).toBe(true);
        })

        it('returns undefined when given non-numbers', () => {
            // Your code goes here...
            expect(true).toBe(true);
        })

    })

    it('Returns a positive number', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

    it('Converts negative numbers to positive', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

    it('Acccepts empty parameter list', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

})

describe('My second function', () => {
    it('Returns a positive number', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

    it('Converts negative numbers to positive', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

    it('Acccepts empty parameter list', () => {
        // Your code goes here...
        expect(true).toBe(true);
    })

})
```

### In code

Create `my-specs.yaml`

```yaml
suite: My application
items:
  - reads a yaml file
  - writes a js file
```

In your `js` code:

```js
const qws = require('quick-specs');

let appSpecs = qws.load('my-specs.yaml');
let output = qws.buildSpecification(appSpecs)
console.log(output);
```

You will see:

```js
description('My application', () -> {
   it('reads a yaml file', () => {
     // Your code goes here
     expect(true).toBe(true)
   })
  
   it('reads a yaml file', () => {
     // Your code goes here
     expect(true).toBe(true)
   })
})
```

## License

MIT License

Copyright (c) 2021 Ion Gireada

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

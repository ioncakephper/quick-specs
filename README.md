# quick-specs

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
let output = qws.buildSpecifications(appSpecs)
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


#!/usr/bin/env node

/*
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
*/

const beautify    = require('beautify');
const program     = require('commander');
const { Option }  = require('commander')
const fileEasy    = require('file-easy');
const { isArray, isEmpty } = require('lodash');
const path        = require('path');
const { exit } = require('process');
const quickSpecs  = require('../index');


program
    .description('Quickly generate specification files for Jasmine/Jest')
    .name('quickspecs')
    .version(require('../package.json').version)

program
    .argument('[input]', 'path to input filename in YAML format (default extension: .yaml)')
    .option('-o, --output <outfilename>', 'specification filename')
    .option('-p, --path <path>', 'path to specification folder', 'tests')
    .addOption(new Option('-t, --target <platform>', 'target platform').choices(["jest", "jasmine"]).default("jest"))

    .action((input, options) => {
        if (isEmpty(input)) {
            program.help()
        }
        input = fileEasy.setDefaultExtension(input, '.yaml')
        let appSpecification = quickSpecs.load(input);

        let output = quickSpecs.buildSpecification(appSpecification, isArray(appSpecification));
        output = beautify(output, { format: 'js' })

        let extraExt = options.target == 'jest' ? '.test' : 'Spec';
        let basename = path.basename(input, path.extname(input))
        let specsFilename = path.join(options.path, `${basename}${extraExt}.js`)
        fileEasy.saveDocument(specsFilename, output);

    })

program.parse();

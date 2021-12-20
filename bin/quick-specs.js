#!/usr/bin/env node

const program = require('commander');
const fileEasy = require('file-easy');
const yamljs = require('yamljs');
const beautify = require('beautify');
const { isArray } = require('lodash');
const path = require('path');
const { buildSpecification } = require('../index');
const { Option } = require('commander')

program
    .description('Quickly generate specification files for Jasmine/Jest')
    .name('qspec')
    .version(require('../package.json').version)

program
    .argument('<input>', 'path to input filename in YAML format (default extension: .yaml)')
    .option('-o, --output <outfilename>', 'specification filename')
    .option('-p, --path <path>', 'path to specification folder', 'tests')
    .addOption(new Option('-t, --target <platform>', 'target platform').choices(["jest", "jasmine"]).default("jest"))

    .action((input, options) => {
        input = fileEasy.setDefaultExtension(input, '.yaml')
        let appSpecification = yamljs.load(input);

        let output = buildSpecification(appSpecification, isArray(appSpecification));
        output = beautify(output, { format: 'js' })

        let extraExt = options.target == 'jest' ? '.test' : 'Spec';
        let basename = path.basename(input, path.extname(input))
        let specsFilename = path.join(options.path, `${basename}${extraExt}.js`)
        fileEasy.saveDocument(specsFilename, output);

    })

program.parse();
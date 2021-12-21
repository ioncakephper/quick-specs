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
const fileEasy                          = require('file-easy')
const hbsr                              = require('hbsr')
const { isArray, isString, isObject, isNull }   = require('lodash')
const yamljs                            = require('yamljs')


/**
 * Load quick specification from file
 *
 * @param {string} filename path to yaml file containing quick specification items.
 * @return {object} quick specification object or array of specification items.
 */
function load(filename) {
    filename =  fileEasy.setDefaultExtension(filename, '.yaml')
    return yamljs.load(filename)
}

/**
 * Build specifications as describe, it items. Compatible with Jest and Jasmine.
 *
 * @param {object|array[object]} [item={}] a specification item or array of specification items.
 * @param {boolean} [convertToText=false] whether to compress content when item is array
 * @return {string} javascript code containing describe and it statements
 */
function buildSpecification(item = {}, convertToText = false) {

    if (isObject(item) && !isArray(item) && !isString(item)) {
        let title = item.suite;
        let results = renderSuite(title, buildSpecification(item.items || []))
        return results;
    }

    if (isArray(item)) {
        let results =  item.map((singleSpec) => {
            return buildSpecification(singleSpec)
        })
        
        return convertToText ? results.join('\n') : results;

    }
  
    return renderSingleSpec(item);
}

/**
 * Render a test suite javascript code.
 *
 * @param {string} [title=''] test suite description string.
 * @param {array[string]} [items=[]] items inside a test suite, either a test case of a test suite
 * @return {string} javascript code with a describe function. 
 */
function renderSuite(title = '', items = []) {
    if (isNull(title) || isNull(items = [])) {
        return ''
    }
    return hbsr.render(`describe('{{{title}}}', () => {
        {{#each specs as |spec|}}
    {{{spec}}}
        {{/each}}
})
`, { 
    title: title.trim(),
    specs: items,
})
} 

/**
 * Render a test case javascript code.
 *
 * @param {string} [item=''] test case description text.
 * @param {boolean} [shouldPass=true] whether to create a passing or a failing test case
 * @return {string} javascript code with an it function.
 */
function renderSingleSpec(item = '', shouldPass = true) {
    if (isNull(item)) {
        return ''
    }
    return hbsr.render(`it('{{{title}}}', () => {
        // Your code goes here...
        expect({{#if shouldPass}}true{{else}}false{{/if}}).toBe(true);
    })
`, {title: item.trim(), shouldPass: shouldPass})
}

module.exports = {
    buildSpecification,
    load,
}

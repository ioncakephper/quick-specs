const hbsr = require('hbsr')
const { isArray, isString, isObject } = require('lodash')
const yamljs = require('yamljs')
const beautify = require('beautify')
const fileEasy = require('file-easy')
const path = require('path')

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


function renderSuite(title, items = []) {
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

function renderSingleSpec(item = '', shouldPass = true) {
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
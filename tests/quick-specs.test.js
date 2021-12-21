const qws = require('../index');

describe('quick-specs', () => {
    describe('load method', () => {})

    describe('buildSpecification method', () => {
        it('object with suite but no items will render a callback with no content', () => {
            // Your code goes here...
            // expect(true).toBe(true);
          
            let r = qws.buildSpecification({suite: "", items: []})
            expect(r).toMatch(/\(\)\s*\=\>\s*\{\s*\}\)/)
        })

        it('object with suite and items as string will render a callback with it for each item', () => {
            // Your code goes here...
            // expect(true).toBe(true);

            let r = qws.buildSpecification({suite: "", items: ["First"]})
            expect(r).toMatch(/it\(/)
            
            
        })

        it('object with suite and items containing a suite as item will render a callback containing a suite', () => {
            // Your code goes here...
            // expect(true).toBe(true);
            let r = qws.buildSpecification({suite: "", items: [{suite: ""}]})
            expect(r).toMatch(/\{\n(\s*\n?)*describe/)
        })

    })

})
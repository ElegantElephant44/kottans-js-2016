"use strict"

const PostHTML = require("posthtml")
const fs = require('fs')
const argv = process.argv.slice(2);
const html = fs.readFileSync(argv[0], 'utf8')

const pattern = /js-s*(\w+)\s*/g
const bootstrapClasses = fs.readFileSync('bootstrapClasses', 'utf8').split('\r\n')

const plugin = tree => tree
    .match({
        attrs: {
            class: true
        }
    }, node => {

        let classes = node.attrs.class
        let bootstrapClass;
        for (let bootstrapClass of bootstrapClasses) {
            classes = classes.replace(bootstrapClass, "")
        }
        let jsDataAttrs = classes.match(pattern);
        if (jsDataAttrs != null) {
            let jsDataResultString = jsDataAttrs.reduce((prev, current) => {
                classes = classes.replace(current, "");
                return prev.concat(current.substring(3))
            }, "")
            node.attrs["data-js"] = jsDataResultString.trim()
        }
        classes = classes.trim();
        node.attrs.class = classes == "" ? undefined : classes;
        return node
    })


PostHTML([plugin])
    .process(html)
    .then(result => {
        fs.writeFile(argv[1], result.html)
    })
    .catch(console.error)
"use strict"

const PostHTML = require("posthtml")
const fs = require('fs')
const argv = process.argv.slice(2);
let html =fs.readFileSync(argv[0], 'utf8')

const pattern = /\{\s*(\w+)\s*\}/g
const bootstrapClasses = fs.readFileSync('bootstrapClasses', 'utf8').split('\r\n')

const plugin = tree => tree
.match({ attrs: {class:true} }, node =>
{

    let classes = node.attrs.class
    let bootstrapClass;
    for (let i = 0; i < bootstrapClasses.length; i++) {
        bootstrapClass = bootstrapClasses[i]
        classes = classes.replace(bootstrapClass, "")
    }
    classes = classes.trim();        
    let jsDataAttrs = classes.match( /js-s*(\w+)\s*/g);
    if(jsDataAttrs != null)
    {
        let jsDataResultString="";
        for (let i = 0; i < jsDataAttrs.length; i++) {
            classes = classes.replace(jsDataAttrs[i],"")
            jsDataResultString = jsDataResultString.concat(jsDataAttrs[i].substring(3))
        }
        node.attrs["data-js"] = jsDataResultString.trim()    
    }
    if(classes!=""){
        node.attrs.class = classes
    }
    else
    {
        node.attrs.class = undefined
    }    
    return node
})   


PostHTML([ plugin ])    
.process(html)
.then(result =>
{
    fs.writeFile(argv[1], result.html)
})
.catch(console.error)
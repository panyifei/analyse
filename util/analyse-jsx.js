'use strict';
//analyse a jsx file
const esprima = require('esprima');
const BabelCore = require("babel-core");

let filePath = "../test/test.jsx";
//change jsx to js
const bebalRes = BabelCore.transformFileSync(filePath , {
    plugins: ["transform-react-jsx"]
});

var jscode =  bebalRes.code;

console.log(jscode);

//esprima need to special build as module
let ast = esprima.parse(jscode,{ sourceType: 'module' });




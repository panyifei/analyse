'use strict';
//analyse a jsx file
const esprima = require('esprima');
const BabelCore = require("babel-core");

let AnalyseJsx = {};

AnalyseJsx.analyse = (jsxFile) => {

    const filePath = jsxFile.__route;;

    //change jsx to js
    const babelRes = BabelCore.transformFileSync(filePath , {
        plugins: ["transform-react-jsx"]
    });

    const jscode =  babelRes.code;

    //esprima need to special build as module
    const ast = esprima.parse(jscode,{ sourceType: 'module' });

    let proBody = ast.body;

    proBody.forEach(function (declara) {
        if(declara.type === "ImportDeclaration"){
            if(/.jsx$/.test(declara.source.value)){
                console.log('引入了jsxFile');
            }
        }
    })

}


module.exports = AnalyseJsx;




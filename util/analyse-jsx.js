'use strict';
//analyse a jsx file
let colors = require('colors');
const path  = require('path');
const esprima = require('esprima');
const BabelCore = require("babel-core");
const Help = require('../util/help');

let AnalyseJsx = {};

AnalyseJsx.analyse = (jsxFile ,pro) => {

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
                let componentPath = path.join(filePath,'..',declara.source.value);
                var component = Help.loop(pro, componentPath);
                component.fatherComponent = jsxFile;
                jsxFile.childComponent.push(component);
            }else if(declara.specifiers[0]){
                let name = declara.specifiers[0].local.name;
                if(new RegExp("React.createElement\\(" + name + ",","g").test(jscode)){
                    let componentPath = path.join(filePath,'..',declara.source.value + ".jsx");
                    var component = Help.loop(pro, componentPath);
                    if(component != null){
                        component.fatherComponent = jsxFile;
                        jsxFile.childComponent.push(component);
                    }else{
                        console.log(colors.red('there is a jsx file named as js file or import from outsite'));
                        console.log(declara.source.value);
                    }
                }
            }
        }
    })

}


module.exports = AnalyseJsx;




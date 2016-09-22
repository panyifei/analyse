'use strict';

const JsxFile = require('../class/class').JsxFile;
const AnalyseJsx = require('./analyse-jsx');
const Analyse = {};

//loop the whole project to analyse jsxFile
Analyse.loop = dir =>{
    analyseFileList(dir);
    analyseDirList(dir);

    //analyse jsxFile
    function analyseFileList(dir) {
        dir.fileList.forEach(function (file) {
            if(file instanceof JsxFile){
                AnalyseJsx.analyse(file);
            }
        });
    }
    //loop dir
    function analyseDirList(dir) {
        dir.dirList.forEach(function (dir) {
            Analyse.loop(dir);
        });
    }
}

module.exports = Analyse;
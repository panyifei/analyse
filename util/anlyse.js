'use strict';

const JsxFile = require('../class/class').JsxFile;
const AnalyseJsx = require('./analyse-jsx');
const Analyse = {};

//loop the whole project to analyse jsxFile
Analyse.loop = (dir, pro) =>{
    analyseFileList(dir);
    analyseDirList(dir);

    //analyse jsxFile
    function analyseFileList(dir) {
        dir.fileList.forEach(function (file) {
            if(file instanceof JsxFile){
                AnalyseJsx.analyse(file, pro);
            }
        });
    }

    //loop dir
    function analyseDirList(dir) {
        dir.dirList.forEach(function (dir) {
            Analyse.loop(dir, pro);
        });
    }
}

//loop the whole project to return index jsxFile
Analyse.getIndexJsxFile = (dir) =>{
    let resFile = [];
    loopFileList(dir);
    loopDirList(dir);

    //loop file
    function loopFileList(dir) {
        dir.fileList.forEach(function (file) {
            if(file instanceof JsxFile && file.fatherComponent == null){
                resFile.push(file);
            }
        });
    }

    //loop dir
    function loopDirList(dir) {
        dir.dirList.forEach(function (dir) {
            let res = Analyse.getIndexJsxFile(dir);
            if(res.length > 0){
                resFile = resFile.concat(res);
            }
        });
    }
    return resFile;
};

module.exports = Analyse;
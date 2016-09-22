'use strict';

var FileType = require('./file-type');

var help = {};

//check directory if useful
help.checkUseful = name => {
    const useless = ['.idea','.git','node_modules'];
    if(useless.indexOf(name) == -1){
        return true;
    }else{
        return false;
    }
};

//check file type
help.checkFileType = name => {
    let list = name.split('.');
    if(list.length == 1){
        return FileType.UNKNOWN;
    }else{
        let type = list[list.length - 1];
        switch (type){
            case 'css':
                return FileType.CSS;
            case 'less':
                return FileType.CSS;
            case 'img':
                return FileType.IMG;
            case 'js':
                return FileType.JS;
            case 'jsx':
                return FileType.JSX;
            case 'html':
                return FileType.TEMPLATE;
            default:
                return FileType.UNKNOWN;
        }
    }

};

//loop project ,return file
help.checkFileType = name => {
    let list = name.split('.');
    if(list.length == 1){
        return FileType.UNKNOWN;
    }else{
        let type = list[list.length - 1];
        switch (type){
            case 'css':
                return FileType.CSS;
            case 'less':
                return FileType.CSS;
            case 'img':
                return FileType.IMG;
            case 'js':
                return FileType.JS;
            case 'jsx':
                return FileType.JSX;
            case 'html':
                return FileType.TEMPLATE;
            default:
                return FileType.UNKNOWN;
        }
    }

};

//loop the whole project to analyse jsxFile
help.loop = (dir, componentPath) =>{
    let resFile = null;
    loopFileList(dir);
    loopDirList(dir);

    //loop file
    function loopFileList(dir) {
        dir.fileList.forEach(function (file) {
            if(file.__route == componentPath){
                resFile = file;
            }
        });
    }

    //loop dir
    function loopDirList(dir) {
        dir.dirList.forEach(function (dir) {
            let res = help.loop(dir, componentPath);
            if(res != null){
                resFile = res;
            }
        });
    }
    return resFile;
};

module.exports = help;
'use strict';

let fs = require('fs');
let colors = require('colors');
let Dir = require('../class/class').Dir;
let Project = require('../class/class').Project;
let File = require('../class/class').File;
let JsxFile = require('../class/class').JsxFile;
let Help = require('../util/help');
let FileType = require('../util/file-type');

let Fs = {};
//loop the whole project
Fs.loop = dir =>{
    let fileNames = fs.readdirSync(dir.__route);
    if(fileNames.length == 0){
        if(dir instanceof Project){
            console.log(colors.red('no file in the project'));
        }
    }else{
        fileNames.forEach(function (value) {
            let fileRoute = dir.__route + '/' + value;
            let stat = fs.statSync(fileRoute);
            if(stat.isDirectory()) {
                let newDir = new Dir(fileRoute,value);
                dir.dirList.push(newDir);
                if(Help.checkUseful(value)){
                    Fs.loop(newDir);
                }
            } else if(stat.isFile()) {
                let file = new File(fileRoute ,value);
                dir.fileList.push(file);
            } else {
                console.log(colors.red('no dir or file'));
            }
        })
    }
}

//add 'type' label to the project..directory..file
Fs.checkType = dir =>{
    let fileType = checkFileList(dir);
    let dirType = checkDirList(dir);
    if(fileType === FileType.EMPTY){
        dir.type = dirType;
    }else{
        if(dirType === FileType.EMPTY){
            dir.type = fileType;
        }else{
            dir.type = fileType === dirType ? fileType : FileType.MIX;
        }
    }
    return dir.type;

    //check file type
    function checkFileList(dir) {
        let typeList = [];
        dir.fileList.forEach(function (value ,index ,array) {
            value.type = Help.checkFileType(value.name);
            if(value.type == FileType.JSX){
                array[index] = new JsxFile(value);
            }
            if(typeList.indexOf(value.type) == -1){
                typeList.push(value.type);
            }
        });
        return returnHelper(typeList);
    }
    //check dir type
    function checkDirList(dir) {
        let typeList = [];
        dir.dirList.forEach(function (value) {
            var type = Fs.checkType(value);
            if(typeList.indexOf(type) == -1){
                typeList.push(type);
            }
        });
        return returnHelper(typeList);
    }
    function returnHelper(typeList) {
        if(typeList.length == 0){
            return FileType.EMPTY;
        }else if(typeList.length == 1){
            return typeList[0];
        }else{
            return FileType.MIX;
        }
    }
}

module.exports = Fs;
#!/usr/bin/env node
'use strict';

var fs = require('fs');
var colors = require('colors');
var Project = require('../class/class').Project;
var Dir = require('../class/class').Dir;
var File = require('../class/class').File;
var Help = require('../util/help');
var FileType = require('../util/file-type');

let project = new Project('/Users/pyf/code/panyifei/analyse','analyse');

//loop the whole project
loop(project);

//add 'type' label to the project..directory..file
checkType(project);

console.log(project);

function loop(dir) {
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
                    loop(newDir);
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

function checkType(dir) {
    let typeList = [];
    if(dir.fileList.length == 0 && dir.dirList.length == 0){
        dir.type = FileType.EMPTY;
        return dir.type;
    }
    if(dir.fileList.length != 0 && dir.dirList.length == 0){
        dir.type = checkFileList(dir);
        return dir.type;
    }
    if(dir.fileList.length == 0 && dir.dirList.length != 0){
        dir.type = checkDirList(dir);
        return dir.type;
    }
    if(dir.fileList.length != 0 && dir.dirList.length != 0){
        let fileType = checkFileList(dir);
        let dirType = checkDirList(dir);
        dir.type = fileType === dirType ? fileType : FileType.MIX;
        return dir.type;
    }
    //check file type
    function checkFileList(dir) {
        let typeList = [];
        dir.fileList.forEach(function (value) {
            value.type = Help.checkFileType(value.name);
            if(typeList.indexOf(value.type) == -1){
                typeList.push(value.type);
            }
        });
        if(typeList.length == 1){
            return typeList[0];
        }else{
            return FileType.MIX;
        }
    }
    //check dir type
    function checkDirList(dir) {
        let typeList = [];
        dir.dirList.forEach(function (value) {
            var type = checkType(value);
            if(typeList.indexOf(type) == -1){
                typeList.push(type);
            }
        });
        if(typeList.length == 1){
            return typeList[0];
        }else{
            return FileType.MIX;
        }
    }
}
#!/usr/bin/env node
'use strict';

var fs = require('fs');
var colors = require('colors');
var Project = require('../class/class').Project;
var Dir = require('../class/class').Dir;
var File = require('../class/class').File;

let project = new Project('/Users/pyf/code/panyifei/analyse');

loop(project);

function loop(dir) {
    let fileNames = fs.readdirSync(dir.__route);
    if(fileNames.length == 0){
        if(dir instanceof Project){
            console.log(colors.red('no file in the project'));
        }
    }else{
        fileNames.forEach(function (value ,index ,array) {
            let fileRoute = dir.__route + '/' + value;
            let stat = fs.statSync(fileRoute);
            if(stat.isDirectory()) {
                let newDir = new Dir(fileRoute);
                dir.dirList.push(newDir);
                loop(newDir);
            } else if(stat.isFile()) {
                let file = new File(fileRoute ,value);
                dir.fileList.push(file);
            } else {
                console.log(colors.red('no dir or file'));
            }
        })
    }
}

//此时遍历了整个文档结构
console.log(project);
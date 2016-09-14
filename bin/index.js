#!/usr/bin/env node
'use strict';

let Project = require('../class/class').Project;

let Fs = require('../util/fs');
let project = new Project('/Users/pyf/code/panyifei/analyse','analyse');

//loop the whole project
Fs.loop(project);

//add 'type' label to the project..directory..file
Fs.checkType(project);

console.log(project);

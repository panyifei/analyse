#!/usr/bin/env node
'use strict';

let open = require('open');
let Project = require('../class/class').Project;
let Server = require('../server/server');
let Analyse = require('../util/anlyse');

let Fs = require('../util/fs');
// let project = new Project('/Users/pyf/code/dianping/orderdish/app-menuorder-h5','app-menuorder-h5');
let project = new Project('/Users/pyf/code/dianping/booking/app-booking-ossweb','app-booking-ossweb');

//loop the whole project
Fs.loop(project);

//add 'type' label to the project..directory..file
//if the file type is "jsx" ,turn the File into jsxFile
Fs.checkType(project);

//analyse jsx file
//get the child component
Analyse.loop(project, project);

//get the index jsxFile
let indexJsxFileList = Analyse.getIndexJsxFile(project);

//start a server and render the project
Server.startServer(project, indexJsxFileList);
open("http://127.0.0.1:3000/");

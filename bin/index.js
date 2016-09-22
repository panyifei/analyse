#!/usr/bin/env node
'use strict';

let open = require('open');
let Project = require('../class/class').Project;
let Server = require('../server/server');
let Analyse = require('../util/anlyse');

let Fs = require('../util/fs');
let project = new Project('/Users/pyf/code/panyifei/analyse','analyse');

//loop the whole project
Fs.loop(project);

//add 'type' label to the project..directory..file
//if the file type is "jsx" ,turn the File into jsxFile
Fs.checkType(project);

Analyse.loop(project);

//start a server and render the project
// Server.startServer(project);
// open("http://127.0.0.1:3000/");

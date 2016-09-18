#!/usr/bin/env node
'use strict';

let open = require('open');
let Project = require('../class/class').Project;
let Server = require('../server/server');

let Fs = require('../util/fs');
let project = new Project('/Users/pyf/code/panyifei/analyse','analyse');

//loop the whole project
Fs.loop(project);

//add 'type' label to the project..directory..file
Fs.checkType(project);

//start a server
Server.startServer(project);

//next ,think about render function
open("http://127.0.0.1:3000/");


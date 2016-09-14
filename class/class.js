'use strict';

class Dir{
    constructor(__route,name) {
        this.__route = __route;
        this.name = name;
        this.type = '';
        this.dirList = [];
        this.fileList = [];
    }
}

class Project extends Dir{
    constructor(__route, name) {
        super(__route, name);
    }
}

class File{
    constructor(__route, name) {
        this.__route = __route;
        this.name = name;
        this.type = '';
    }
}

module.exports = {
    Project : Project,
    Dir : Dir,
    File : File
}
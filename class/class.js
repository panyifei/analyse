'use strict';

class Dir{
    constructor(__route) {
        this.__route = __route;
        this.dirList = [];
        this.fileList = [];
    }
}

class Project extends Dir{
    constructor(__route) {
        super(__route);
    }
}

class File{
    constructor(__route, fileName) {
        this.__route = __route;
        this.type = fileName;
    }
}

module.exports = {
    Project : Project,
    Dir : Dir,
    File : File
}
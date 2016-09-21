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

class JsxFile extends File{
    constructor(file) {
        super(file.__route, file.name);
        this.fatherComponent = null;
        this.childComponent = [];
    }
}

module.exports = {
    Project : Project,
    Dir : Dir,
    File : File,
    JsxFile : JsxFile
}
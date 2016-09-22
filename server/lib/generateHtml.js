'use strict';

let GenerateHtml = {};

GenerateHtml.getProjectHtml = pro => {
    let html = "<section class='project'><p class='name'>" + pro.name + "</p>";
    html += getDirListHtml(pro);
    html += getFileListHtml(pro);
    html += "</section>";
    return html;
    
    function getDirListHtml(dir) {
        let html = "";
        dir.dirList.forEach(function (value) {
            html += "<section class='dir'><p class='name'>" + value.name + "</p>";
            html += getDirListHtml(value);
            html += getFileListHtml(value);
            html += "</section>";
        });
        return html;
    }

    function getFileListHtml(dir) {
        let html = "";
        dir.fileList.forEach(function (file) {
            html += "<div class='file'><p class='name'>" + file.name + "</p></div>";
        });
        return html;
    }
}

GenerateHtml.getJsxFileListsHtml = lists => {
    let html = "";
    lists.forEach(function (file) {
        html += "<section class='jsx-root'><p class='name'>" + file.name + "</p>";
        html += getChildHtml(file);
        html += "</section>";
    })
    return html;
    function getChildHtml(file) {
        let html = "";
        file.childComponent.forEach(function (value) {
            html += "<section class='jsx'><p class='name'>" + value.name + "</p>";
            html += getChildHtml(value);
            html += "</section>";
        })
        return html;
    }
}


module.exports = GenerateHtml;
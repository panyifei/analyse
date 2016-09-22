'use strict';

let koa = require('koa');
let app = koa();
let render = require('./lib/render');
let server = require('koa-static');
const logger = require('koa-logger');

app.use(logger());

app.use(server(__dirname + '/.'));

//代替数据库
let project;
let indexJsxFileList;

//用来得到路径的中间件
let route = require('koa-route');

//路由配置
//一旦触发了/这个路径，就会调用list
app.use(route.get('/', list));

function *list() {
    //对body进行设置就是返回的内容了
    this.body = yield render('index', {
        project: project,
        jsxLists: indexJsxFileList
    });
}

//监听3000端口,这里是可以监听多个端口的

app.startServer = (pro , jsxLists) => {
    project = pro;
    indexJsxFileList = jsxLists;
    app.listen(3000);
};

module.exports = app;

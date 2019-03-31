const koa = require("koa");
const fs = require("fs");
const server = require('koa-static');
const app = new koa();
const path = require('path');

const home = server(path.join(__dirname) + '/public/');

app.use(home);

app.listen(3000);
console.log("app is listing port 3000...,please input localhost:3000/point.html to view");
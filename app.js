const koa = require("koa");
const fs = require("fs");
const server = require('koa-static');
const app = new koa();
const path = require('path');

const home = server(path.join(__dirname) + '/public/');

app.use(home);

app.listen(3000);
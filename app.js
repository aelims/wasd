const express = require('express');
const router = require('./routes');
const sequelize = require('./models').sequelize;
const methodOverride = require('method-override');
const http = require('http');
const cors = require('cors');
const ejs = require("ejs");

var url = require('url');
var fs = require('fs');

// 내방식대로 바꿔서 코딩하는것은 실패 다시 해봐야할 것 새로운 파일을 만들어서 저 방식대로 해보기

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 



app.use(methodOverride());
app.use(cors());
app.engine("html", ejs.renderFile);

var resourcePath='C:\Users\82109\Server\RomanFIrst-1\html';
sequelize.sync();
app.use('/', router);

app.get('/', (req, res) => {
  res.render('video.html');
});
http.createServer(app).listen(5005, () => {
  console.log("Express Server Start");
});


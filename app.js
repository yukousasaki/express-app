//httpの読み込み
var http = require('http');
//expressの読み込み
var express = require('express');
//morganの読み込み（ログ）
var morgan = require('morgan');
//pathの読み込み
var path =  require('path');
//body-parserの読み込み
var bodyParser = require('body-parser');


var app =  express();
//app.setはexpressの設定を行うメソッド
app.set('views',path.join(__dirname,'templates'));
app.set('view engine','ejs');
//pugを使う場合
//app.set('view engine','pug');
app.use(morgan('combined'));

//
app.use('static',
express.static(path.join(__dirname,"static")));

//postリクエストを受け取った時に、その内容をreq.bodyに格納
app.use(bodyParser.urlencoded({extended:false}));

//hello worldを出力する処理
app.get('/',function(req,res){
  
  //return res.send('hello world');

    return res.render('index',{title: "hello world"});

});

//フォームを表示する処理
app.get('/form',function(req,res){
  return  res.render("form");
});

//フォームを受け取って表示する処理
app.post("/form",function(req,res){
  return res.render("result",{username:
  req.body.username,message: req.body.message});
});


//サーバーのインスタンスを作成
/*var server = http.createServer(function(req,res){
  //ヘッダーを記載
  res.writeHead(200,{'ContentType':'text/plain'});
  //具体的なレスポンスを記載
  res.end('HelloWorld');
});*/

var server = http.createServer(app);
//8000ポートでサーバーを起動しリクエストをまつ
server.listen(8000);



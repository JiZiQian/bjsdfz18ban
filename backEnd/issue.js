var http=require("http");
var querystring = require('querystring');
var util = require('util');
var fs=require("fs");
http.createServer(function(req,res){
    var post="";
    req.on("data",function(chunk){
        post+=chunk;
    });
    req.on("end",function(){
        post=querystring.parse(post);
        console.log(post.text);
        var data=fs.readFileSync("issues.txt").toString();
        if(data.indexOf(post.text)){
            data=data+post.text+"\n";
        }
        fs.writeFile("issues.txt",data,function(err){
            if(err) return console.error(err);
        });
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        res.end();
    });
}).listen(1801);//issue board
console.log("Server is completed!");

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
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8","Access-Control-Allow-Origin":"*"});
        if(post.type=="upload"){
            var data=fs.readFileSync("issues.txt").toString();
            var str=post.text;
            console.log(str);
            while(str.indexOf("<")!=-1){
                str=str.substr(0,str.indexOf("<"))+"&lt;"+str.substr(str.indexOf("<")+1);
            }
            while(str.indexOf(">")!=-1){
                str=str.substr(0,str.indexOf(">"))+"&gt;"+str.substr(str.indexOf(">")+1);
            }
            while(str.indexOf("\n")!=-1){
                str=str.substr(0,str.indexOf("\n"))+"<br/>"+str.substr(str.indexOf("\n")+1);
            }
            console.log(str);
            if(data.indexOf(str)==-1){
                data=data+str+"<br/><br/>";
            }
            fs.writeFile("issues.txt",data,function(err){
                if(err) return console.error(err);
            });
            res.end();
        }
        if(post.type=="getIssues"){
            console.log("getIssues");
            var data=fs.readFileSync("issues.txt").toString();
            console.log(data);
            res.end(data);
        }
    });
}).listen(1801);//issue board
console.log("Server is completed!");

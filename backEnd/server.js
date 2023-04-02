var http=require("http");
var querystring = require('querystring');
var fs=require("fs");
function replace(str,fd,to){
    while(str.indexOf(fd)!=-1){
        str=str.substr(0,str.indexOf(fd))+to+str.substr(str.indexOf(fd)+fd.length);
    }
    return str;
}
http.createServer(function(req,res){
    var post="";
    req.on("data",function(chunk){
        post+=chunk;
    });
    req.on("end",function(){
        post=querystring.parse(post);
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8","Access-Control-Allow-Origin":"*"});
        if(post.mode=="issue"){
            if(post.type=="upload"){
                var issue=require("./issue");
                issue.init('127.0.0.1','root','','Server18');
                res=issue.upload(post,res,replace);
                issue.close();
                res.end();
            }
            if(post.type=="getIssues"){
                console.log("getIssues");
                var mysql=require("./MySQLCURD");
                mysql.init('127.0.0.1','root','','Server18');
                var data="";
                var x=mysql.query('Issues','',function(err,result){
                    if(err){
                        console.log("error "+err.message);
                        return;
                    }
                    for(var i=0;i<result.length;i++){
                        data+='<div id=\"texts\" style=\"background-color:#f1f1f1;border-width:10px 10px 0px 10px;border-style:solid;border-color:#ffffff;padding:1%;border-radius:25px;text-align:left\">'+result[i].issue+'</div>'
                    }
                    res.end(data);
                    mysql.close();
                });
            }
        }
    });
}).listen(18666);//issue board
console.log("Server is completed!");

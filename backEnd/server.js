var http=require("http");
var querystring = require('querystring');
var fs=require("fs");
var mysql=require("./MySQLCURD");
mysql.init('localhost','root','jzq20100505','IssuesBoard');
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
        if(post.type=="upload"){
            var str=post.text;
            console.log("upload");
            str=replace(str,"<","&lt;");
            str=replace(str,">","&gt;");
            str=replace(str,"\n","<br/>");
            str=replace(str,"\'","&#39;");
            str=replace(str,"\"","&quot;");
            console.log(str);
            mysql.insert('Issues','id,issue','0,\"'+str+'\"',function(err,res){
                if(err){
                    console.log("error "+err.message);
                    return;
                }
                console.log(res);
            });
            res.end();
        }
        if(post.type=="getIssues"){
            console.log("getIssues");
            var data="";
            var x=mysql.query('Issues','',function(err,result){
                if(err){
                    console.log("error "+err.message);
                    return;
                }
                for(var i=0;i<result.length;i++){
                    data+='<div id=\"texts\" style=\"background-color:#f1f1f1;border:10px solid #ffffff;padding:1%;border-radius:25px;text-align:left\">'+result[i].issue+'</div>'
                }
                res.end(data);
            })
        }
    });
}).listen(1801);//issue board
console.log("Server is completed!");

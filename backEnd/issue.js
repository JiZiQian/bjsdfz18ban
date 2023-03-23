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
        if(post.type=="upload"){
            var data=fs.readFileSync("issues.txt").toString();
            var str=post.text;
            str=replace(str,"<","&lt;");
            str=replace(str,">","&gt;");
            str=replace(str,"\n","<br/>");
            str=replace(str,"\'","&#39;");
            str=replace(str,"\"","&quot;");
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

var http=require("http");
var querystring = require('querystring');
const { markAsUntransferable } = require("worker_threads");
const { isTypedArray } = require("util/types");
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
        else if(post.mode=="users"){
            var mysql=require("./MySQLCURD");
            mysql.init('127.0.0.1','root','','Server18');
            if(post.type=="signUp"){
                mysql.query('Users','WHERE user=\"'+post.user+'\"',function(err,result){
                    console.log(result);
                    if(err||!result.length){
                        mysql.insert('Users','id,user,pswd','0,\"'+post.user+'\",\"'+post.password+'\"',function(err,result2){
                            if(err){
                                console.log("error "+err.message);
                                return;
                            }
                            res.end("注册成功！");
                            mysql.close();
                        });
                    }
                    else{
                        res.end("失败：用户已存在");
                    }
                });
            }
            if(post.type=="signIn"){
                mysql.query('Users','WHERE user=\"'+post.user+'\" AND pswd=\"'+post.password+'\"',function(err,result){
                    console.log(result);
                    if(err||!result.length){
                        res.end("-1");
                    }
                    else{
                        res.end(result[0].id+" "+result[0].user);
                    }
                })
            }
        }
        else{
            res.end();
        }
    });
}).listen(18666);
console.log("Server is completed!");

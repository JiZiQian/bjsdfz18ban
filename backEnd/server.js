var http=require("http");
var querystring = require('querystring');
const { markAsUntransferable } = require("worker_threads");
const { isTypedArray } = require("util/types");
function replace(str,fd,to){
    let i=0;
    while(str.indexOf(fd,i)!=-1){
        let t=str.indexOf(fd,i)+to.length;
        str=str.substr(0,str.indexOf(fd,i))+to+str.substr(str.indexOf(fd,i)+fd.length);
        i=t;
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
        if(post.mode=="issue"){
            res.writeHead(200,{"Content-Type":"text/html;charset=utf-8","Access-Control-Allow-Origin":"*"});
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
                mysql.query('Issues','',async function(err,result){
                    console.log(result);
                    if(err||!result.length){
                        console.log("issues empty");
                        return;
                    }
                    for(var i=0;i<result.length;i++){
                        console.log(i);
                        console.log(result);
                        console.log(result[i]);
                        await new Promise(function(r){
                            console.log(i);
                            console.log(result[i]);
                            console.log(result[i].userid);
                            mysql.query('Users','WHERE id='+result[i].userid,function(err,result2){
                                console.log(result2);
                                if(err||!result2.length){
                                    console.log("user undefined");
                                }
                                else{
                                    console.log(i);
                                    console.log(result);
                                    console.log(result[i]);
                                    data+='<p class=\"userName\">'+result2[0].user+':</p>';
                                    data+='<div class=\"texts\" style=\"background-color:#f1f1f1;border-width:0px 10px 10px 10px;border-style:solid;border-color:#ffffff;padding:1%;border-radius:25px;text-align:left\">'+result[i].issue+'</div>';
                                }
                                r();
                            });
                        });
                    }
                    res.end(data);
                    mysql.close();
                });
            }
        }
        else if(post.mode=="users"){
            res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8","Access-Control-Allow-Origin":"*"});
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
                        mysql.close();
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
                    mysql.close();
                })
            }
            if(post.type=="check"){
                mysql.query('Users','WHERE user=\"'+post.user+'\"',function(err,result){
                    console.log(result);
                    if(err||!result.length){
                        res.end("-1");
                    }
                    else{
                        res.end("1");
                    }
                    mysql.close();
                })
            }
        }
        else if(post.mode=="blog"){
            res.writeHead(200,{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Origin":"*"});
            var mysql=require("./MySQLCURD");
            mysql.init('127.0.0.1','root','','Server18');
            if(post.type=="get"){
                let arr=[];
                mysql.query("Blogs","",async function(err,result){
                    if(err){
                        console.log("error "+err);
                        return;
                    }
                    if(!result.length){
                        return;
                    }
                    for(let i=0;i<result.length;i++){
                        await new Promise(function(r){
                            mysql.query("Users","WHERE id="+result[i].userid,function(err,result2){
                                if(err||!result2.length){
                                    r();
                                }
                                let blog=new Object();
                                blog.user=result2[0].user;
                                blog.title=result[i].title;
                                blog.id=result[i].id;
                                arr.push(blog);
                                r();
                            });
                        });
                    }
                    mysql.close();
                    res.end(JSON.stringify(arr));
                });
            }
            if(post.type=="upload"){
                mysql.insert("Users","id,title,blog,userid","0,\""+post.title+"\",\""+post.blog+"\","+post.userid,function(err,result){
                    if(err){
                        console.log("error "+err);
                        return;
                    }
                    console.log(result);
                    res.end("");
                    mysql.close();
                });
            }
        }
        else{
            res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8","Access-Control-Allow-Origin":"*"});
            res.end();
        }
    });
}).listen(18666);
console.log("Server is completed!");

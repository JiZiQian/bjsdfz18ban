var http=require("http");
var querystring = require('querystring');
const { markAsUntransferable } = require("worker_threads");
const { isTypedArray } = require("util/types");
var user2users=require("./user2users");
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
                        res.end("");
                        mysql.close();
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
            console.log()
            if(post.type=="get"){
                let arr=[];
                mysql.query("Blogs","",async function(err,result){
                    if(err||!result.length){
                        res.end(JSON.stringify(arr));
                        mysql.close();
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
                let data=replace(post.blog,"\'","&#39;");
                data=replace(data,"\"","&quot;");
                data=replace(data,"<","&lt;");
                data=replace(data,">","&gt;");
                let str=replace(post.title,"\'","&#39;");
                str=replace(str,"\"","&quot;");
                str=replace(str,"<","&lt;");
                str=replace(str,">","&gt;");
                let t='0,\"'+str+'\",\"'+data+'\",'+post.userid;
                t=t.replace(/\\/g,"\\\\");
                mysql.insert("Blogs","id,title,blog,userid",t,function(err,result){
                    if(err){
                        console.log("error "+err);
                        res.end("");
                        mysql.close();
                        return;
                    }
                    console.log(result);
                    res.end("");
                    mysql.close();
                });
            }
            if(post.type=="content"){
                let id=post.id;
                mysql.query("Blogs","WHERE id="+id,function(err,result){
                    if(err||!result.length){
                        console.log("empty result!");
                        res.end(JSON.stringify({err:true}));
                        mysql.close();
                        return;
                    }
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));
                    mysql.close();
                });
            }
        }
        else if(post.mode=="Chinese"){
            res.writeHead(200,{"Content-Type":"text/html;charset=utf-8","Access-Control-Allow-Origin":"*"});
            var fs=require("fs");
            var data = fs.readFileSync('/Users/xiaoxinwu/www/back18/bjsdfz18ban/backEnd/words.txt');
            data=data.toString();
            let b=0;
            var lines=new Array();
            for(let i=0;i<data.length;i++){
                if(data[i]=='\n'){
                    lines.push(data.substring(b,i));
                    b=i+1;
                }
            }
            if(b<data.length) lines.push(data.substring(b));
            console.log(lines);
            let t=Math.min(Math.floor(Math.random()*(lines.length)),lines.length-1);
            res.end(lines[t]);
        }
        else if(post.mode=="forum"){
            res.writeHead(200,{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Origin":"*"});
            if(post.type=="upload"){
                var issue=require("./forum");
                issue.init('127.0.0.1','root','','Server18');
                res=issue.upload(post,res,replace);
                issue.close();
                res.end();
            }
            if(post.type=="getForums"){
                console.log("getForums");
                var mysql=require("./MySQLCURD");
                mysql.init('127.0.0.1','root','','Server18');
                var data="";
                mysql.query('Forum','',async function(err,result){
                    console.log(result);
                    if(err||!result.length){
                        console.log("issues empty");
                        res.end("");
                        mysql.close();
                        return;
                    }
                    for(var i=0;i<result.length;i++){
                        console.log(i);
                        console.log(result);
                        console.log(result[i]);
                        let arr=[];
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
                                    let forum=new Object();
                                    forum.user=result2[0].user;
                                    forum.content=result[i].issue;
                                    arr.push(forum);
                                    // data+='<p class=\"userName\">'+result2[0].user+':</p>';
                                    // data+='<div class=\"texts\" style=\"background-color:#f1f1f1;border-width:0px 10px 10px 10px;border-style:solid;border-color:#ffffff;padding:1%;border-radius:25px;text-align:left\">'+result[i].issue+'</div>';
                                }
                                r();
                            });
                        });
                    }
                    res.end(JSON.stringify(arr));
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

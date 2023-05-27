exports.main=function(post,res){
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
                mysql.close();
            }
            else{
                mysql.query('UserToken','WHERE id='+result[0].id,function(err,result2){
                    let rand=Math.round(Math.random()*10000000);
                    if(err||!result2.length){
                        mysql.insertallcolumn('UserToken',[result[0].id,rand],function(err,result3){
                            res.end(result[0].id+" "+rand);
                            mysql.close();
                        });
                    }
                    else{
                        mysql.update('UserToken',['token'],[rand],['id='+result[0].id],function(err,result3){
                            res.end(result[0].id+" "+rand);
                            mysql.close();
                        });
                    }
                });
            }
        })
    }
    if(post.type=="check"){
        mysql.query('UserToken','WHERE id='+post.id+' AND token='+post.token,function(err,result){
            console.log(result);
            if(err||!result.length){
                res.end("-1");
                mysql.close();
            }
            else{
                mysql.query('Users','WHERE id='+post.id,function(err,result2){
                    res.end(result2[0].user);
                    mysql.close();
                });
            }
        })
    }
}
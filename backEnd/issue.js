var mysql=require('./MySQLCURD');
exports.init=function(hst,usr,pswd,dtbs){
    mysql.init(hst,usr,pswd,dtbs);
};
exports.upload=function(post,res,replace){
    var str=post.text;
    console.log("upload");
    str=replace(str,"<","&lt;");
    str=replace(str,">","&gt;");
    // str=replace(str,"\n","\n<br/>");
    str=replace(str,"\'","&#39;");
    str=replace(str,"\"","&quot;");
    console.log(str);
    console.log('0,\"'+str+'\",'+post.userid);
    let t='0,\"'+str+'\",'+post.userid;
    t=t.replace(/\\/g,"\\\\");
    mysql.insert('Issues','id,issue,userid',t,function(err,res){
        if(err){
            console.log("error "+err.message);
            return;
        }
        console.log(res);
    });
    return res;
};
exports.close=function(){
    mysql.close();
}
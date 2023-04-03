var mysql=require('mysql');
var connection;
exports.init=function(hst,usr,pswd,dtbs){
    connection=mysql.createConnection({
        host:hst,user:usr,password:pswd,database:dtbs
    });
    connection.connect();
}
exports.query=function(table,add,callback){
    connection.query('SELECT * FROM '+table+' '+add,callback);
};
exports.query2=function(column,table,add,callback){
    connection.query('SELECT '+column+' FROM '+table+' '+add,callback);
};
exports.insert=function(table,title,content,callback){
    connection.query('INSERT INTO '+table+' ('+title+') VALUES ('+content+')',callback);
};
exports.update=function(table,content,where,callback){
    connection.query('UPDATE '+table+' SET '+content+' '+add,callback);
};
exports.delete=function(table,where,callback){
    connection.query('DELETE '+table+' '+where,callback);
};
exports.close=function(){
    connection.end();
}
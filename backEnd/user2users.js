var Rooms=new Array();
var emptyRooms=new Array();
exports.getNRoomId=function(){
    if(emptyRooms.length>0){
        var temp=emptyRooms[emptyRooms.length-1];
        emptyRooms.pop();
        return temp;
    }
    Rooms.push(new Array());
    return Rooms.length-1;
}
exports.delRoom=function(roomid){
    Rooms[roomid]=new Array();
    emptyRooms.push(roomid);
}
exports.transmit=function(roomid,userid,packet){
    for(var i=0;i<Rooms[roomid].length;i++){
        Rooms[roomid][i].end(packet);
    }
}
exports.getNUserId=function(roomid){
    Rooms[roomid].push(114514);
}
exports.reconnect=function(roomid,userid,res){
    Rooms[roomid][userid]=res;
}
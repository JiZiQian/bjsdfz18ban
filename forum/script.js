let forums;
let stack=[0];
function _search(user,content,id,fa){
    document.getElementById("forums").innerHTML="";
    console.log(user);
    console.log(content);
    console.log(id);
    for(let i=0;i<forums.length;i++){
        console.log(forums[i]);
        if(forums[i].user.indexOf(user)!=-1&&forums[i].content.indexOf(content)!=-1&&(forums[i].id==id||id=="")&&(forums[i].fa==fa||forums[i].id==fa)){
            console.log("insert");
            document.getElementById("forums").innerHTML+='<p class=\"userName\">'+forums[i].user+':</p>';
            document.getElementById("forums").innerHTML+='<div class=\"texts\" style=\"background-color:#f1f1f1;border-width:0px 10px 10px 10px;border-style:solid;border-color:#ffffff;padding:1%;border-radius:25px;text-align:left\" onclick=\"findComment('+forums[i].id+')\">'+forums[i].content+'</div>';
        }
    }
}
function findComment(fa){
    stack.push(fa);
    _search("","","",fa);
}
function b(){
    if(stack.length>1) stack.pop();
    _search("","","",stack[stack.length-1]);
}
function search(){
    let user=document.getElementById("userselect").value;
	let content=document.getElementById("contents").value;
    let id=document.getElementById("id").value;
    _search(user,content,id,0);
}
function getstr(){
    init();
    let ajax;
    if(window.XMLHttpRequest) ajax=new XMLHttpRequest();
    else ajax=new ActiveXObject("Microsoft.XMLHTTP");
    ajax.open("POST",httpBackEnd,false);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");
    ajax.send("mode=forum&type=getForums");
    forums=JSON.parse(ajax.responseText);
    console.log(forums);
    _search("","","",0);
}
function poststr(){
    let text=document.getElementById("paragraph").value;
    if(text.replace(/\s/g,"").length==0){
        alert("不能发送空消息！");
        return;
    }
    if(signed==false){
        alert("请先登录！");
        return;
    }
    init();
    let ajax;
    if(window.XMLHttpRequest) ajax=new XMLHttpRequest();
    else ajax=new ActiveXObject("Microsoft.XMLHTTP");
    ajax.open("POST",httpBackEnd,false);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");
    var packet=new Object();
    packet.mode="forum";
    packet.text=text;
    packet.type="upload";
    packet.userid=ckie[1].substr(ckie[1].indexOf("=")+1);
    // ajax.setRequestHeader("Access-Control-Allow-Headers","*");
    ajax.send("mode=forum&text="+text+"&type=upload&userid="+ckie[1].substr(ckie[1].indexOf("=")+1)+"&fa="+location.href.substr(location.href.indexOf("?fa=")+4));
    document.getElementById("submit").innerHTML="COMPLETE!";
    document.getElementById("submit").onclick="";
}
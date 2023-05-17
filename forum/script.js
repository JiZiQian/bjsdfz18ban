let forums;
function search(){
	let user=document.getElementById("userselect").value;
	let content=document.getElementById("content").value;
    let id=document.getElementById("id").value;
    document.getElementById("forums").innerHTML="";
    for(let i=0;i<forums.length;i++){
        if(forums[i].user.indexOf(user)!=-1&&forums[i].content.indexOf(content)!=-1&&(forums[i].id==id||id=="")){
            document.getElementById("formus").innerHTML+='<p class=\"userName\">'+forums[i].user+':</p>';
            document.getElementById("formus").innerHTML+='<p class=\"userName\">编号：'+forums[i].id+':</p>';
            document.getElementById("formus").innerHTML+='<div class=\"texts\" style=\"background-color:#f1f1f1;border-width:0px 10px 10px 10px;border-style:solid;border-color:#ffffff;padding:1%;border-radius:25px;text-align:left\">'+forums[i].content+'</div>';
        }
    }
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
    search();
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
    ajax.send("mode=forum&text="+text+"&type=upload&userid="+ckie[1].substr(ckie[1].indexOf("=")+1));
}
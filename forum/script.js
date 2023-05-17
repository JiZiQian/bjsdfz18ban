let forums;
function search(){
	let user=document.getElementById("userselect").value;
	let content=document.getElementById("content").value;
    let id=document.getElementById("id").value;
    document.getElementById("forums").innerHTML="";
    for(let i=0;i<forums.length;i++){
        if(forums[i].user.indexOf(user)!=-1&&forums[i].content.indexOf(content)!=-1&&(forums[i].id==id||id=="")){
            document.getElementById("formus").innerHTML+='<p class=\"userName\">'+forums[i].user+':</p>';
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
    search();
}
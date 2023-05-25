let ckie=document.cookie.split(";");
let signed;
function getckieuid(){
    let i=0;
    while(i<ckie.length&&ckie[i].indexOf("uid")==-1) i++;
    return ckie[i].substr(ckie[i].indexOf("=")+1);
}
function getckietoken(){
    let i=0;
    while(i<ckie.length&&ckie[i].indexOf("token")==-1) i++;
    return ckie[i].substr(ckie[i].indexOf("=")+1);
}
function show(){
    document.getElementById("user").innerHTML="<button id=\"userName\" class=\"userName\" onclick=\"logOut()\" onmouseout=\"hide()\" style=\"height:auto;width:auto;position:absolute;top:10px;right:10px;\">登出</button>";
}
function hide(){
    document.getElementById("user").innerHTML="<p id=\"userName\" class=\"userName\" onmouseover=\"show()\" style=\"position:absolute;top:10px;right:10px;\"></p>";
    let i=0;
    while(i<ckie.length&&ckie[i].indexOf("token")==-1) i++;
    document.getElementById("userName").innerHTML=ckie[i].substr(ckie[i].indexOf("=")+1);
}
function logOut(){
    document.cookie="User=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    document.cookie="uid=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    window.location.reload();
}
function check(){
    init();
    let ajax;
    if(window.XMLHttpRequest) ajax=new XMLHttpRequest();
    else ajax=new ActiveXObject("Microsoft.XMLHTTP");
    ajax.open("POST",httpBackEnd,false);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send("mode=users&type=check&token="+getckietoken()+"&id="+getckieuid());
    res=ajax.responseText;
    console.log(res);
    if(res=="-1"){
        return false;
    }
    else{
        return true;
    }
}
function userInit(){
    console.log(ckie);
    if(ckie.length==1||check()==false){
        signed=false;
        document.getElementById("user").innerHTML="<a href=\"https://jiziqian.github.io/bjsdfz18ban/signIn\" class=\"userName\" style=\"text-decoration:none;color:black;border:2px solid black;border-radius:10px;padding:5px;position:absolute;top:10px;right:10px;\">登录</a>";
    }
    else{
        signed=true;
        hide();
    }
}
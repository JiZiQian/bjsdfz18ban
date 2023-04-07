let ckie=document.cookie.split(";");
let signed;
function show(){
    document.getElementById("user").innerHTML="<button id=\"userName\" onclick=\"logOut()\" onmouseout=\"hide()\" style=\"height:auto;width:auto;\">登出</button>";
}
function hide(){
    document.getElementById("user").innerHTML="<p id=\"userName\" class=\"userName\" onmouseover=\"show()\"></p>";
    document.getElementById("userName").innerHTML=ckie[0].substr(ckie[0].indexOf("=")+1);
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
    ajax.send("mode=users&type=check&user="+ckie[0].substr(ckie[0].indexOf("=")+1));
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
        document.getElementById("user").innerHTML="<a href=\"https://jiziqian.github.io/bjsdfz18ban/signIn\" id=\"userName\" style=\"text-decoration:none;color:black;border:2px solid black;border-radius:10px;padding:5px;\">登录</a>";
    }
    else{
        signed=true;
        hide();
    }
}
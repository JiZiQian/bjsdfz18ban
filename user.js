let ckie=document.cookie.split(";");
function show(){
    document.getElementById("user").innerHTML="<button id=\"userName\" onclick=\"logOut()\" onmouseout=\"hide()\" style=\"height:25px;width:60px;\">登出</button>";
}
function hide(){
    document.getElementById("user").innerHTML="<h3 id=\"userName\" onmouseover=\"show()\"></h3>";
    document.getElementById("userName").innerHTML=ckie[0].substr(ckie[0].indexOf("=")+1);
}
function logOut(){
    document.cookie="User=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    document.cookie="uid=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    window.location.reload();
}
function userInit(){
    console.log(ckie);
    if(ckie.length==1){
        document.getElementById("user").innerHTML="<a href=\"https://jiziqian.github.io/signIn\">登录</a>";
    }
    else{
        hide();
    }
}
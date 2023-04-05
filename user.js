let isOn=0;
function show(){
    document.getElementById("logOut").style.visibility="visible";
}
function hide(){
    if(isOn==1) return;
    document.getElementById("logOut").style.visibility="hidden";
}
function logOut(){
    document.cookie="User=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    document.cookie="uid=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    window.location.reload();
}
function show2(){
    isOn=1;
}
function hide2(){
    isOn=0;
}
function userInit(){
    let ckie=document.cookie.split(";");
    console.log(ckie);
    if(ckie.length==0){
        document.getElementById("user").innerHTML="<a href=\"https://jiziqian.github.io/signIn\">登录</a>";
    }
    else{
        document.getElementById("user").innerHTML="<p id=\"userName\" onmouseover=\"show()\" onmouseout=\"hide()\"></p><button class=\"logOut\" id=\"logOut\" onclick=\"logOut()\" onmouseover=\"show2()\" onmouseout=\"hide2()\">登出</button>";
        hide();
        document.getElementById("userName").innerHTML=ckie[0].substr(ckie[0].indexOf("=")+1);
        document.getElementById("logOut").style.top=document.getElementById("userName").clientHeight+"px";
    }
}
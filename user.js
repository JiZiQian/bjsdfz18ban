let ckie=document.cookie.split(";");
function show(){
    document.getElementById("user").innerHTML="<button id=\"userName\" onclick=\"logOut()\" onmouseout=\"hide()\" style=\"height:auto;width:auto;\">登出</button>";
}
function hide(){
    document.getElementById("user").innerHTML="<p id=\"userName\" onmouseover=\"show()\" style=\"font-style:italic;\"></p>";
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
        document.getElementById("user").innerHTML="<a href=\"https://jiziqian.github.io/bjsdfz18ban/signIn\" id=\"userName\" style=\"text-decoration:none;color:black;border:2px solid black;border-radius:10px;padding:5px;\">登录</a>";
    }
    else{
        hide();
    }
}
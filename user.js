function show(){
    document.getElementById("logOut").style.visibility="visible";
}
function hide(){
    document.getElementById("logOut").style.visibility="hidden";
}
function logOut(){
    document.cookie="User=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    document.cookie="uid=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
}
let ckie=document.cookie.split(";");
console.log(ckie);
if(ckie.length==0){
    document.getElementById("user").innerHTML="<a href=\"https://jiziqian.github.io/signIn\"></a>";
}
else{
    document.getElementById("user").innerHTML="<p id=\"userName\" onmouseover=\"show();\"></p><button onmouseout=\"hide()\" class=\"logOut\" id=\"logOut\" onclick=\"logOut()\">登出</button>";
    hide();
    document.getElementById("userName").innerHTML=ckie[0].substr(ckie[0].indexOf("=")+1);
}
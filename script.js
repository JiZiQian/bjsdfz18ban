let httpBackEnd;
function init(){
    let ajaxHttp;
    if(window.XMLHttpRequest) ajaxHttp=new XMLHttpRequest();
    else ajaxHttp=new ActiveXObject("Microsoft.XMLHTTP");
    ajaxHttp.onreadystatechange=function(){
        httpBackEnd=ajaxHttp.responseText;
    }
    ajaxHttp.open("GET","https://wchengk09.github.io/domain/18666.txt?t="+Math.random(),true);
    ajaxHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajaxHttp.send();
}
let httpBackEnd;
function init(){
    let ajaxHttp;
    if(window.XMLHttpRequest) ajaxHttp=new XMLHttpRequest();
    else ajaxHttp=new ActiveXObject("Microsoft.XMLHTTP");
    ajaxHttp.open("GET","https://wchengk09.github.io/domain/18666.txt?t="+Math.random(),false);
    ajaxHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajaxHttp.send();
    httpBackEnd=ajaxHttp.responseText;
}
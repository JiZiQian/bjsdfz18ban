var datas =[
    ["京","北京","北京市"],
    ["沪","上海","上海市"],
    ["渝","重庆","重庆市"],
    ["津","天津","天津市"],
    ["冀","石家庄","河北省"],
    ["豫","郑州","河南省"],
    ["鄂","武汉","湖北省"],
    ["湘","长沙","湖南省"],
    ["桂","南宁","广西壮族自治区"],
    ["粤","广州","广东省"],
    ["黑","哈尔滨","黑龙江省"],
    ["吉","长春","吉林省"],
    ["辽","沈阳","辽宁省"],
    ["内蒙古","呼和浩特","内蒙古自治区"],
    ["新","乌鲁木齐","新疆维吾尔自治区"],
    ["藏","拉萨","西藏自治区"],
    ["青","西宁","青海省"],
    ["甘、陇","兰州","甘肃省"],
    ["川、蜀","成都","四川省"],
    ["云、滇","昆明","云南省"],
    ["贵、黔","贵阳","贵州省"],
    ["晋","太原","山西省"],
    ["鲁","济南","山东省"],
    ["陕、秦","西安","陕西省"],
    ["苏","南京","江苏省"],
    ["浙","杭州","浙江省"],
    ["皖","合肥","安徽省"],
    ["闽","福州","福建省"],
    ["琼","海口","海南省"],
    ["宁","银川","宁夏回族自治区"],
    ["港","香港","香港特别行政区"],
    ["澳","澳门","澳门特别行政区"],
    ["赣","南昌","江西省"],
    ["台","台北","台湾省"]
];
var temp = [];
var crtdata = [];
var mode = -1;
var i = 0;
function reset(){
    mode = -1;
    i = 0;
    for(let j=0;j<datas.length;j++){
        temp[j]=datas[j];
     }
}
function getData(){
    var cnt = 34;
    while(cnt > 0){
        var j = Math.floor(Math.random()*cnt);
        var tmp = temp.splice(j,1)[0];
        crtdata[cnt-1] = tmp;
        cnt = cnt - 1;
    }
}
function getMode(){
    let rad = document.getElementsByName("mode");
    if(rad[0].checked)mode = 0;
    else if(rad[1].checked)mode = 1;
    else if(rad[2].checked)mode = 2;
}
function nextData(){
    getMode();
    if(i>33){
        document.getElementById("full").innerText = "END";
        document.getElementById("zipped").innerText = "END";
        document.getElementById("city").innerText = "END";
        return;
    }
    document.getElementById("full").innerText = "";
    document.getElementById("zipped").innerText = "";
    document.getElementById("city").innerText = "";
    var s1 = crtdata[i][0];
    var s2 = crtdata[i][1];
    var s3 = crtdata[i][2];
    if(mode===0)document.getElementById("full").innerText = s3;
    else if(mode===1)document.getElementById("zipped").innerText = s1;
    else if(mode===2)document.getElementById("city").innerText = s2;
    i = i + 1;
}
function showData(){
    var s1 = crtdata[i-1][0];
    var s2 = crtdata[i-1][1];
    var s3 = crtdata[i-1][2];
    document.getElementById("full").innerText = s3;
    document.getElementById("zipped").innerText = s1;
    document.getElementById("city").innerText = s2;
}


function Start(){
    reset();
    getData();
    getMode();
    nextData();
    document.getElementById("start").innerText = "重新开始";
}

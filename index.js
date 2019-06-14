function showFillInfo() {
    document.getElementById("bcFillInfoMask_add").style.visibility="visible"//显
}
function hideFillInfo() {
    document.getElementById("bcFillInfoMask").style.visibility="hidden"
}
//从文件中获取数据
function getFileData(url) {
    return new Promise(function (resolve, reject) {
            $(document).ready(function() {
                $.ajax({
                    url: url,
                    async: false,
                    success: function (data) {
                        resolve(data);
                    },
                    fail: function (res) {
                        reject(res);
                    }
                })
            });
        }
    )
}
//将json格式的数据储存到LocalStorage里
function storeJson(json, str_name) {
    var string = JSON.stringify(json);
    localStorage.setItem(str_name, string);
}

//获取LocalStorage里的json数据
function getLocalStorage(str_name) {
    console.log(str_name);
    return JSON.parse(localStorage.getItem(str_name));
}
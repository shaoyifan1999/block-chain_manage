var wrapper = new Vue({
    el: '.wrapper',
    data: {
        showItems:[],
        crtPage:1,
        allItem:[],
        show:false,
        selected:{},
        index:-1,
        todo:{},
        page:"bill",
        dataUrl:"data/应收账款.json",
        deleteView:false
    },
    created:function() {
        document.getElementById("bcFillInfoMask").style.visibility="visible";
    },
    mounted:function () {
        var urlpara = this.parseToken();
        if (urlpara.token!=undefined){
            storeJson(urlpara,"urlpara");
        }
        console.log("creating");
        var self = this;
        var url = this.dataUrl;
        //如果没有读取过Json文件，那么获取本地文件的JSON数据并通过promise的异步操作，双向绑定到items中,并储存到LocalStorage
        if (getLocalStorage(this.page)===null) {
            getFileData(url).then(function (res) {
                console.log(res);
                self.showItems = res.data;
                //储存到LocalStorage中
                storeJson(res.data,self.page);
            }).catch(function (err) {
                console.log(err);
            })
        }
        //否则读取浏览器缓存
        else {
            console.log("getting localStorage");
            this.showItems = getLocalStorage(this.page);
        }
    },
    methods:{
        parseToken:function(){
            var url = location.search;//获取页面所在路径
            //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);  //获取到路径携带的信息
                strs = str.split("&"); //将携带信息分成一个数组(未知多少信息)
                for(var i = 0; i < strs.length; i ++) {
                    //theRequest[属性名]==值  组装成对象
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  //unescape()对通过 escape() 编码的字符串进行解码
                }
            }
            console.log(theRequest);
            return theRequest;
        },
        judgeData:function(json){
            var length = 0;
            if (json==null)
            {
                alert("输入不合法");
                return false;
            }
            for( var key in json ){
                length++;
                if (json[key]==""||json[key]==null) {
                    alert("输入不合法");
                    return false;
                }
            }
            if (length==0){
                return false;
                alert("输入不合法");
            }
            return true;
        },
        showFillInfo: function(index) {
            this.index = index;
            this.selected =JSON.parse(JSON.stringify(this.showItems[index]));
            console.log(this.selected);
            this.show = true;
            console.log(this.show);
        },
        hideFillInfo_add: function() {
            document.getElementById("bcFillInfoMask_add").style.visibility="hidden";
        },
        cancel:function () {
            this.index = -1;
            this.selected = null;
            this.show = false;
        },
        confirm:function () {
            if (this.judgeData(this.selected)){
                this.showItems[this.index] = this.selected;
                console.log(this.showItems);
                storeJson(this.showItems,this.page);
                this.index = -1;
                this.selected = null;
                this.show = false;
            }
        },
        add_confirm:function () {
            if (this.judgeData(this.todo)) {
                this.showItems.push(this.todo);
                storeJson(this.showItems, this.page);
                this.index = -1;
                this.todo = null;
                this.show = false;
            }
        },
        deleteItem:function (index) {
            this.index = index;
            this.deleteView = true;

        },
        deleteConfirm:function () {
            this.selected =JSON.parse(JSON.stringify(this.showItems[this.index]));
            console.log(this.selected.ID);
            for (var i = 0; i < this.showItems.length; ++i) {
                if (this.showItems[i].ID == this.selected.ID) {
                    this.showItems.splice(i,1);
                    i--;
                }
            }
            this.deleteView = false;
            storeJson(this.showItems,this.page);
            this.index = -1;
            this.selected = null;
        },
        deleteCancel:function () {
            this.deleteView = false;
            this.index = -1;
            this.selected = null;
        }
    }
});
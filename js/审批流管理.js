var wrapper = new Vue({
    el: '.wrapper',
    data: {
        showItems:[],
        crtPage:1,
        allItem:[],
        show:false,
        selected:{},
        index:-1,
        todo:{}
    },
    created:function() {
        document.getElementById("bcFillInfoMask").style.visibility="visible";
    },
    mounted:function () {
        console.log("creating");
        var self = this;
        var url = "data/审批流管理.json";
        //如果没有读取过Json文件，那么获取本地文件的JSON数据并通过promise的异步操作，双向绑定到items中,并储存到LocalStorage
        if (getLocalStorage("checkFlow")==null) {
            console.log("fuck");
            getFileData(url).then(function (res) {
                console.log(res);
                self.showItems = res.data;
                //储存到LocalStorage中
                storeJson(res.data,"checkFlow");
            }).catch(function (err) {
                console.log(err);
            })
        }
        //否则读取浏览器缓存
        else {
            console.log("getting localStorage");
            this.showItems = getLocalStorage("checkFlow");
        }
    },
    methods:{
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
            this.showItems[this.index] = this.selected;
            console.log(this.showItems);
            storeJson(this.showItems,"checkFlow");
            this.index = -1;
            this.selected = null;
            this.show = false;
        },
        add_confirm:function () {
            this.showItems.push(this.todo);
            storeJson(this.showItems,"checkFlow");
            this.index = -1;
            this.todo = null;
            this.show = false;
        },
        deleteItem:function (index) {
            this.index = index;
            this.selected =JSON.parse(JSON.stringify(this.showItems[index]));
            console.log(this.selected.ID);
            for (var i = 0; i < this.showItems.length; ++i) {
                if (this.showItems[i].ID == this.selected.ID) {
                    this.showItems.splice(i,1);
                    i--;
                }
            }
            storeJson(this.showItems,"checkFlow");
            this.index = -1;
            this.selected = null;
            this.show = false;
        }
    }
});
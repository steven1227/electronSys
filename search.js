var $ = require('jquery');
window.$ = $;
require('bootstrap');
var low = require('lowdb')
var AppDirectory = require('appdirectory')
var dirs = new AppDirectory('mycws')

const { ipcRenderer } = require('electron')

console.log(dirs.userConfig())
var fs = require('fs');
if (!fs.existsSync(dirs.userConfig())) {
    fs.mkdirSync(dirs.userConfig());
}
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync(dirs.userConfig() + '/db.json')
var db = low(adapter)
// Add a post
var index = 0

var tableName = { "name": "姓名", "computer": "电脑号", "acc": "事故编号", "company": "单位名称", "year": "年份", "month": "月份", "cla": "类别", "rank": "级别", "cta": "目录", "doc": "档号", "box": "盒号", "index": "序号" }

function drawRow(Data) {
    console.log(Data)
    $("#tableBody").empty();
    $.each(Data, function(dice, rowData) {
        var index1 = 0;
        $.each(rowData, function(key, val) {
            if (key != "index") {
                var row = $("<tr />")
                $("#tableBody").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
                row.append($("<td>" + tableName[key] + "</td>"));
                row.append($("<td>" + val + "</td>"));
            } else {
                index1 = val;
            }
        });
        var btn1 = $("<button class='btn btn-success modify'>修改</button>");
        btn1.data("indexId", index1);
        var btn2 = $("<button class='btn btn-warning print' style='margin-left:8px'>打印</button>");
        var btn3 = $("<button class='btn btn-danger delete' style='margin-left:8px'>删除</button>");
          btn3.data("indexId", index1);
        var hr = $("<hr />")
        $("#tableBody").append(btn1);
        $("#tableBody").append(btn2);
        $("#tableBody").append(btn3);
        $("#tableBody").append(hr);
    });
}

$("#search").click(function(event) {
    var computer = $('#computer').val();
    var acc = $('#acc').val();
    var data = {}
    if (computer) {
        data = db.get('posts')
            .filter({ 'computer': computer })
            .value()
    } else if (acc) {
        data = db.get('posts')
            .filter({ 'acc': acc })
            .value()
    }
    if (data) {
        drawRow(data);

        $('.print').click(function() {
            console.log("print")
            ipcRenderer.send('print-to-pdf', 'ping');
        })
        $('.modify').click(function(event) {
            index = $(this).data('indexId')
            window.location.href = "modify.html?index=" + index;
        })
        $('.delete').click(function(event) {
            index = $(this).data('indexId');
            db.get('posts').remove(function(d) {
                return d['index'] == parseInt(index)
            }).write();
            window.location.href = "search.html";
        })
    } else {
        $("#tableBody").empty();
        $("#tableBody").append($("<div>查询不到这个记录</div>"));
    }
})




ipcRenderer.on('wrote-pdf', function(event, path) {
    alert("打印出来的pdf保存到:" + path)
})
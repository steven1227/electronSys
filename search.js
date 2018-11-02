var $ = require('jquery');
window.$ = $;
require('bootstrap');
var low = require('lowdb')
var AppDirectory = require('appdirectory')
var dirs = new AppDirectory('mycoolappname')

console.log(dirs.userConfig())
var fs = require('fs');
if (!fs.existsSync(dirs.userConfig())) {
    fs.mkdirSync(dirs.userConfig());
}
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync(dirs.userConfig() + '/db.json')
var db = low(adapter)
// Add a post


var tableName = { "name": "姓名", "computer": "电脑号", "acc": "事故编号", "company": "单位名称", "year": "年份", "month": "月份", "cla": "类别", "rank": "级别", "cta": "目录", "doc": "档号", "box": "盒号", "index": "序号" }

function drawRow(rowData) {
    $("#tableBody").empty();
    console.log(rowData)
    $.each(rowData, function(key, val) {
        if (key != "index") {
            var row = $("<tr />")
            $("#tableBody").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
            row.append($("<td>" + tableName[key] + "</td>"));
            row.append($("<td>" + val + "</td>"));
        }

    });
}

$("#search").click(function(event) {
    var computer = $('#computer').val();
    var acc = $('#acc').val();
    var data = {}
    if (computer) {
        data = db.get('posts')
            .find({ 'computer': computer })
            .value()
    } else if (acc) {
        data = db.get('posts')
            .find({ 'acc': acc })
            .value()
    }
    if (data) {
        drawRow(data);
    } else {
        $("#tableBody").empty();
        $("#tableBody").append($("<div>查询不到这个记录</div>"));
    }
})
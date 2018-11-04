var $ = require('jquery');
window.$ = $;
require('bootstrap');
var low = require('lowdb')
var AppDirectory = require('appdirectory')
var dirs = new AppDirectory('mycws')

const {ipcRenderer} = require('electron')

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

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
var index = parseInt(getParameterByName('index'));

function populate(data) {
  $.each(data, function(key, value){
    $('#'+key).val(value);
  });
}

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    console.log(unindexed_array)
    var indexed_array = {};

    $.map(unindexed_array, function(n, i) {
        if (n['value']) {
            indexed_array[n['name']] = n['value'];
        }
    });

    return indexed_array;
}

function drawRow(rowData) {
    $.each(rowData, function(key, val) {
            var row = $("<tr />")
            $("#tableBody").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
            row.append($("<td>" + tableName[key] + "</td>"));
            row.append($("<td>" + val + "</td>"));
        });
}

$("#back").click(function(event) {
		window.location.href = "entrance.html";
})

$("#confirm2").click(function(event) {
    event.preventDefault()
    var $form = $("#form_data");
    var data = getFormData($form);
    data['index'] = index
    db.get('posts').remove(function(d){
    	return d['index']==index
    }).write();
    db.get('posts').push(data).write()
    drawRow(data);
    $('#nextModal').modal('show');
})

var data = {}
if (index) {
    data = db.get('posts')
        .find({'index':index})
        .value()
    }
console.log(data)
populate(data)
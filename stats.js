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


var tableName = {"name":"姓名","computer":"电脑号","acc":"事故编号","company":"单位名称","year":"年份","month":"月份","cla":"类别","rank":"级别","cta":"目录","doc":"档号","box":"盒号","index":"序号"}

function drawRow(rowData) {
    $("#tableBody").empty();
    $.each(rowData, function(key, val) {
            var row = $("<tr />")
            $("#tableBody").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
            row.append($("<td>" + key + "</td>"));
            row.append($("<td>" + val + "</td>"));
        });
}

$("#showmonth").click(function(event) {
    $("#monthwrapper").show()
})

$("#confirm2").click(function(){
    var month = $("#month").val();
    var display =$('#monthwrapper').css('display');
    if(display == 'none'){
        month = 0;
    }
    var year = $("#year").val();
    if(year && month == 0){
        var data_dict = db.get('posts')
          .filter({ "year": year}).groupBy('cla')
          .value();
        var result = {'轻伤':0,'致残':0,'全残':0,'死亡':0}
        $.each(data_dict , function(key, val){
            result[key] = val.length
        });
        drawRow(result)
    }else if(year && month != 0){
         var data_dict = db.get('posts')
          .filter({ "year": year,"month":month}).groupBy('cla')
          .value();
        var result = {'轻伤':0,'致残':0,'全残':0,'死亡':0}
        $.each(data_dict , function(key, val){
            result[key] = val.length
        });
       drawRow(result)
    }
})
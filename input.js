var $ = require('jquery');
window.$ = $;
require('bootstrap');
var low = require('lowdb')
var AppDirectory = require('appdirectory')
var dirs = new AppDirectory('mycws')

console.log(dirs.userConfig())
var fs = require('fs');
if (!fs.existsSync(dirs.userConfig())) {
    fs.mkdirSync(dirs.userConfig());
}
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync(dirs.userConfig() + '/db.json')
var db = low(adapter)
// Add a post

tableName = {"name":"姓名","computer":"电脑号","acc":"事故编号","company":"单位名称","year":"年份","month":"月份","cla":"类别","rank":"级别","cta":"目录","doc":"档号","box":"盒号","index":"序号"}

//  <li class="page-item"><a class="page-link" href="#">1</a></li>
//  <li class="page-item"><a class="page-link" href="#">2</a></li>
//  <li class="page-item"><a class="page-link" href="#">3</a></li>


var p_num = 1
var PER_PAGE = 10;
var total = 0;

var exists =  db.get('posts').orderBy(['index'], ['desc']).value()

total = Math.ceil((1.0 * exists.length)/PER_PAGE)

var navi_btn = $('#pagination');


for( var j = 0;j < total; j++){
    const test = j+1;
    $('#pagination').append(function(){
        var Li = $('<li class="page-item"><a class="page-link">'+test+'</a></li>');
        Li.click(function(event){
            $('.page-item').removeClass('active');
            $(this).addClass('active');
            render_tt(test);
        });
        return Li;
    })
}



var render_tt  = function(pagi_num){
    $('#ttBody').empty();
    var h = $("<tr><th>序号</th><th>姓名</th><th>电脑号</th><th>类别</th><th>单位名称</th><th>年</th><th>月</th><th>盒号</th></tr>");
     $('#ttBody').append(h);
    for(var i= (pagi_num-1)*PER_PAGE;i <(pagi_num)*PER_PAGE && i<exists.length; i++){
            var value = exists[i];
            var TableRow = "<tr>";
            TableRow += "<td>" +  value['index'] + "</td>";
            TableRow += "<td>" +  value['name'] + "</td>";
            TableRow += "<td>" +  value['computer']+ "</td>";
            TableRow += "<td>" +  value['cla'] + "</td>";
            TableRow += "<td>" +  value['company'] + "</td>";
            TableRow += "<td>" +  value['year'] + "</td>";
            TableRow += "<td>" + value['month'] + "</td>";
            TableRow += "<td>" + value['box'] + "</td>";
            TableRow += "</tr>";
            $('#ttBody').append(TableRow);
    }
}

render_tt(p_num)



   // $.each(exists, function (index, value) {

   //  });



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

$("#confirm2").click(function(event) {
    event.preventDefault()
    var $form = $("#form_data");
    var data = getFormData($form);
    var index = db.get('count').value() + 1;
    data['index'] = index
    db.get('posts').push(data).write()
    db.update('count', n => n + 1).write()
    drawRow(data);
    $('#nextModal').modal('show');
})

function drawRow(rowData) {
    $.each(rowData, function(key, val) {
            var row = $("<tr />")
            $("#tableBody").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
            row.append($("<td>" + tableName[key] + "</td>"));
            row.append($("<td>" + val + "</td>"));
        });
}

$("#next").click(function(event) {
	window.location.href = "input.html";
})

$("#back").click(function(event) {
		window.location.href = "entrance.html";
})


$("#copy").click(function(event) {
     event.preventDefault()
    $("#doc").select();
    document.execCommand("copy");
})


$("#paste").click(function(event) {
    event.preventDefault()
    $("#doc").select();
    document.execCommand("paste");
})
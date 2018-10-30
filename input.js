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
    console.log(data)
    db.get('posts').push(data).write()
    db.update('count', n => n + 1).write()
    $('#nextModal').modal('show');
})

$("#next").click(function(event) {
	window.location.href = "input.html";
})

$("#back").click(function(event) {
		window.location.href = "entrance.html";
})


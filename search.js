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





$("#search").click(function(event) {
    var computer = $('#computer').val();
    var acc = $('#acc').val();
    var data = {}
    console.log(computer)
    if (computer) {
        data = db.get('posts')
            .find({ 'computer': computer })
            .value()
    } else if (acc) {
        data = db.get('posts')
            .find({ 'acc':  acc})
            .value()
    }
    console.log(data)
})
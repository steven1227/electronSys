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


$("#change").click(function(event) {
    var pass1 = $("#pass1").val();
    var pass2 = $("#pass2").val();
    if(pass1 === pass2){
        db.set('Cls', pass1).write();
        window.location.href = "index.html";
    }else{
        $("#errorModal").modal("show");
    }
})
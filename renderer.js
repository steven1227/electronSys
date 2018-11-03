var $ = require('jquery');
window.$ = $;
require('bootstrap');

var low = require('lowdb')
var AppDirectory = require('appdirectory')
var dirs = new AppDirectory('mycoolappname')

console.log(dirs.userConfig())
var fs = require('fs');
if (!fs.existsSync(dirs.userConfig())){
    fs.mkdirSync(dirs.userConfig());   
}
var FileSync = require('lowdb/adapters/FileSync') 
var adapter = new FileSync(dirs.userConfig()+'/db.json')
var db = low(adapter)

db.defaults({ posts: [], 'Cls': '123456', count: 0 })
  .write()


var pass = db.get('Cls').value()

$('#loginBtn').click(function(){
	var username = $('#username').val();
	var password = $('#password').val();
	if(username === 'Cls' && password === pass){
		window.location.href = "entrance.html";
	}else{
		$('#errorModal').modal('show');
	}
});
$(document).keypress(function(e) {
    if(e.which == 13) {
    var username = $('#username').val();
	var password = $('#password').val();
	if(username === 'Cls' && password === pass){
		window.location.href = "entrance.html";
	}else{
		$('#errorModal').modal('show');
	}
    }
});
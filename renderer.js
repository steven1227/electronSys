var $ = require('jquery');
window.$ = $;
require('bootstrap');

var low = require('lowdb')
var AppDirectory = require('appdirectory')
var dirs = new AppDirectory('mycoolappname')

var FileSync = require('lowdb/adapters/FileSync') 
var adapter = new FileSync(dirs.userLogs()+'/db.json')
var db = low(adapter)

var pass = db.get('user.Cls').value()
$('#loginBtn').click(function(){
	var username = $('#username').val();
	var password = $('#password').val();
	if(username === 'Cls' && password === pass){
		window.location.href = "entrance.html";
	}else{
		$('#errorModal').modal('show');
	}
});
$('#forgeBtn').click(function(){
	var username = $('#username').val();
	var password = $('#password').val();
	if(username === 'Cls' && password === pass){
		window.location.href = "entrance.html";
	}else{
		$('#errorModal').modal('show');
	}
});
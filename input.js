var $ = require('jquery');
window.$ = $;
require('bootstrap');

const low = require('lowdb')
const AppDirectory = require('appdirectory')
var dirs = new AppDirectory('mycoolappname')

const FileSync = require('lowdb/adapters/FileSync') 
const adapter = new FileSync(dirs.userLogs()+'/db.json')
const db = low(adapter)

const password = db.get('user.Cls').value()
console.log(password)
// db.defaults({ posts: [], user: {} })
//   .write()

// db.get('posts')
//   .push({ id: 1, title: 'lowdb is awesome'})
//   .write()

// $('#exampleModal').modal('show');
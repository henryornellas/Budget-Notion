//This server passes data from webpage to server and back with EJS, and own EJS module.

//Requesting modules
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js'); //<<--- Requiring own EJS module.

const app = express();


//EJS, Body Parser and Express modules setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


//Set initial empty list arrays
const items = ['Take cat for a walk', 'Buy blinker fluid'];
const workItems = [];


//Render local ejs page passing day and items array as parameters.
app.get('/', function(req, res){

  const day = date.getDate();

  res.render('list', {listTitle: day, newListItems: items});

});


//Submit button action adds new item to 'work' or normal list.
app.post('/', function(req, res){

  const item = req.body.newTask

  if(req.body.list === 'Work'){
    workItems.push(item);
    res.redirect('/work');
  }else{
    items.push(item);
    res.redirect('/');
  }

});


//Render different list name when client requests /work.
app.get('/work', function(req, res){
  res.render('list', {listTitle: 'Work List', newListItems: workItems});
});




//Server port.
app.listen(process.env.PORT || 3000, function(){
  console.log('WORKING');
});

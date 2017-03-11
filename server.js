var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config = {
  user : 'user-8149624707',
  database:'user-8149624707',
  host:'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD
};



var app = express();
app.use(morgan('combined'));
var counter = 0; 
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //return a response with result

    pool.query('select * from test',function(err,query){
        if(err)
        {
           res.status(500).send(err.toString());
        }else
        {
            res.send(JSON.stringify(result));
        }
    });
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/niraj.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'niraj.jpg'));
});
var names = [];
app.get('/submit-name', function (req, res) {
 var name=req.query.name;
 names.push(name);
 res.send(JSON.stringify(names));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

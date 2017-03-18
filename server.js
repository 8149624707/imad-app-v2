var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');

var config = {
  user : 'user-8149624707',
  database:'user-8149624707',
  host:'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD
};

function createTemplate(data){
var title=data.title;
var heading=data.heading;
var date=data.date;
var content=data.content;
var htmltemplate =`
<html>
      <head>
         <title>
         ${title}
         </title>
         <meta name="viewport" content="width=device-width , intial-scale=1"/>
         <link href="/ui/style.css" rel="stylesheet"/>
      </head>
<body>
        <div class=container>
          <div>
             <a href="/">Home</a>
          </div>
          <hr>
          <h3>
          ${heading}
          </h3>
          <div>
          ${date.toDateString()}
          </div>
          <div>
          ${content}
          </div>
        </div>
</body>
</html>
`;

    return htmltemplate;
}

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:'niru',
    cookie:{ maxAge:1000*60*60*24*30 }
}));
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

    pool.query('SELECT * FROM test',function(err,result){
        if(err)
        {
           res.status(500).send(err.toString());
        }else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/article/:articleName', function (req, res) {
    pool.query("SELECT * FROM article WHERE title =$1",[req.params.articleName],function(err,result){
        if(err)
        {
           res.status(500).send(err.toString());
        }else
        {
            if(result.rows.length===0)
            {
                res.status(404).send('Article not found');
            }
            else
            {
                 var articledata = result.rows[0];
               res.send(createTemplate(articledata)); 
            }
        }
        
    });
 
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

function hash(input,salt)
{
 var hashed=crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
 return ['pbkd2',10000,salt,hashed.toString('hex')].join('$');
 
}
app.get('/hash/:input',function(req,res){
  var hashedString = hash(req.params.input,'this-is-a-random-string');
   res.send(hashedString); 
});
app.post('/create-user',function(req,res){
   
   var username=req.body.username;
   var password=req.body.password;
   var salt=crypto.randomBytes(128).toString('hex');
   var dbString=hash(password,salt);
   pool.query('INSERT into "user"(username,password) VALUES($1,$2)',[username,dbString],function(err,result){
        if(err)
        {
           res.status(500).send(err.toString());
        }else
        {
            res.send('User created successfully:'+username);
        }
    });
});
app.post('/login',function(req,res){
   
   var username=req.body.username;
   var password=req.body.password;
   pool.query('SELECT * from "user" where username=$1',[username],function(err,result){
        if(err)
        {
           res.status(500).send(err.toString());
        }else
        {
             if(result.rows.length===0)
            {
                res.send(403).send('usrname/password is invalid');
            }
            else
            {
                 var dbstring = result.rows[0].password;
                 var salt=dbstring.split('$')[2];
                 var hashedpassword=hash(password,salt);
                 if(hashedpassword==dbstring)
                 {
                     req.session.auth = {userid:result.row[0].id};
                     res.send('Credentials correct');
                 }
                 else
                 {
                     res.send(403).send('usrname/password is invalid');
                 }
            }
        }
    });
});
app.get('/check-login',function(req,res){
    if(req.session&&re.session.auth&&req.session.auth.userid)
    {
        req.send('You are logged in'+userid.toString());
    }
    else
    {
        req.send('You are not logged in');
    }
    
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

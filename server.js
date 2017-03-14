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

var articleOne = {
    title:'Article one | Sujata ',
    heading:'Maa',
    date:' 14 march,2017',
    content:`<pre>
I know,We don't share the relationship..
Like other Mother-daughter's do..
I don't talk to You daily..
I don't cry  about my sorrows..
I don't hug You tight out of happiness..

But

There is something,
I need to talk to You,only You
When I am feeling low..
I need to cry to You,only You
When I am sad..
I need to hug You tightest
When I am happiest..

You have never shown 
your unconditional love for me
When I was with You..
But You are the one whose tears don't stop
When I leave You and come..

As a child,I always thought 
I am Daddy's girl and  
You love your sons more,
Now when I see behind,
I see things differently..
I have never given You the joy of motherhood
Never given You the grace of being a mother to a daughter,her only daughter..
Days cannot come back,Time cannot be retraced..

When You tell me that your eyes are dried..
Tears cannot be formed,
I cannot even transplant my weak eyes to you Maa..
I cannot even get You the best treatment now..
I cannot see You look old,with wrinkles around your beautiful eyes.

If ever I am able to achieve anything in life..
It would be the outcome of all your sacrifices..
All the comforts You gave up for providing me all that I never even asked for..
I never say it
But 
I love You the most,Maa.
</pre>`
    
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
          ${date}
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
app.get('/article-one', function (req, res) {
  res.send(createTemplate(articleOne));
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

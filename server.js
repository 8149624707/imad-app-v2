var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config = {
  user : '8149624707',
  database:'8149624707',
  host:'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD
};

var articles = {
'article-one' : {
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
    
},
'article-two' : {
    title:'Article Two | Niraj ',
    heading:'I wish i could travel time',
    date:' 14 march,2017',
    content:`<pre>
I wish I could travel time....,
Just to see the joyful faces of my loved ones.

I wish I could travel time....,
Just to appreciate the sacrifices my father made.

I wish I could travel time....,
Just to be small enough to fit in my mother's lap.

I wish I could travel time....,
Just to get glimpse of my sweet little toothless sister.

I wish I could travel time....,
Just to get astonished by powerful brother thrashing bullies.

I wish I could travel time....,
Just to have crush on my teacher once more.

I wish I could travel time....,
Just to appreciate how amazing school life was.

I wish I could travel time....,
Just to play hide and seek with my friends.

I wish I could travel time....,
Just to lay on the bed without panicking about the next day.

I wish I could travel time....,
Just to be away from our coward and nosy society.

The bitter truth is you cannot travel time.
The nature has it own laws and reasons for existence of every single atom and being  in the universe.It's meritless by getting stuck in the past,or imagining how our future will be.So all we can do start the living in the present because, sometimes you will never know the value of the moment until it becomes a memory.

</pre>`
    
},
'article-three' : {
    title:'Article Three | Sujata ',
    heading:'Motu',
    date:' 14 march,2017',
    content:`<pre>
A lil more sweet, more innocent.
A lil more plumpy,more strong.
A lil more loving,more caring.
More understanding..
A lil more to everything than me.

Sharing your favourite candies
inspite of having the sweetest tooth,I know
You have always pampered me .
Horrified with my weak concepts in Mathematics,
You have always advised me.

Wearing same comic characters tees
to same floaters,to same school bags.
We have always been one soul,
in two bodies.

Listening to all my same stories repeatedly,
Suggesting me to be more careful each time
You have always acted,like an elder soul.
Terrified with all my wrong decisions,
You have hugged me,like a fatherly soul.

Two years difference is enough to be more mature
But I chose to be lame
Cause I knew,I had YOU.
Had You as my Younger Brother 
who is elder to me in all senses.

Today when You need me to encourage You,
To listen Your worries
To listen about your Boards papers
I have got no time.
No time to be a listener,a caring friend
Moreover your elder sister.

The distance doesnt let us meet often
Our schedule doesnt allow us talk for long'
Wanting to relive those childhood days 
And relish each special moment of mine
with You,Motu.
I ask Destiny to set something really good
FOR ME,
FOR YOU,
FOR US.
</pre>`
}
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

    pool.query('SELECT * FROM test',function(err,query){
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
app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
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

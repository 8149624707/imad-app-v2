var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
 
var articletwo = {
title:'Article one | Niraj ',
heading:'I wish i could travel time',
name:'by niraj',
content:`<p>I wish I could travel time....,<br>
Just to see the joyful faces of my loved ones.</p>

<p>I wish I could travel time....,<br>
Just to appreciate the sacrifices my father made.</p>

<p> wish I could travel time....,<br>
Just to be small enough to fit in my mother's lap.</p>

<p>I wish I could travel time....,<br>
Just to get glimpse of my sweet little toothless sister.</p>

<p>I wish I could travel time....,<br>
Just to get astonished by powerful brother thrashing bullies.

<p>I wish I could travel time....,<br>
Just to have crush on my teacher once more.</p>

<p>I wish I could travel time....,<br>
Just to appreciate how amazing school life was.</p>

<p>I wish I could travel time....,<br>
Just to play hide and seek with my friends.</p>

<p>I wish I could travel time....,<br>
Just to lay on the bed without panicking about the next day.</p>

<p>I wish I could travel time....,<br>
Just to be away from our coward and nosy society.</p>

<p>The bitter truth is you cannot travel time.
The nature has it own laws and reasons for existence of every single atom and being  in the universe.It's meritless by getting stuck in the past
,or imagining how our future will be.So all we can do start the living in the present because, sometimes you will never know the value of
the moment until it becomes a memory.</p>
`
};
function createTemplate (data) {
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var name=data.name;
var htmlcontent=`
<html>
<head>
    <title>
${title}
</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
 <link href="/ui/style.css" rel="stylesheet" />
</head>
<body align="center">
<div class="container">
    <div>
<a href="/">Home</a>
</div>
<hr/>
<h3>${heading}</h3>
<div>${name}</div>
<div>
${content}
</div>
</div>
</body>
</html>
`;
return htmlcontent;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function(req,res){
    res.send(createTemplate(articleone));
});
app.get('/article-two',function(req,res){
    res.send(createTemplate(articletwo));
});
app.get('/article-three',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
 
var articleone = {
title:'Article one | Sujata ',
heading:'Have you ever met him ?',
name:'by sujata',
content:`<p>"Have you ever met him",The world always asked ..<br>
Is it required,She always answered  but to herself.</p>


<p>Noisy canteen,some nostalgic stories and this is how it started..<br>
There's something in this face,she remarks<br>
He's my brother,friend replied.<br>
With a smile on her face and some clingy thoughts in her mind ..<br>
Request was send..<br>
To the surprise,it was accepted even faster than was sent</p>

<p>Serious disgnosis of the profile went for hours..<br>
The smile or precisely the dimples, got her closer<br>
Many hours were spent talking with the pictures..<br>
"When in doubt,wear red"was his caption<br>
And She read it innmuerable times..<br>
She felt,She was overthinking and suddenly..</p>

<p>A message on insta popped..<br>
Her joy knew no bounds.<br>
Notifications used to give her utmost happiness<br>
Continuous chats,turned aquaintance to friendship..<br>
She waited hours in night just to see a blue heart on her screen..<br>
And it was her first serious crush,She accepted.</p>

<p>He assured her,a special friendship and<br>
She said She was happy..<br>
A lot of thoughts drove her away<br>
But his charm brought her closer<br>
And closer..<br>
Why can't He feel the same?,was her question to herself..</p>

<p>Weekly calls were soon promoted to daily<br>
Minutes soon turned into hours..<br>
And crush...to love.<br>
Her life was full of special feeling of love,<br>
She was pampered by all..<br>
But She desired to be cared by only one.</p>

<p>Several attempts were made to move on<br>
Only if blocking would be a way to avoid,He would have left long back..<br>
Both needed each other <br>
May be just to share their talks..their stories..their laughter<br>
What matters was the need.<br>
The need of her for him and<br> 
his for her..</p>

<p>She soon found her bestfriend in him<br>
And tried her best, to be his favourite listener<br>
At all times..<br>
But destiny had decided something,<br> 
More happening,More adventurous.</p>

<p>Nothing comes before family,were her words.<br>
We belong to good families,were his.<br>
And separation was decided..<br>
Of two true souls,"never met".<br>
One last question was the angel's plan<br>
He asked"Have you moved on?"<br>
Yes,and mere silence.</p>

<p>What came next was not less than a miracle for her<br>
He accepted his feelings for her..the love..the care..the sorrow of gettting separated<br>
She couldn't lie anymore and <br>
Both felt a virtual hug,He felt his heart was light,She felt She heard everything She always wanted.<br>
But the question still stayed firm for her<br>
"Have you ever met him?"<br>
"It matters no more"she answeres now..</p>`
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
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

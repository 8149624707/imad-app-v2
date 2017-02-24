//counter code
var button = document.getElementById(`counter`);
button.onclick =function(){
    
    var request= new XMLHttpRequest();
    
    request.onreadystatechange= function(){
        if(request.readyState === XMLHttpRequest.DONE)
        {
            if(request.status === 200)
            {
                var counter = request.responseText;
                var span=document.getElementById(`count`);
                span.innerHTML=counter.toString();
            }
        }
    };
    
    request.open(`GET`,`http://user-8149624707.imad.hasura-app.io/counter`,true);
    request.send(null);
    
    
};
//submit name
var nameinput = document.getElementById(`name`);
var name = nameinput.value;
var submit =document.getElementById(`submit_btn`);
submit.onclick=function(){
    
    var names =[`name1`,`name2`,`name3`,`name  4`];
    var lst=``;
    for(var i=0;i<names.length;i++)
    {
        lst += '<li>'+names[i]+'<li>';
    }
    var ul =document.getElementById(`namelist`);
    ul.innerHTML =lst;
};
console.log('Loaded!');
var element = document.getElementById('main-txt');
element.innerHTML='kiran sharma';
var img= document.getElementById('image');
var marginLeft=0;
function moveRight(){
    marginLeft=marginLeft+5;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick = function(){
    var interval =setInterval(moveRight,50);
    
};
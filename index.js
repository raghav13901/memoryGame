var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'X', 'Z'];
// console.log(alpha.length);
var pos = [];
var usedAlpha = [];
var i, j;
var click = 0;
var checkAlpha = [];
var clickId = [];
var won = 0;
var ids=[];
function checkPos(x, y) {
  if (pos.indexOf(x) == -1) {
    print(x, y);
  } else {
    var randNoPos = Math.ceil(Math.random() * 24);
    checkPos(randNoPos, y);
  }
}
function checkAlphaPos(y) {
  if (usedAlpha.indexOf(y) == -1) {
    usedAlpha.push(y);
    for (j = 0; j < 2; j++) {
      var randNoPos = Math.ceil(Math.random() * 24);
      checkPos(randNoPos, y);
    }
  } else {
    var randNoAlpha = Math.floor(Math.random() * 26);
    checkAlphaPos(randNoAlpha);
  }
}

function print(x, y) {
  pos.push(x);
  $("." + x).html(alpha[y]);
  // console.log(alpha[y]);
}
for (i = 0; i < 12; i++) {
  var randNoAlpha = Math.floor(Math.random() * 26);
  checkAlphaPos(randNoAlpha);
}

function start(){
  $(".card").addClass("show");
  setTimeout(function() {
  $(".card").removeClass("show");
  }, 5000);
  setTimeout(function(){
    alert("Now,Click on any 2 cards which you think has same alphabets");
    $(".card").css("pointer-events","all");
  },5010);
  document.getElementById("stBtn").setAttribute("disabled","true");
}
function check(event){
    if(ids.indexOf(event.id) == -1){
      $(event).addClass("show");
      clickId.push(event.id);
      checkAlpha.push(event.innerText);
      click++;
      if(click == 2){
        $(".card").css("pointer-events","none");
      setTimeout(function(){

          // console.log(checkAlpha);
          if(checkAlpha[0] == checkAlpha[1]){
            ids.push(clickId[1]);
            ids.push(clickId[0]);
            console.log(ids);
            checkAlpha = [];
            clickId=[];
            click=0;
            won++;
            $(".card").css("pointer-events","all");
          }else{
            $("#"+clickId[0]).removeClass("show");
            $("#"+clickId[1]).removeClass("show");
            // console.log("wrong");
            // console.log(clickId);
            checkAlpha = [];
            clickId=[];
            click=0;
            $(".card").css("pointer-events","all");
          }
      },500);
    }
      if(won == 11){
        setTimeout(function(){
          $("h1").html("You WON!!!");
          $("h3").html("Reload to play Again");
        },1000);
      }
    }
}
// console.log(pos);
// console.log(usedAlpha);
window.onbeforeunload = function() {
  return "You will lost your all unsaved data";
};

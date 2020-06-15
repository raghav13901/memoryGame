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
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
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
function checkWon(){
  if(won == 12){
    setTimeout(function(){
      $("h1").html("You WON!!!");
      $("h3").html("Click Re-Start to play Again");
      $(".rstBtn").css("display","block");
      $(".startBtn").css("display","none");
      var audio = new Audio("sounds/applause.mp3");
      audio.play();
    },1500);
  }
}
function start(){
  $(".card").addClass("show");
  setTimeout(function() {
  $(".card").removeClass("show");
  }, 5000);
  setTimeout(function(){
    alert("Now,Click on any 2 cards which you think has same alphabets");
    $(".card").css("pointer-events","all");
  },5510);
  $(".startBtn").css("display","none");
}
function check(event){
  // console.log(won);
  var audio = new Audio("sounds/click.mp3");
  audio.play();
    if(ids.indexOf(event.id) == -1){
      $(event).addClass("show");
      clickId.push(event.id);
      checkAlpha.push(event.innerText);
      click++;
      if(click == 2){
        $(".card").css("pointer-events","none");
      setTimeout(function(){

          // console.log(checkAlpha);
          if(checkAlpha[0] == checkAlpha[1] && clickId[0]!=clickId[1]){
            ids.push(clickId[1]);
            ids.push(clickId[0]);
            // console.log(ids);
            checkAlpha = [];
            clickId=[];
            click=0;
            ++won;
            $(".card").css("pointer-events","all");
            var audio = new Audio("sounds/correct.mp3");
            audio.play();
          }else{
            $("#"+clickId[0]).removeClass("show");
            $("#"+clickId[1]).removeClass("show");
            // console.log("wrong");
            // console.log(clickId);
            checkAlpha = [];
            clickId=[];
            click=0;
            $(".card").css("pointer-events","all");
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
          }
          checkWon();
      },500);
    }

    }
}
function reStart(){
  $(".startBtn").css("display","block");
  $(".card").removeClass("show");
  $(".rstBtn").css("display","none");
  $(".card").css("pointer-events","all");
  pos = [];
  usedAlpha = [];
  click = 0;
  checkAlpha = [];
  clickId = [];
  won = 0;
  ids=[];
  for (i = 0; i < 12; i++) {
    var randNoAlpha = Math.floor(Math.random() * 26);
    checkAlphaPos(randNoAlpha);
  }
  $("h1").html("Let's Test your Memory");
  $("h3").html("Click on Start then click on any 2 cards which you think has same alphabets");
}
// console.log(pos);
// console.log(usedAlpha);
window.onbeforeunload = function() {
  return "You will lost your all unsaved data";
};

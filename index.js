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
var noOfLife;
var z = true;
var x;
var levels = 0;
var level = [10,8,6];
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
function checkWonOrLose(){
  if(won == 12){
    setTimeout(function(){
      levels++;
      clearInterval(x);
      $("h1").html("You WON!!!");
      $(".rstBtn").css("display","block");
      if(level==2){
        levels = 0;
        $("h3").html("Click Re-Start to play Again");
        $(".rstBtn").html("Re-Start");
      }else{
        $("h3").html("Click to play go to next Level");
        $(".rstBtn").html("Go to Level-"+(levels+1));
      }
      $(".startBtn").css("display","none");
      $(".card").css("pointer-events","none");
      var audio = new Audio("sounds/applause.mp3");
      audio.play();
    },500);
  }
  if(noOfLife == 0){
    levels=0
    clearInterval(x);
    $(".levels").html(levels+1);
    $("h1").html("You Lose");
    $("h3").html("Click Re-Start to play Again");
    $(".rstBtn").css("display","block");
    $(".rstBtn").html("Re-Start");
    $(".startBtn").css("display","none");
    $(".card").css("pointer-events","none");
  }
  if(z === false){
    levels=0
    $("h1").html("You Lose");
    $(".levels").html(levels+1);
    $("h3").html("Click Re-Start to play Again");
    $(".rstBtn").css("display","block");
    $(".rstBtn").html("Re-Start");
    $(".startBtn").css("display","none");
    $(".card").css("pointer-events","none");
  }
}
function countDown(){
    var min = level[levels]/2;
    var sec = 0;
     x = setInterval(function() {
      sec--;
      if(sec<10 && sec>=0){
        $(".sec").html("0"+sec);
        if(min==0){
          $(".timer").css('color','red');
          setTimeout(function(){
            $(".timer").css('color','#fff');
          },500);
      }
      }else{
       if(sec<0){
        min--;
        sec = 59;
        console.log(sec);
      }
      $(".sec").html(sec);
      $(".min").html("0"+min);
    }
      if(min<0){
        clearInterval(x);
        $(".min").html('00');
        $(".sec").html('00');
        console.log('w');
        console.log('z');
        z = false;
        checkWonOrLose();
      }
    },1000);

}
function start(){
  noOfLife = level[levels];
  $(".life").html(noOfLife);
  $(".levels").html(levels+1);
  $(".card").addClass("show");
  setTimeout(function() {
  $(".card").removeClass("show");
  }, 5000);
  setTimeout(function(){
    alert("Now,Click on any 2 cards which you think has same alphabets");
    $(".card").css("pointer-events","all");
  },5500);
  $(".startBtn").css("display","none");
  countDown();
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
            noOfLife--;
            $(".life").html(noOfLife);
            if(noOfLife<=3){
              $(".chance").css("color","#fd5757");
            }
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
              // console.log(noOfLife);
          }
          checkWonOrLose();
      },500);
    }

    }
}
function reStart(){
  $(".startBtn").css("display","block");
  $(".card").removeClass("show");
  $(".rstBtn").css("display","none");
  $(".card").css("pointer-events","none");
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
  $(".life").html(level[levels]);
  $(".chance").css("color","#78ff11");
  $(".min").html('00');
  $(".sec").html('00');
  $(".levels").html(levels+1);
}
  // console.log(pos);
  // console.log(usedAlpha);
window.onbeforeunload = function() {
  return "You will lost your all unsaved data";
};

var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var started=false;
var level=0;
var toplevel=0;

//Klavye tuşuna basıldığında nextSquence() fonksiyonunu çağır
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
  }
});


//Buton tıklamalarını algıla ve işlemleri başlat
$(".btn").click(function(){
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
animatePress(userChosenColour);
playSound(userChosenColour);
checkAnswer(userClickedPattern.length-1);

});


function checkAnswer(currentLevel) {
  //  Kullanıcının cevabının oyun dizisiyle eşleşip eşleşmediğini kontrol et
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      console.log("success");
      

      //  Kullanıcı tüm diziyi doğru yaptıysa sonraki seviyeye geç
      if (userClickedPattern.length === gamePattern.length) {
          setTimeout(function() {
              nextSequence(); //  1000 milisaniye gecikmeyle sonraki diziyi başlat
          }, 1000);
      }

  } else {
      console.log("doğru cevap :" + gamePattern[currentLevel]);
      
      console.log("wrong");

      playSound("wrong");
      $("body").addClass("game-over");
      
      
      setTimeout(function(){
        $("body").removeClass("game-over");
      },500);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      
      
      
      startOver();
      
      
  }
}



//Yeni bir dizi oluşturmak için fonksiyon

function nextSequence(){
userClickedPattern=[];
level++;
$("#level-title").text("Level "+level);


var randomNumber=Math.floor(Math.random()*4);
var randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(300).fadeOut(300).fadeIn(300);
playSound(randomChosenColour);
toplevel=(level>toplevel)?level:toplevel;
$("h2").text("Top Level : "+ toplevel);


}
// Basılan butonun animasyonunu göster fonksiyonu
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

// Ses çalma fonksiyonu
function playSound(name){
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

function startOver(){
 
  level=0;
  gamePattern=[];
  started=false;
}
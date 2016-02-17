var currentMove = 0;
var Moves = [];

var app = angular.module('simon', []);
app.controller('game', function($scope) {

  $scope.optionClick = function(event) {
    var colorClicked = event.target.classList[1];

    Moves.push(colorClicked);
    console.log(Moves);

    playMusic(colorClicked);
  }


  function playMusic(color) {
    switch (color) {
      case "green":
        var greenAudio =  new Audio('audio/simonSound1.mp3');
        greenAudio.play();
        break;
      case "red":
        var redAudio =    new Audio('audio/simonSound2.mp3');
        redAudio.play();
        break;
      case "blue":
        var blueAudio =   new Audio('audio/simonSound3.mp3');
        blueAudio.play();
        break;
      case "yellow":
        var yellowAudio = new Audio('audio/simonSound4.mp3');
        yellowAudio.play();
        break;
      default: //wrong
        var wrongAudio =  new Audio('audio/wrong.mp3');
        wrongAudio.play();
        break;
    }
  }

});

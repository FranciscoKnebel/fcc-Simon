var canPlay = false;
var notStarted = true;
var currentMove = 0;
var Moves = [];

var app = angular.module('simon', []);
app.controller('game', function($scope, $timeout, $interval) {
  $scope.total = 0;
  $scope.Replaying = false;

  $scope.optionClick = function(event) {
    var color = event.target.classList[1];

    if(canPlay === true) { //need to add iterations for multiple buttons
      if(Moves[currentMove] === color) { //correct choice
        clickButton(color);
        currentMove++;
      }
      else { // wrong choice
        clickButton('wrong');
        $scope.ReplayAll();
      }
    }
  }

  $scope.Start = function() {
    if(notStarted === true) {
      notStarted = false;
      Moves.push(nextButton());
      $scope.total = Moves.length;
      canPlay = true;
      $scope.ReplayAll();
    }
  }

  $scope.ReplayAll = function() {
    if(canPlay === true) {
      var index = 0;
      canPlay = false;
      $scope.Replaying = true;
      var promise = $interval(function() {
        if(index > Moves.length - 1) {
          $interval.cancel(promise);
          canPlay = true;
          $scope.Replaying = false;
        }
        else {
          clickButton(Moves[index++]);
        }

      }, 1000);
    }
  }

  $scope.Clear = function() {
    currentMove = 0;
    Moves = [];
    $scope.total = 0;
    notStarted = true;
  }

  function clickButton(color) {
    $('.' + color).addClass(color + '-active')

    playMusic(color);
    $timeout(function() {
        $('.' + color).removeClass(color + '-active');
    }, 500);
  }

  function nextButton() {
    var randomNumber = Math.floor((Math.random() * 4) + 0);
    var value = '';

    switch (randomNumber) {
      case 1:
        value = "green";
        break;
      case 2:
        value = "red";
        break;
      case 3:
        value = "yellow";
        break;
      case 4:
        value = "blue";
        break;
      default:
        value = "blue";
        break;
    }

    return value;
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

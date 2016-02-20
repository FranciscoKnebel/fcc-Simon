var canPlay = false;
var notStarted = true;
var currentMove = 0;
var Moves = [];

var app = angular.module('simon', []);
app.controller('game', function($scope, $timeout, $interval) {
  $scope.total = 0;
  $scope.Replaying = false;
  $scope.WrongAlert = false;
  $scope.StrictMode = false;

  var index = 0;


  /* JQuery only functions */
  $("[name='strict']").bootstrapSwitch();
  $('input[name="strict"]').on('switchChange.bootstrapSwitch', function(event, state) {
    $scope.StrictMode = state;
  });

  $('#btnTweet').click(function (e) {
		 var textToTweet = "I have completed all stages of Simon! Test your memory at goo.gl/LBwDQb"

		 var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(textToTweet);
		 window.open(twtLink,'_blank');
	 });

  /* Angular functions */
  $scope.optionClick = function(event) {
    var color = event.target.classList[1];

    if(canPlay === true) {
      if(Moves[currentMove] === color) {
        if(currentMove === Moves.length -1) { //correct and last choice
          canPlay = false;
          clickButton(color);
          currentMove = 0;
          correctCombo();
        }
        else { //correct, but not last choice
          clickButton(color);
          currentMove++;
        }
      }
      else { // wrong choice
        if($scope.StrictMode === true) { //wrong choice resets the game
          $scope.WrongAlert = true;
          clickButton('wrong');
          $scope.Clear();
          var aux = 0;
          var promise = $interval(function() {
            canPlay = false;
            if(aux++ > 0) {
              $scope.WrongAlert = false;
              $interval.cancel(promise);
              $scope.Start();
            }
          }, 1000);
        }
        else { //wrong choice, repeats moves for the user to try again
          $scope.WrongAlert = true;
          clickButton('wrong');
          var aux = 0;
          var promise = $interval(function () {
            if(aux++ > 0) {
              $scope.WrongAlert = false;
              $interval.cancel(promise);
              $scope.ReplayAll();
            }
          }, 1000);

          currentMove = 0;
        }
      }
    }
  }

  $scope.Start = function() {
    if(notStarted === true) {
      notStarted = false;
      generateNext();
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
          $scope.WrongAlert = false;
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
    canPlay = false;
    notStarted = true;
  }

  $scope.end = function() {
    $('.wrapper').removeClass("ng-hide");
    $('#top').addClass("ng-hide");
    $('#top').fireworks('destroy');
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

  function generateNext() {
    Moves.push(nextButton());
    if(Moves.length > 20) {
      //user won the game!
      //Show congratulations message and reset game.
      $scope.Clear();
      $('#top').removeClass("ng-hide");
      $('#top').fireworks();
      jQuery("#inner-top").before(jQuery("canvas"));
      $('.wrapper').addClass("ng-hide");
    }
    else {
      $scope.total = Moves.length;
      canPlay = true;
      $scope.ReplayAll();
    }
  }

  function correctCombo() {
    var aux = 0;
    var promise = $interval(function() {
      canPlay = false;
      $scope.CorrectAlert = true;
      if(aux++ > 0) {
        $scope.CorrectAlert = false;
        $interval.cancel(promise);
        generateNext();
        canPlay = true;
      }
    }, 1000);
  }
});

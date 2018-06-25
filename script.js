$(document).ready(function() {

/* ------------------------ Audio File Declarations ------------------------ */

  var meterUpAudio = document.getElementById("meter-up-audio");
  meterUpAudio.muted = false;
  meterUpAudio.volume = 1.0;

  var meterDownAudio = document.getElementById("meter-down-audio");
  meterDownAudio.muted = false;
  meterDownAudio.volume = 1.0;

  var meterPressAudio = document.getElementById("meter-press-audio");
  meterPressAudio.muted = false;
  meterPressAudio.volume = 1.0;

/* ------------------------- Variable Declarations ------------------------- */

  var $powerIndicator = $("#power-indicator");
  var $indicatorTrail = $("#indicator-trail");
  var $indicatorGhost = $("#indicator-ghost");

  var indicatorGhostPositionX = 0;
  var spaceBarPress = 0;
  var shotLoopValue = 0;
  var shotPower = 0;
  var shotLength1 = 0;
  var shotLoopCount1 = 0;
  var releaseLoopValue = 0;
  var releasePoint = 0;
  var shotWidth1 = 0;
  var shotWidth2 = 0;
  var releaseLoopCount1 = 0;

/* ------------------------- Function Declarations ------------------------- */

  function checkIndicatorPos() {
    if($powerIndicator.position().left === -27 && spaceBarPress === 2) {
      releasePoint = -27;
      console.log("releasePoint = " + releasePoint);

      $powerIndicator.removeClass("power-indicator-move-right");
      $powerIndicator.removeClass("power-indicator-move-return");
      $powerIndicator.removeClass("power-indicator-move-left");
      $powerIndicator.removeClass("power-indicator-finish-left");
      $powerIndicator.css("left", "-54px");

      meterPressAudio.muted = false;
      meterPressAudio.currentTime = 0;
      meterPressAudio.play();

      setTimeout(function() {
        playerShot();
      }, 1340);

      spaceBarPress = 3;
    }
    else if($powerIndicator.position().left > -27 && spaceBarPress === 2) {
      setTimeout(function() {
        checkIndicatorPos();
      }, 100);
    }
  }


  function playerShot() {
    for(shotLoopValue = 217; shotLoopValue > 0; shotLoopValue -= 7) {
      if(shotPower >= (shotLoopValue - 6) && shotPower <= (shotLoopValue)) {
        console.log("shotLoopRange = " + (shotLoopValue - 6) + " & " + shotLoopValue);

      /* ------------ Good Release Early ------------ */
        if(releasePoint >= 1 && releasePoint <= 9) {
          for(releaseLoopValue = 9; releaseLoopValue >= 3; releaseLoopValue -= 3) {
            if(releasePoint >= (releaseLoopValue - 2) && releasePoint <= (releaseLoopValue)) {
              console.log("releaseLoopRange = " + (releaseLoopValue - 2) + " & " + releaseLoopValue);
              console.log("----- Good Release Early -----");
            }
            releaseLoopCount1++;
          }
        }

      /* ------------ Good Release Late ------------ */
        else if(releasePoint >= -9 && releasePoint <= -1) {
          for(releaseLoopValue = -9; releaseLoopValue <= -3; releaseLoopValue += 3) {
            if(releasePoint >= (releaseLoopValue) && releasePoint <= (releaseLoopValue + 2)) {
              console.log("releaseLoopRange = " + (releaseLoopValue + 2) + " & " + releaseLoopValue);
              console.log("----- Good Release Late -----");
            }
            releaseLoopCount1++;
          }
        }

      /* ------------ Perfect Release ------------ */
        else if(releasePoint === 0) {
          console.log("releaseLoopRange = 0");
          console.log("----- Perfect Release -----");
        }

      /* ---------- Early Release ---------- */
        else if(releasePoint >= 10 && releasePoint <= 217) {
          for(releaseLoopValue = 217; releaseLoopValue >= 17; releaseLoopValue -= 8) {
            if(releasePoint >= (releaseLoopValue - 7) && releasePoint <= (releaseLoopValue)) {
              console.log("releaseLoopRange = " + (releaseLoopValue - 7) + " & " + releaseLoopValue);
              console.log("----- Early Release -----");
            }
            releaseLoopCount1++;
          }
        }

      /* ---------- Late Release ---------- */
        else if(releasePoint >= -27 && releasePoint <= -10) {
          for(releaseLoopValue = -27; releaseLoopValue <= -12; releaseLoopValue += 3) {
            if(releasePoint >= (releaseLoopValue) && releasePoint <= (releaseLoopValue + 2)) {
              console.log("releaseLoopRange = " + (releaseLoopValue + 2) + " & " + releaseLoopValue);
              console.log("----- Late Release -----");
            }
            releaseLoopCount1++;
          }
        }

      }
      shotLoopCount1++;
    }
  /* ----- Shot Reset Functionality ----- */
    setTimeout(function() {
      $powerIndicator.css("left", "0px");
      $indicatorTrail.css("width", "4px");
      $indicatorGhost.addClass("hidden");

      spaceBarPress = 0;
      shotLoopValue = 0;
      shotLoopCount1 = 0;
      releaseLoopValue = 0;
      releaseLoopCount1 = 0;
    }, 3000);
  }


  function spacebarPress1() {
    $powerIndicator.addClass("power-indicator-move-right");
    $indicatorTrail.addClass("expand-trail");

    meterUpAudio.muted = false;
    meterUpAudio.play();

    setTimeout(function() {
      if(spaceBarPress === 2) {
        $powerIndicator.removeClass("power-indicator-move-return");
        $powerIndicator.addClass("power-indicator-move-left");
      }
      else if(spaceBarPress === 1) {
        $powerIndicator.removeClass("power-indicator-move-right");
        $powerIndicator.addClass("power-indicator-move-return");
        $indicatorTrail.removeClass("expand-trail");
        $indicatorTrail.addClass("retract-trail");

        meterDownAudio.muted = false;
        meterDownAudio.play();
      }
      else {
        $powerIndicator.removeClass("power-indicator-move-right");
        $powerIndicator.addClass("power-indicator-move-return");
      }

      setTimeout(function() {
        if(spaceBarPress === 2) {
          $powerIndicator.removeClass("power-indicator-move-return");
          $powerIndicator.addClass("power-indicator-finish-left");
        }
        else {
          $powerIndicator.removeClass("power-indicator-move-right");
          $powerIndicator.addClass("power-indicator-move-return");
        }

        $powerIndicator.removeClass("power-indicator-move-return");
        indicatorGhostPositionX = $powerIndicator.position().left;

        setTimeout(function() {
          if(spaceBarPress === 1) {
            spaceBarPress = 0;
          }
          $indicatorTrail.removeClass("expand-trail");
          $indicatorTrail.removeClass("retract-trail");
          $powerIndicator.removeClass("power-indicator-move-right");
          $powerIndicator.removeClass("power-indicator-move-left");
          $powerIndicator.removeClass("power-indicator-finish-left");
        }, 700);
      }, 1200);
    }, 1200);

    spaceBarPress = 1;
  }


  function spacebarPress2() {
    indicatorGhostPositionX = $powerIndicator.position().left;

    if(indicatorGhostPositionX > 9) {
      meterUpAudio.muted = true;
      meterDownAudio.muted = true;
      meterPressAudio.muted = false;
      meterPressAudio.play();

      $indicatorTrail.removeClass("expand-trail");
      $indicatorTrail.removeClass("retract-trail");
      $indicatorTrail.css("width", indicatorGhostPositionX + "px");
      $indicatorGhost.css("left", indicatorGhostPositionX + 7 + "px");
      $indicatorGhost.removeClass("hidden");

      shotPower = Math.floor($powerIndicator.position().left);
      spaceBarPress = 2;

      console.log("");
      console.log("shotPower = " + shotPower);

      checkIndicatorPos();
    }
  }


  function spacebarPress3() {
    indicatorGhostPositionX = $powerIndicator.position().left;

    meterPressAudio.muted = false;
    meterPressAudio.currentTime = 0;
    meterPressAudio.play();

    if(indicatorGhostPositionX > 10) {
      $powerIndicator.css("left", indicatorGhostPositionX + 7 + "px");
      releasePoint = Math.floor(indicatorGhostPositionX);

      console.log("releasePoint = " + releasePoint);
    }
    else {
      $powerIndicator.css("left", indicatorGhostPositionX * 2 + "px");
      releasePoint = Math.floor(indicatorGhostPositionX);

      console.log("releasePoint = " + releasePoint);
    }

    setTimeout(function() {
      playerShot();
    }, 1340);

    $powerIndicator.removeClass("power-indicator-move-right");
    $powerIndicator.removeClass("power-indicator-move-return");
    $powerIndicator.removeClass("power-indicator-move-left");
    $powerIndicator.removeClass("power-indicator-finish-left");

    spaceBarPress = 3;
  }

/* ---------------------------- Event Handlers ---------------------------- */

  $(document).keydown(function(event) {
    if(event.which === 32 && spaceBarPress === 0) {
      spacebarPress1();
    }
    else if(event.which === 32 && spaceBarPress === 1) {
      spacebarPress2();
    }
    else if(event.which === 32 && spaceBarPress === 2) {
      spacebarPress3();
    }
  });

});

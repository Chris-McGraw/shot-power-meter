$(document).ready(function() {

/* ------------------------- Variable Declarations ------------------------- */

  var $disc = $("#disc");
  var $discShadow = $("#disc-shadow");
  var $powerIndicator = $("#power-indicator");
  var $indicatorTrail = $("#indicator-trail");
  var $indicatorGhost = $("#indicator-ghost");

  var indicatorGhostPositionX = 0;
  var spaceBarPress = 0;

  var shotLoopValue = 0;
  var shotPower = 0;
  var shotLength1 = 0;
  var shotLength2 = 0;
  var releasePoint = 0;
  var shotLoopCount1 = 0;
  var shotLoopCount2 = 0;

  var releaseLoopValue = 0;
  var releaseLoopCount1 = 0;
  var releaseLoopCount2 = 0;

/* ------------------------- Function Declarations ------------------------- */

  function playerShot() {
    for(shotLoopValue = 217; shotLoopValue > 0; shotLoopValue -= 7) {
      if(shotPower >= (shotLoopValue - 6) && shotPower <= (shotLoopValue)) {
      /* ------------ Good Release ------------ */
        if(releasePoint >= -9 && releasePoint <= 9) {
        /* ----- Shot Part 1 ----- */
          shotLength1 = -217 - (-7 * shotLoopCount1);
          $disc.addClass("disc-shot-1");
          $disc.css({"transform": "translate(20px," + shotLength1 + "px) rotate(90deg)"});

          console.log("shotLength1 = " + shotLength1);

          shadowMultiplier1 = Math.floor(shotLength1 * 0.15);
          shadowShotLength1 = (shotLength1 - shadowMultiplier1);
          $discShadow.addClass("disc-shadow-shot-1");
          $discShadow.css({"transform": "translate(20px," + shadowShotLength1 + "px) rotate(90deg)"});

        /* ----- Shot Part 2 ----- */
          setTimeout(function() {
            shotLength2 = -310 - (-10 * shotLoopCount2);
            $disc.addClass("disc-shot-2");
            $disc.css({"transform": "translate(0px," + shotLength2 + "px) rotate(90deg)"});

            console.log("shotLength2 = " + shotLength2);
            console.log("");

            shadowShotLength2 = shotLength2;
            $discShadow.addClass("disc-shadow-shot-2");
            $discShadow.css({"transform": "translate(0px," + shadowShotLength2 + "px) rotate(90deg)"});
          }, 1000);
        }

      /* ---------- Right Release 1 ---------- */
        else if(releasePoint >= 10 && releasePoint <= 63) {
          for(releaseLoopValue = 63; releaseLoopValue >= 15; releaseLoopValue -= 6) {
            if(releasePoint >= (releaseLoopValue - 5) && releasePoint <= (releaseLoopValue)) {
        /* ----- Shot Part 1 ----- */
              console.log("between: " + (releaseLoopValue - 5));
              console.log("and: " + releaseLoopValue);

              shotLength1 = -217 - (-7 * shotLoopCount1);
              shotWidth1 = 80 - (6.5 * releaseLoopCount1);

              $disc.addClass("disc-shot-1");
              $disc.css({"transform": "translate(" + shotWidth1 + "px," + shotLength1 + "px) rotate(90deg)"});

              console.log("shotLength1 = " + shotLength1);

              shadowMultiplier1 = Math.floor(shotLength1 * 0.15);
              shadowShotLength1 = (shotLength1 - shadowMultiplier1);
              $discShadow.addClass("disc-shadow-shot-1");
              $discShadow.css({"transform": "translate(" + shotWidth1 + "px," + shadowShotLength1 + "px) rotate(90deg)"});

        /* ----- Shot Part 2 ----- */
              setTimeout(function() {
                shotLength2 = -310 - (-10 * shotLoopCount2);
                shotWidth2 = 120 - (13 * releaseLoopCount2);

                $disc.addClass("disc-shot-2");
                $disc.css({"transform": "translate(" + shotWidth2 + "px," + shotLength2 + "px) rotate(90deg)"});

                console.log("shotLength2 = " + shotLength2);
                console.log("");

                shadowShotLength2 = shotLength2;
                $discShadow.addClass("disc-shadow-shot-2");
                $discShadow.css({"transform": "translate(" + shotWidth2 + "px," + shadowShotLength2 + "px) rotate(90deg)"});
              }, 1000);
            }
            releaseLoopCount1++;
            setTimeout(function() {
              releaseLoopCount2++;
            }, 1000);
          }
        }

        /* ---------- Right Release 2 ---------- */
          else if(releasePoint >= -27 && releasePoint <= -8) {
            for(releaseLoopValue = -27; releaseLoopValue <= -12; releaseLoopValue += 5) {
              if(releasePoint >= (releaseLoopValue) && releasePoint <= (releaseLoopValue + 4)) {
          /* ----- Shot Part 1 ----- */
                console.log("between: " + (releaseLoopValue + 4));
                console.log("and: " + releaseLoopValue);

                shotLength1 = -217 - (-7 * shotLoopCount1);
                shotWidth1 = 67 - (13 * releaseLoopCount1);

                $disc.addClass("disc-shot-1");
                $disc.css({"transform": "translate(" + shotWidth1 + "px," + shotLength1 + "px) rotate(90deg)"});

                console.log("shotLength1 = " + shotLength1);

                shadowMultiplier1 = Math.floor(shotLength1 * 0.15);
                shadowShotLength1 = (shotLength1 - shadowMultiplier1);
                $discShadow.addClass("disc-shadow-shot-1");
                $discShadow.css({"transform": "translate(" + shotWidth1 + "px," + shadowShotLength1 + "px) rotate(90deg)"});

          /* ----- Shot Part 2 ----- */
                setTimeout(function() {
                  shotLength2 = -310 - (-10 * shotLoopCount2);
                  shotWidth2 = 94 - (26 * releaseLoopCount2);

                  $disc.addClass("disc-shot-2");
                  $disc.css({"transform": "translate(" + shotWidth2 + "px," + shotLength2 + "px) rotate(90deg)"});

                  console.log("shotLength2 = " + shotLength2);
                  console.log("");

                  shadowShotLength2 = shotLength2;
                  $discShadow.addClass("disc-shadow-shot-2");
                  $discShadow.css({"transform": "translate(" + shotWidth2 + "px," + shadowShotLength2 + "px) rotate(90deg)"});
                }, 1000);
              }
              releaseLoopCount1++;
              setTimeout(function() {
                releaseLoopCount2++;
              }, 1000);
            }
          }

      }
      shotLoopCount1++;
      setTimeout(function() {
        shotLoopCount2++;
      }, 1000);
    }
  /* ----- Shot Reset Functionality ----- */
    setTimeout(function() {
      $disc.removeClass("disc-shot-1");
      $disc.removeClass("disc-shot-2");
      $disc.removeAttr("style");
      $disc.addClass("disc-return");

      $discShadow.removeClass("disc-shadow-shot-1");
      $discShadow.removeClass("disc-shadow-shot-2");
      $discShadow.removeAttr("style");
      $discShadow.addClass("disc-return");

      shotLoopCount1 = 0;
      shotLoopCount2 = 0;

      releaseLoopCount1 = 0;
      releaseLoopCount2 = 0;

    }, 3000);
  }


  function spacebarPress1() {
    $powerIndicator.addClass("power-indicator-move-right");
    $indicatorTrail.addClass("expand-trail");

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
          $indicatorTrail.removeClass("expand-trail");
          $indicatorTrail.removeClass("retract-trail");
          $indicatorTrail.css("width", "4px");
          $indicatorGhost.addClass("hidden");
          $powerIndicator.removeClass("power-indicator-move-right");
          $powerIndicator.removeClass("power-indicator-move-left");
          $powerIndicator.removeClass("power-indicator-finish-left");
          $powerIndicator.css("left", "0px");
          spaceBarPress = 0;
        }, 700);
      }, 1200);
    }, 1200);

    spaceBarPress = 1;
  }


  function spacebarPress2() {
    indicatorGhostPositionX = $powerIndicator.position().left;

    if(indicatorGhostPositionX > 0) {
      $indicatorTrail.removeClass("expand-trail");
      $indicatorTrail.removeClass("retract-trail");
      $indicatorTrail.css("width", indicatorGhostPositionX + "px");
      $indicatorGhost.css("left", indicatorGhostPositionX + 7 + "px");
      $indicatorGhost.removeClass("hidden");

      shotPower = Math.floor($powerIndicator.position().left);
      spaceBarPress = 2;

      console.log("shotPower = " + shotPower);
    }
  }


  function spacebarPress3() {
    indicatorGhostPositionX = $powerIndicator.position().left;

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

    playerShot();

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

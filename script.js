$(document).ready(function() {

/* ------------------------- Variable Declarations ------------------------- */

  var $shotPreview1 = $("#shot-preview-1");
  var $shotPreview2 = $("#shot-preview-2");
  var $shotPreviewAccent = $("#shot-preview-accent");
  var $discContainer = $("#disc-container");
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
  var shotLoopCount1 = 0;
  var shotLoopCount2 = 0;

  var releaseLoopValue = 0;
  var releasePoint = 0;
  var shotWidth1 = 0;
  var shotWidth2 = 0;
  var releaseLoopCount1 = 0;
  var releaseLoopCount2 = 0;

/* ------------------------- Function Declarations ------------------------- */

  function shotPreviewLoop() {
    setTimeout(function() {
      $shotPreviewAccent.addClass("shot-preview-accent-move-1");
    }, 0);

    setTimeout(function() {
      $shotPreviewAccent.addClass("shot-preview-accent-move-2");
    }, 2000);

    setTimeout(function() {
      $shotPreviewAccent.removeClass("shot-preview-accent-move-1");
      $shotPreviewAccent.removeClass("shot-preview-accent-move-2");
    }, 3200);

    setTimeout(function() {
      shotPreviewLoop();
    }, 3600);
  }


  function shotStep() {
    $disc.addClass("disc-shot");
    $disc.css({"transform": "translateY(" + shotLength1 + "px) rotate(720deg)"});

    $discContainer.addClass("disc-shot-end");
    $discContainer.css({"transform": "translateX(" + shotWidth1 + "px)"});

    console.log("shotLength1 = " + shotLength1);
    console.log("shotWidth1 = " + shotWidth1);
    console.log("shotWidth2 = " + shotWidth2);

    shadowMultiplier1 = Math.floor(shotLength1 * 0.15);
    shadowShotLength1 = (shotLength1 - shadowMultiplier1);
    $discShadow.addClass("disc-shot");
    $discShadow.css({"transform": "translateY(" + shadowShotLength1 + "px) rotate(720deg)"});

    setTimeout(function() {
      $discShadow.addClass("disc-shot-end");
      $discShadow.css({"transform": "translateY(" + shotLength1 + "px)"});
      $discContainer.css({"transform": "translateX(" + shotWidth2 + "px)"});
    }, 1200);
  }


  function shotStep1() {
    $disc.addClass("disc-shot-1");
    $disc.css({"transform": "translateY(" + shotLength1 + "px) rotate(90deg)"});

    $discContainer.addClass("disc-shot-1");
    $discContainer.css({"transform": "translateX(" + shotWidth1 + "px)"});

    console.log("shotLength1 = " + shotLength1);
    console.log("shotWidth1 = " + shotWidth1);

    shadowMultiplier1 = Math.floor(shotLength1 * 0.15);
    shadowShotLength1 = (shotLength1 - shadowMultiplier1);
    $discShadow.addClass("disc-shadow-shot-1");
    $discShadow.css({"transform": "translate(" + shotWidth1 + "px," + shadowShotLength1 + "px) rotate(90deg)"});
  }


  function shotStep2() {
    $disc.addClass("disc-shot-2");
    $disc.css({"transform": "translate(" + shotWidth2 + "px," + shotLength2 + "px) rotate(180deg)"});

    console.log("shotLength2 = " + shotLength2);
    console.log("shotWidth2 = " + shotWidth2);

    shadowShotLength2 = shotLength2;
    $discShadow.addClass("disc-shadow-shot-2");
    $discShadow.css({"transform": "translate(" + shotWidth2 + "px," + shadowShotLength2 + "px) rotate(180deg)"});
  }


  function playerShot() {
    for(shotLoopValue = 217; shotLoopValue > 0; shotLoopValue -= 7) {
      if(shotPower >= (shotLoopValue - 6) && shotPower <= (shotLoopValue)) {
        console.log("shotLoopRange = " + (shotLoopValue - 6) + " & " + shotLoopValue);

      /* ------------ Perfect Release ------------ */
        if(releasePoint >= -9 && releasePoint <= 9) {
          console.log("Good Release!");

          shotLength1 = -310 - (-10 * shotLoopCount1);
          shotWidth1 = 8 - (0.25 * shotLoopCount1);
          shotWidth2 = -6 + ( 0.175 * shotLoopCount1);

          shotStep();
        }

      /* ---------- Late Release ---------- */
        else if(releasePoint >= -27 && releasePoint <= -8) {
          for(releaseLoopValue = -27; releaseLoopValue <= -12; releaseLoopValue += 5) {
            if(releasePoint >= (releaseLoopValue) && releasePoint <= (releaseLoopValue + 4)) {
        /* ----- Shot Part 1 ----- */
              console.log("releaseLoopRange = " + (releaseLoopValue + 4) + " & " + releaseLoopValue);

              shotLength1 = -217 - (-7 * shotLoopCount1);
              shotWidth1 = 67 - (13 * releaseLoopCount1);

              shotStep1();
        /* ----- Shot Part 2 ----- */
              setTimeout(function() {
                shotLength2 = -310 - (-10 * shotLoopCount2);
                shotWidth2 = 94 - (26 * releaseLoopCount2);

                shotStep2();
              }, 1000);
            }
            releaseLoopCount1++;
            setTimeout(function() {
              releaseLoopCount2++;
            }, 1000);
          }
        }

      /* ---------- Early Release ---------- */
        else if(releasePoint >= 10 && releasePoint <= 217) {
          for(releaseLoopValue = 217; releaseLoopValue >= 25; releaseLoopValue -= 16) {
            if(releasePoint >= (releaseLoopValue - 15) && releasePoint <= (releaseLoopValue)) {
        /* ----- Shot Part 1 ----- */
              console.log("releaseLoopRange = " + (releaseLoopValue - 6) + " & " + releaseLoopValue);

              shotLength1 = -217 - (-7 * shotLoopCount1);
              shotWidth1 = -40 + (2 * releaseLoopCount1);

              shotStep1();
        /* ----- Shot Part 2 ----- */
              setTimeout(function() {
                shotLength2 = -310 - (-10 * shotLoopCount2);

                if(shotPower >= 80) {
                  shotWidth2 = -110 + (4.5 * releaseLoopCount2);
                }
                else {
                  shotWidth2 = (-110 + (4.5 * releaseLoopCount2)) / 2;
                }

                shotStep2();
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

      $disc.removeClass("disc-shot");

      /* $disc.removeClass("disc-shot-end"); */

      $disc.removeAttr("style");

     /* $disc.addClass("disc-return"); */

      $discContainer.removeClass("disc-shot");
      $discContainer.removeClass("disc-shot-end");
      $discContainer.removeAttr("style");

      $discShadow.removeClass("disc-shadow-shot-1");
      $discShadow.removeClass("disc-shadow-shot-2");

      $discShadow.removeClass("disc-shot");
      $discShadow.removeClass("disc-shot-end");

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

      console.log("");
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

  /* shotPreviewLoop(); */

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

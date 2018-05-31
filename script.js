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

/* ------------------------- Function Declarations ------------------------- */

  function playerShot() {
    for(shotLoopValue = 217; shotLoopValue > 0; shotLoopValue -= 7) {
      if(shotPower >= (shotLoopValue - 6) && shotPower <= (shotLoopValue)) {
        /* console.log("is " + shotPower + " greater than or equal to " + (shotLoopValue - 6));
        console.log("and less than or equal to " + (shotLoopValue) + "?"); */

        shotLength1 = -217 - (-7 * shotLoopCount1);
        $disc.addClass("disc-shot-1");
        $disc.css({"transform": "translate(20px," + shotLength1 + "px) rotate(90deg)"});

        console.log("shotLength1 = " + shotLength1);

        shadowMultiplier1 = Math.floor(shotLength1 * 0.15);
        shadowShotLength1 = (shotLength1 - shadowMultiplier1);
        $discShadow.addClass("disc-shadow-shot-1");
        $discShadow.css({"transform": "translate(20px," + shadowShotLength1 + "px) rotate(90deg)"});

  /* ----- Shot 2 Functionality ----- */
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
    }, 3000);
  }

/* ---------------------------- Event Handlers ---------------------------- */

  $(document).keydown(function(event) {
  /* ------------------- Spacebar Press 1  ------------------- */
    if(event.which === 32 && spaceBarPress === 0) {
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

  /* ------------------- Spacebar Press 2  ------------------- */
    else if(event.which === 32 && spaceBarPress === 1) {
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

  /* ------------------- Spacebar Press 3  ------------------- */
    else if(event.which === 32 && spaceBarPress === 2) {
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
  });

});

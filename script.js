/* ------------------------- IMG File Declarations ------------------------- */

var basketEmptyImg = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529066967/DG-GAME-PROTO/basket-32x48_job1zn.png";
var basketMadeDiscImg = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529066874/DG-GAME-PROTO/basket-made-disc-32x48_jg7qi4.png";
var backhandShot0 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529506728/DG-GAME-PROTO/backhand-drive-0.png";
var backhandShot1 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529683836/DG-GAME-PROTO/backhand-drive-1.png";
var backhandShot2 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529529600/DG-GAME-PROTO/backhand-drive-2.png";
var backhandShot3 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529529600/DG-GAME-PROTO/backhand-drive-3.png";
var backhandShot4 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529529600/DG-GAME-PROTO/backhand-drive-4.png";
var backhandShot5 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529529600/DG-GAME-PROTO/backhand-drive-5.png";
var backhandShot6 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529529600/DG-GAME-PROTO/backhand-drive-6.png";
var backhandShot7 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529684066/DG-GAME-PROTO/backhand-drive-7.png";
var backhandShot8 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529684065/DG-GAME-PROTO/backhand-drive-8.png";
var backhandShot9 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529684066/DG-GAME-PROTO/backhand-drive-9.png";
var backhandShot10 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529684066/DG-GAME-PROTO/backhand-drive-10.png";

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

  var chainHitAudio = document.getElementById("chain-hit-audio");
  chainHitAudio.muted = false;
  chainHitAudio.volume = 0.5;

/* ------------------------- Variable Declarations ------------------------- */

  var $basket = $("#basket");
  var $shotPreviewPointer = $("#shot-preview-pointer");
  var $playerSprite = $("#player-sprite");
  var $discTemp = $("#disc-temp");
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

      backhandShotAnimation();

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


  function backhandShotAnimation() {
    $playerSprite.attr("src", backhandShot0);
    $playerSprite.addClass("player-drive-movement");
    $disc.addClass("player-drive-movement");
    $discShadow.addClass("player-drive-movement");
    $discTemp.addClass("player-drive-movement");

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot1);
    }, 180);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot2);
      $discTemp.addClass("hidden");
      $discTemp.removeClass("player-drive-movement");
    }, 360);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot3);
    }, 540);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot4);
    }, 720);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot5);
    }, 900);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot6);
    }, 1080);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot2);
    }, 1170);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot7);
    }, 1260);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot8);
    }, 1350);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot9);
    }, 1440);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot10);
    }, 2340);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot0);
    }, 2520);
  }


  function shotStep() {
    $disc.addClass("disc-shot");
    $disc.css({"transform": "translateY(" + shotLength1 + "px) rotate(270deg)"});

    $discContainer.addClass("disc-shot-end");
    $discContainer.css({"transform": "translateX(" + shotWidth1 + "px)"});

    console.log("shotLength1 = " + shotLength1);
    console.log("shotWidth1 = " + shotWidth1);
    console.log("shotWidth2 = " + shotWidth2);

    shadowMultiplier1 = Math.floor(shotLength1 * 0.15);
    shadowShotLength1 = (shotLength1 - shadowMultiplier1);
    $discShadow.addClass("disc-shot");
    $discShadow.css({"transform": "translateY(" + shadowShotLength1 + "px) rotate(270deg)"});

    setTimeout(function() {
      $discShadow.addClass("disc-shot-end");
      $discShadow.css({"transform": "translateY(" + shotLength1 + "px)"});
      $discContainer.css({"transform": "translateX(" + shotWidth2 + "px)"});
    }, 1200);
  }


  function playerShot() {
    for(shotLoopValue = 217; shotLoopValue > 0; shotLoopValue -= 7) {
      if(shotPower >= (shotLoopValue - 6) && shotPower <= (shotLoopValue)) {
        console.log("shotLoopRange = " + (shotLoopValue - 6) + " & " + shotLoopValue);

        $shotPreviewPointer.addClass("hidden");
        $discContainer.css("z-index", "2");

      /* ------------ Good Release Early ------------ */
        if(releasePoint >= 1 && releasePoint <= 9) {
          for(releaseLoopValue = 9; releaseLoopValue >= 3; releaseLoopValue -= 3) {
            if(releasePoint >= (releaseLoopValue - 2) && releasePoint <= (releaseLoopValue)) {
              console.log("releaseLoopRange = " + (releaseLoopValue - 2) + " & " + releaseLoopValue);
              console.log("----- Good Release Early -----");

              shotLength1 = -310 - (-10 * shotLoopCount1);
              shotWidth1 = -18 - (-3.15 * releaseLoopCount1);
              shotWidth2 = -40 - (-3.87 * releaseLoopCount1);

              shotStep();
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

              shotLength1 = -310 - (-10 * shotLoopCount1);
              shotWidth1 = 32 - (6.65 * releaseLoopCount1);
              shotWidth2 = 29 - (8.5 * releaseLoopCount1);

              shotStep();
            }
            releaseLoopCount1++;
          }
        }

      /* ------------ Perfect Release ------------ */
        else if(releasePoint === 0) {
          console.log("releaseLoopRange = 0");
          console.log("----- Perfect Release -----");

          shotLength1 = -310 - (-10 * shotLoopCount1);
          shotWidth1 = 8;
          shotWidth2 = -6;

          shotStep();

        /* ------- ACE Functionality ------- */
          if(shotPower >= 211 && shotPower <= 217) {
            setTimeout(function() {
              $disc.addClass("hidden");
              $discShadow.addClass("hidden");
              $basket.attr("src", basketMadeDiscImg);
              chainHitAudio.play();
            }, 2200);
          }
        }

      /* ---------- Early Release ---------- */
        else if(releasePoint >= 10 && releasePoint <= 217) {
          for(releaseLoopValue = 217; releaseLoopValue >= 17; releaseLoopValue -= 8) {
            if(releasePoint >= (releaseLoopValue - 7) && releasePoint <= (releaseLoopValue)) {
              console.log("releaseLoopRange = " + (releaseLoopValue - 7) + " & " + releaseLoopValue);
              console.log("----- Early Release -----");

              shotLength1 = -310 - (-10 * shotLoopCount1);
              shotWidth1 = -80 - (-2.10 * releaseLoopCount1);
              shotWidth2 = -120 - (-2.58 * releaseLoopCount1);

              shotStep();
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

              shotLength1 = -310 - (-10 * shotLoopCount1);
              shotWidth1 = 80 - (13 * releaseLoopCount1);

              if(releasePoint <= - 19) {
                shotWidth2 =  120 - (30 * releaseLoopCount1);
              }
              else if(releasePoint <= - 16 && releasePoint >= -18) {
                shotWidth1 = 50;
                shotWidth2 = 47;
              }
              else if(releasePoint <= - 13 && releasePoint >= -15) {
                shotWidth1 = 47;
                shotWidth2 = 43;
              }
              else if(releasePoint <= - 10 && releasePoint >= -12) {
                shotWidth1 = 44;
                shotWidth2 = 40;
              }

              shotStep();
            }
            releaseLoopCount1++;
          }
        }

      }
      shotLoopCount1++;
    }
  /* ----- Shot Reset Functionality ----- */
    setTimeout(function() {
      $basket.attr("src", basketEmptyImg);
      $shotPreviewPointer.removeClass("hidden");
      $playerSprite.removeClass("player-drive-movement");
      $discTemp.removeClass("hidden");
      $discContainer.removeClass("disc-shot-end");
      $discContainer.removeAttr("style");
      $discContainer.css("z-index", "1");
      $disc.removeClass("hidden");
      $disc.removeClass("disc-shot");
      $disc.removeAttr("style");
      $disc.removeClass("player-drive-movement");
      $discShadow.removeClass("hidden");
      $discShadow.removeClass("player-drive-movement");
      $discShadow.removeClass("disc-shot");
      $discShadow.removeClass("disc-shot-end");
      $discShadow.removeAttr("style");
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

    meterUpAudio.muted = true;
    meterDownAudio.muted = true;

    meterPressAudio.muted = false;
    meterPressAudio.play();

    if(indicatorGhostPositionX > 9) {
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

    backhandShotAnimation();

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

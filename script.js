$(document).ready(function() {

/* ------------------------- Variable Declarations ------------------------- */

  var chainHitAudio = document.getElementById("chain-hit-audio");
  chainHitAudio.muted = false;
  chainHitAudio.volume = 0.5;

  var basketEmptyImg = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529066967/basket-32x48_job1zn.png";
  var basketMadeDiscImg = "https://res.cloudinary.com/dtwyohvli/image/upload/v1529066874/basket-made-disc-32x48_jg7qi4.png";
  var backhandShot0 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1528561402/player-sprite-back-32x32_kp6fe7.png";
  var backhandShot1 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1528648833/backhand-shot-1_vkf3os.png";
  var backhandShot2 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1528648833/backhand-shot-2_l84gyv.png";
  var backhandShot3 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1528648833/backhand-shot-3_sm2bjv.png";
  var backhandShot4 = "https://res.cloudinary.com/dtwyohvli/image/upload/v1528901321/backhand-shot-4_lnrbf5.png";

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

  function backhandShotAnimation() {
    $playerSprite.attr("src", backhandShot0);
    $playerSprite.addClass("player-drive-movement");
    $disc.addClass("player-drive-movement");
    $discShadow.addClass("player-drive-movement");

    setTimeout(function() {
      $discTemp.addClass("hidden");
    }, 100);

    setTimeout(function() {
      $discTemp.addClass("hidden");
      $playerSprite.attr("src", backhandShot1);
    }, 150);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot2);
    }, 300);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot3);
    }, 450);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot2);
    }, 600);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot1);
    }, 750);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot0);
    }, 900);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot4);
    }, 1050);

    setTimeout(function() {
      $playerSprite.attr("src", backhandShot0);
    }, 2000);
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

      /* ------------ Good Release Late ------------
        else if(releasePoint >= -9 && releasePoint <= -1) {
          console.log("releaseLoopRange = -9 & -1");
          console.log("----- Good Release Late -----");

          shotLength1 = -310 - (-10 * shotLoopCount1);
          shotWidth1 = 8 - (0.25 * shotLoopCount1);
          shotWidth2 = -6 + ( 0.175 * shotLoopCount1);

          shotStep();
        } */

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
      shotLoopValue = 0;
      shotLoopCount1 = 0;
      releaseLoopValue = 0;
      releaseLoopCount1 = 0;
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

    backhandShotAnimation();

    setTimeout(function() {
      playerShot();
    }, 1050);

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

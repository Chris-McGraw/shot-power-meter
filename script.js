$(document).ready(function() {

/* ------------------------- Variable Declarations ------------------------- */
  var $powerIndicator = $("#power-indicator");
  var $indicatorTrail = $("#indicator-trail");
  var $indicatorGhost = $("#indicator-ghost");

  var indicatorGhostPositionX = 0;
  var spaceBarPress = 0;

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
        else {
          $powerIndicator.removeClass("power-indicator-move-right");
          $powerIndicator.addClass("power-indicator-move-return");
          $indicatorTrail.removeClass("expand-trail");
          $indicatorTrail.addClass("retract-trail");
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
      $indicatorTrail.removeClass("expand-trail");
      $indicatorTrail.removeClass("retract-trail");
      $indicatorTrail.css("width", indicatorGhostPositionX + "px");
      $indicatorGhost.css("left", indicatorGhostPositionX + 7 + "px");
      $indicatorGhost.removeClass("hidden");

      spaceBarPress = 2;
    }

  /* ------------------- Spacebar Press 3  ------------------- */
    else if(event.which === 32 && spaceBarPress === 2) {
      indicatorGhostPositionX = $powerIndicator.position().left;

      if(indicatorGhostPositionX > 10) {
        $powerIndicator.css("left", indicatorGhostPositionX + 7 + "px");
        /* console.log(indicatorGhostPositionX); */
      }
      else {
        $powerIndicator.css("left", indicatorGhostPositionX * 2 + "px");
        /* console.log(indicatorGhostPositionX); */
      }

      $powerIndicator.removeClass("power-indicator-move-right");
      $powerIndicator.removeClass("power-indicator-move-return");
      $powerIndicator.removeClass("power-indicator-move-left");
      $powerIndicator.removeClass("power-indicator-finish-left");

      spaceBarPress = 3;
    }
  });

});

$(document).ready(function() {

/* ------------------------- Variable Declarations ------------------------- */
  var $powerIndicator = $("#power-indicator");
  var $indicatorTrail = $("#indicator-trail");
  var $indicatorGhost = $("#indicator-ghost");

  var indicatorGhostPositionX = 0;
  var spaceBarPress = 0;

  $(document).keydown(function(event) {
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
        }

        setTimeout(function() {
          $powerIndicator.removeClass("power-indicator-move-return");
          $indicatorTrail.removeClass("expand-trail");
          $indicatorTrail.css("width", "4px");
          $indicatorGhost.addClass("hidden");
          indicatorGhostPositionX = $powerIndicator.position().left;
          spaceBarPress = 0;
        }, 1000);
      }, 1000);

      spaceBarPress = 1;
    }

    else if(event.which === 32 && spaceBarPress === 1) {
      indicatorGhostPositionX = $powerIndicator.position().left;
      $indicatorTrail.removeClass("expand-trail");
      $indicatorTrail.css("width", indicatorGhostPositionX - 3 + "px");
      $indicatorGhost.css("left", indicatorGhostPositionX + "px");
      $indicatorGhost.removeClass("hidden");

      spaceBarPress = 2;
    }
  });

});

$(document).ready(function() {

/* ------------------------- Variable Declarations ------------------------- */
  var $powerIndicator = $("#power-indicator");
  var $indicatorTrail = $("#indicator-trail");
  var $indicatorGhost = $("#indicator-ghost");

  var indicatorGhostPositionX = 0;
  var spaceBarPress = 0;

  $(document).keydown(function(event) {
    if(event.which === 32 && spaceBarPress === 0) {
      spaceBarPress = 1;
      $powerIndicator.addClass("power-indicator-move-right");
      $indicatorTrail.addClass("expand-trail");

      setTimeout(function() {
        $powerIndicator.removeClass("power-indicator-move-right");
        $powerIndicator.addClass("power-indicator-move-left");

        setTimeout(function() {
          $powerIndicator.removeClass("power-indicator-move-left");
          $indicatorTrail.removeClass("expand-trail");
          $indicatorTrail.css("width", "4px");
          $indicatorGhost.addClass("hidden");
          indicatorGhostPositionX = $powerIndicator.position().left;
          spaceBarPress = 0;
        }, 1000);
      }, 1000);
    }

    else if(event.which === 32 && spaceBarPress === 1) {
      spaceBarPress = 2;
      indicatorGhostPositionX = $powerIndicator.position().left;
      $indicatorTrail.removeClass("expand-trail");
      $indicatorTrail.css("width", indicatorGhostPositionX - 3 + "px");
      $indicatorGhost.css("left", indicatorGhostPositionX + "px");
      $indicatorGhost.removeClass("hidden");
    }
  });

});

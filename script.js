$(document).ready(function() {

/* ------------------------- Variable Declarations ------------------------- */
  var $powerIndicator = $("#power-indicator");
  var $indicatorTrail = $("#indicator-trail");
  var $indicatorGhost = $("#indicator-ghost");

  var indicatorGhostPositionX = 0;

  $(document).keypress(function(event) {
    if(event.which === 32) {
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
        }, 1000);
      }, 1000);
    }

    if(event.which === 13) {
      indicatorGhostPositionX = $powerIndicator.position().left;
      $indicatorTrail.removeClass("expand-trail");
      $indicatorTrail.css("width", indicatorGhostPositionX - 3 + "px");
      $indicatorGhost.css("left", indicatorGhostPositionX + "px");
      $indicatorGhost.removeClass("hidden");
    }
  });

});

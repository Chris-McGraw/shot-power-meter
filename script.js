$(document).ready(function() {

/* ------------------------- Variable Declarations ------------------------- */
  var $powerIndicator = $("#power-indicator");
  var $indicatorTrail = $("#indicator-trail");

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
        }, 1000);
      }, 1000);
    }
  });

});

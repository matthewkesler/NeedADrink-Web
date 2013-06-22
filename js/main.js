// config
window.NeedADrink = {
   apiUrl: 'http://need-a-drink.herokuapp.com/api/closestDrink?location=',
   maxResults: 10
};

$(function() {
   //prevent scrolling
   document.ontouchmove = function(e){
      e.preventDefault();
   }

   // figure out which view to show
   // if("standalone" in window.navigator && screen.width < 750 && localStorage) {
   //    if(window.navigator.standalone) {
   //       NeedADrink.Finder.init();
   //    }
   //    else {
   //       $("#main").html(Handlebars.compile($("#add-to-homescreen").html())).fadeIn(1000);
   //    }
   // }
   // else {
   //    $("#main").html(Handlebars.compile($("#not-supported").html())).fadeIn(1000);
   // }

   NeedADrink.Finder.init($('#main'));

});


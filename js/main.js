window.NeedADrink = {};

$(function() {

   // figure out which view to show
   // if("standalone" in window.navigator) {
   //    if(window.navigator.standalone) {
   //       NeedADrink.Finder.init();
   //    }
   //    else {
            // prevent scrolling
            //document.ontouchmove = function(e){
            //    e.preventDefault();
            //}
   //       $("#main").html(Handlebars.compile($("#add-to-homescreen").html()));
   //    }
   // }
   // else {
   //    $("#main").html(Handlebars.compile($("#not-supported").html()));
   // }

   NeedADrink.Finder.init($('#main'));

});


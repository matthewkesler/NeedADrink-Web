$(function() {
   // prevent scrolling
   document.ontouchmove = function(e){
       e.preventDefault();
   }

   // figure out which view to show
   if("standalone" in window.navigator) {
      if(window.navigator.standalone) {
         $("#main").html(Handlebars.compile($("#closest-drink").html()));
      }
      else {
         $("#main").html(Handlebars.compile($("#add-to-homescreen").html()));
      }
   }
   else {
      $("#main").html(Handlebars.compile($("#not-supported").html()));
   }

});


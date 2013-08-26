(function($, NeedADrink) {
  NeedADrink.Finder = {
    /**
     * Geolocate and render a new nearby business 
     */
    init: function() {
      var that = this;
         $("#main").fadeOut(function() {
           $("#main").html(Handlebars.compile($("#loading").html())).fadeIn();
         });

         // set index to 0 (for closest business result)
         localStorage.index = 0;
         
         // geolocate
         if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
               // find the closest business using the API
               that.fetchClosestBusinesses(position.coords.latitude, position.coords.longitude);
            },
            function(error) {
               console.log(error);
               $('#main').fadeOut(function() {
                  $('#main').html(Handlebars.compile($("#no-location").html())).fadeIn(1000);
               });
            }, 
            {
               enableHighAccuracy: true
            });
         }
      },
      /**
       * Renders the overal business screen
       * Delegates to renderLocation for that piece
       */
      render: function() {
        var that = this;
         $('#main').fadeOut(function() {
            $("#main").html(Handlebars.compile($("#closest-drink").html()));
            that.renderLocation();
            $('#main').fadeIn(1000);
            that.bind();
         });
      },
      /**
       * Renders just the business location info
       */
      renderLocation: function() {
         var that = this,
             data  = $.parseJSON(localStorage.businesses),
             i = localStorage.index,
             location = (data.businesses[i].location.display_address[0] + ' ' + data.businesses[i].location.display_address[1]).split(' ').join('+').replace(/,/g, ''),
             templateData = {
               staticMapSrc: 'http://maps.googleapis.com/maps/api/staticmap?center='+ location +'&zoom=16&size=275x150&maptype=roadmap&markers=color:red%7Ccolor:red%7C'+ location +'&sensor=true&key=AIzaSyA0O9VcNCYHZarvZm-Xq5NRHOEeYxNKkv0',
               name:         data.businesses[i].name,
               distance:     (parseInt(data.businesses[i].distance) * 0.00062137).toString().substring(0,4),
               address1:     data.businesses[i].location.display_address[0],
               address2:     data.businesses[i].location.display_address[1],
               addressUrl:   data.businesses[i].location.display_address[0] + ' ' + data.businesses[i].location.postal_code,
               yelpUrl:      data.businesses[i].mobile_url                  
             }

         // remove leading 0 for distance if necessary
         if(templateData.distance.charAt(0) == '0') {
            templateData.distance = templateData.distance.substring(1,4);
         }

         var compiled = Handlebars.compile($('#location').html());
         $('#locationPanel').fadeOut(function() {
            $('#locationPanel').html(compiled(templateData)).fadeIn(1000);
         });
      },
      /**
       * Binds buttons and links
       */
      bind: function() {
         var that = this;
         // advance the index or refresh
         $('body').on('click', 'button', function() {
            if($(this).hasClass('nextBtn')) {
               var index = parseInt(localStorage.index);
               // only go to max results
               if(index < NeedADrink.maxResults-1) {
                  index++;
                  $('.next').show();
               }
               else {
                  index = 0; 
                  $('.next').hide();
               }
               localStorage.index = index;
               that.renderLocation();
            }
            else {
               $('#main').fadeOut(function() {
                  that.init();
               });
            }
         });

         $('body').on('click', '.business-info', function() {
            window.location = this.attr('data-url');
         });
      },
      /**
       * Fetches up to the configured number of closest businesses from 
       * the API and writes them to localStorage, then renders
       */
      fetchClosestBusinesses: function(lat, lon) {
         that = this;
         var url = NeedADrink.apiUrl + lat + ',' + lon;
         $.ajax({
            type: 'GET',
            url: url,
            success: function(data) {
               console.log(data);
               localStorage.businesses = JSON.stringify(data);
               that.render();
            },
            error: function(data) {
               console.log(data);
               $('#main').fadeOut(function() {
                  $('#main').html(Handlebars.compile($("#error").html())).fadeIn(1000);
               });
            }
         });
      }
   }
}(jQuery, window.NeedADrink || {}));
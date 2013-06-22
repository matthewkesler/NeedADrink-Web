(function($, NeedADrink) {
   NeedADrink.Finder = {
      init: function() {
         var that = this;
         if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
               that.closestBar(position.coords.latitude, position.coords.longitude);
            },
            function(error) {
               console.log(error);
               that.render($('#error'));
            }, 
            {
               enableHighAccuracy: true
            });
         }
      },
      render: function(template, data) {
         compiled = Handlebars.compile(template.html());
         $('#main').html(compiled(data));
      },
      closestBar: function(lat, lon) {
         that = this;
         console.log('fetching...');
         var url = 'http://need-a-drink.herokuapp.com/api/closestDrink?location=' + lat + ',' + lon;
         $.ajax({
            type: 'GET',
            url: url,
            success: function(data) {
               console.log(data);
               var location = (data.businesses[0].location.display_address[0] + ' ' + data.businesses[0].location.display_address[1]).split(' ').join('+').replace(/,/g, ''),
                   templateData = {
                     staticMapSrc: 'http://maps.googleapis.com/maps/api/staticmap?center='+ location +'&zoom=16&size=250x200&maptype=roadmap&markers=color:red%7Ccolor:red%7C'+ location +'&sensor=true&key=AIzaSyA0O9VcNCYHZarvZm-Xq5NRHOEeYxNKkv0',
                     name: data.businesses[0].name,
                     distance: (parseInt(data.businesses[0].distance) * 0.00062137).toString().substring(0,4),
                     address1: data.businesses[0].location.display_address[0],
                     address2: data.businesses[0].location.display_address[1],
                     url: data.businesses[0].mobile_url                  
                   }

               // remove leading 0 for distance if necessary
               if(templateData.distance.charAt(0) == '0') {
                  console.log('stripping');
                  templateData.distance = templateData.distance.substring(1,4);
               }

               that.render($('#closest-drink'), templateData);

            },
            error: function(data) {
               console.log(data);
               that.render($('#error'));
            }
         });
      }

   }

}(jQuery, window.NeedADrink || {}));
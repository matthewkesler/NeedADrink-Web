(function($, NeedADrink) {
   NeedADrink.Yelp = {
      init: function() {
         var auth = { 
           consumerKey: "CR3Fmd4zjI7xglL05rJ4Gg", 
           consumerSecret: "q0XHkA_sEdxDEshQrs2EA4eRMWc",
           accessToken: "_Kmwp5HuR44dmpMDWSXgL46aLAGZvjyJ",
           accessTokenSecret: "3dnlI9sOnz765ob_LYyH42WY_9E",
           serviceProvider: { 
             signatureMethod: "HMAC-SHA1"
           }
         };

         var terms = 'food';
         var near = 'San+Francisco';

         var accessor = {
           consumerSecret: auth.consumerSecret,
           tokenSecret: auth.accessTokenSecret
         };

         parameters = [];
         parameters.push(['term', terms]);
         parameters.push(['location', near]);
         parameters.push(['callback', 'cb']);
         parameters.push(['oauth_consumer_key', auth.consumerKey]);
         parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
         parameters.push(['oauth_token', auth.accessToken]);
         parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

         var message = { 
           'action': 'http://api.yelp.com/v2/search',
           'method': 'GET',
           'parameters': parameters 
         };

         OAuth.setTimestampAndNonce(message);
         OAuth.SignatureMethod.sign(message, accessor);

         var parameterMap = OAuth.getParameterMap(message.parameters);
         parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
         console.log(parameterMap);

         $.ajax({
           'url': message.action,
           'data': parameterMap,
           'cache': true,
           'dataType': 'jsonp',
           'jsonpCallback': 'cb',
           'success': function(data, textStats, XMLHttpRequest) {
             console.log(data);
             $("body").append(data);
           }
         });      
      }
   }
}(jQuery, window.NeedADrink || {}));
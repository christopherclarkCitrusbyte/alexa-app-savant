const
  matcher = require('../lib/zoneMatcher'),
  action = require('../lib/actionLib'),
  eventAnalytics = require('../lib/eventAnalytics');

module.change_code = 1;
module.exports = function(app,callback){

  var intentDictionary = {
    'intentName' : 'raiseVolume',
    'intentVersion' : '2.0',
    'intentDescription' : 'Increase volume for AV zone by a preset ammount',
    'intentEnabled' : 1
  };

  if (intentDictionary.intentEnabled === 1){
    app.intent('raiseVolume', {
    		"slots":{"ZONE":"ZONE"}
    		,"utterances":["{increasePrompt} volume in {-|ZONE}", "Make {-|ZONE} louder"]
    	}, function(req,res) {
        matcher.zonesMatcher(req.slot('ZONE'), req.slot('ZONE_TWO'))//Parse requested zone and return cleanZones
        .then(function(cleanZones) {
          return action.relativeVolume(cleanZones,6)//increase volume by 12% in cleanZones
          .thenResolve(cleanZones);
        })
        .then(function(cleanZones) {//Inform
          eventAnalytics.send(intentDictionary.intentName,cleanZones,"Zone","SetVolume");
          var voiceMessage = 'Increasing volume in '+ cleanZones[1];
          console.log (intentDictionary.intentName+' Intent: '+voiceMessage+" Note: ()");
          res.say(voiceMessage).send();
        })
        .fail(function(voiceMessage) {//Zone could not be found
          console.log (intentDictionary.intentName+' Intent: '+voiceMessage+" Note: ()");
          res.say(voiceMessage).send();
        });
      return false;
    	}
    );
  }
  callback(intentDictionary);
};

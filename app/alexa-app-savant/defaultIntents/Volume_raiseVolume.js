//Intent includes
var matcher = require('../lib/zoneMatcher');
var savantLib = require('../lib/savantLib');

//Intent exports
module.change_code = 1;
module.exports = function(app,callback){

  //Intent meta information
  var intentDictionary = {
    'intentName' : 'raiseVolume',
    'intentVersion' : '1.0',
    'intentDescription' : 'Increase volume for AV zone by a preset ammount',
    'intentEnabled' : 1
  };

  //Intent Enable/Disable
  if (intentDictionary.intentEnabled === 1){
    //Intent
    app.intent('raiseVolume', {
    		"slots":{"ZONE":"LITERAL"}
    		,"utterances":["{increasePrompt} volume in {systemZones|ZONE}", "Make {systemZones|ZONE} louder"]
    	},function(req,res) {
        //Match request to zone then do something
        matcher.zoneMatcher((req.slot('ZONE')), function (err, cleanZone){
          if (err) {
              voiceMessage = err;
              console.log (intentDictionary.intentName+' Intent: '+voiceMessage+" Note: (Invalid Zone Match)");
              res.say(voiceMessage).send();
              return
          }
    			savantLib.readState(cleanZone+'.CurrentVolume', function(currentVolume) {
    				//adjust volume
            newVolume = Number(currentVolume)+6
            //set volume
            savantLib.serviceRequest([cleanZone],"volume","",[newVolume]);
            //inform
            var voiceMessage = 'Increasing volume in '+ cleanZone;
            console.log (intentDictionary.intentName+' Intent: '+voiceMessage+" Note: ()");
            res.say(voiceMessage).send();
    			});
        });
    	return false;
    	}
    );
  }
  //Return intent meta info to index
  callback(intentDictionary);
};
//Intent includes
var matcher = require('../lib/matchers/zone');
var zoneParse = require('../lib/zoneParse');
var savantLib = require('../lib/savantLib');

//Intent exports
module.change_code = 1;
module.exports = function(app,callback){

  //Intent meta information
  var intentDictionary = {
    'name' : 'lightsOnValue',
    'version' : '1.0',
    'description' : 'Set lighting for AV zone to a percentage',
    'enabled' : 1
  };

  //Intent Enable/Disable
  if (intentDictionary.enabled === 1){
    //Intent
    app.intent('lightsOnValue', {
    		"slots":{"PERCENTAGE":"NUMBER","ZONE":"ZONE"}
    		,"utterances":["{actionPrompt} {on |} lights in {-|ZONE} to {1-100|PERCENTAGE} {percent |}","{actionPrompt} {on |} {-|ZONE} lights to {1-100|PERCENTAGE} {percent |}"]
    	},function(req,res) {
    		//Make sure volume request is between 1-100
    		if (req.slot('PERCENTAGE')> 0 ||req.slot('PERCENTAGE')<101|| req.slot('PERCENTAGE') == null|| typeof(req.slot('PERCENTAGE')) == 'undefined' ){
          log.error("Raw Lighting request: "+req.slot('PERCENTAGE'))
        }else {
          var voiceMessage = 'I didnt understand please try again. Say a number between 1 and 100';
          log.error (intentDictionary.name+' Intent: '+voiceMessage+" Note: ()");
          res.say(voiceMessage).send();
          return
        }
        ///Match request to zone then do something
        matcherZone.single((req.slot('ZONE')), function (err, cleanZone){
          if (err) {
              voiceMessage = err;
              log.error (intentDictionary.name+' Intent: '+voiceMessage+" Note: (Invalid Zone Match)");
              res.say(voiceMessage).send();
              return
          }
      		//Set Lighting
    			savantLib.serviceRequest([cleanZone],"lighting","",[req.slot('PERCENTAGE')]);

          //inform
          var voiceMessage = "Setting lights to to "+req.slot('PERCENTAGE')+" percent in "+ cleanZone;
          log.error (intentDictionary.name+' Intent: '+voiceMessage+" Note: ()");
          res.say(voiceMessage).send();
        });
    	return false;
    	}
    );
  }
  //Return intent meta info to index
  callback(intentDictionary);
};

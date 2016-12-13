//Intent includes
var didYouMean = require('didYouMean');
var zoneParse = require('../lib/zoneParse');
var savantLib = require('../lib/savantLib');

//Intent exports
module.change_code = 1;
module.exports = function(app,callback){

//Intent meta information
  var intentDictionary = {
    'intentName' : 'powerOn',
    'intentVersion' : '1.0',
    'intentDescription' : 'Power on requested zone with last used service',
    'intentEnabled' : 1
  };

//Intent Enable/Disable
  if (intentDictionary.intentEnabled === 1){

//Intent
    app.intent('powerOn', {
        "slots":{"ZONE":"LITERAL"}
        ,"utterances":["{actionPrompt} on {systemZones|ZONE}"]
      },function(req,res) {
        //get zone list and match to request
        zoneParse.getZones(zoneInfo, function (err, foundZones) {
          //console.log("Found the following zones: ");
          //console.log(req.slot('ZONE'));
          //console.log(foundZones);
          cleanState = didYouMean(req.slot('ZONE'), foundZones)+'.LastActiveService';

          //get last Service, remove LF, put in array
          savantLib.readState(cleanState, function(LastActiveService) {
            console.log('LastActiveService: '+LastActiveService);

            if (LastActiveService){
              //console.log("last service:  " +LastActiveService);
              LastActiveService = LastActiveService.replace(/(\r\n|\n|\r)/gm,"");
              cleanStateArray = LastActiveService.split("-");
              //console.log("last service:  " +cleanStateArray);

              console.log('Power On Intent: Turning on '+cleanStateArray[1]+' in '+req.slot('ZONE'));
              savantLib.serviceRequest([cleanStateArray[0],cleanStateArray[1],cleanStateArray[2],cleanStateArray[3],cleanStateArray[4],"PowerOn"],"full");
              savantLib.serviceRequest([cleanStateArray[0],cleanStateArray[1],cleanStateArray[2],cleanStateArray[3],cleanStateArray[4],"Play"],"full");
              res.say('Turning on '+cleanStateArray[1]+ 'in '+req.slot('ZONE')).send();
            }else{
              console.log('Power On Intent: No previous service. Please choose a service to turn on');
              res.say('No previous service. Please choose a service to turn on').send();
            }
          });
        });
        return false;
      }
    );
  }
//Return intent meta info to index
  callback(intentDictionary);
};

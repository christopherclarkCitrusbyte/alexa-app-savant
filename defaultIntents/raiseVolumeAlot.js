var didYouMean = require('didYouMean');
var zoneParse = require('../zoneParse');
var savantLib = require('../savantLib');

module.change_code = 1;
module.exports = function(app,callback){
  var intentArray = [
    intentName = 'raiseVolumeAlot',
    intentVersion = '1.0',
    intentDescription = 'Increase volume for AV zone by a large preset ammount'
  ];

  app.intent('raiseVolumeAlot', {
  		"slots":{"ZONE":"LITERAL"}
  		,"utterances":["raise volume in {systemZones|ZONE} a lot", "Make {systemZones|ZONE} much louder"]
  	},function(req,res) {
  		//make a list of zones and make sure it matches request
  		zoneParse.getZones(zoneInfo, function (err, foundZones) {
  			var ZoneName = didYouMean(req.slot('ZONE'), foundZones);

  			savantLib.readState(ZoneName+'.CurrentVolume', function(currentVolume) {
  				newVolume = Number(currentVolume)+20
  				savantLib.serviceRequest([ZoneName],"volume","",[newVolume]);
  				res.say("Increasing volume a lot in "+ ZoneName).send();
  			});
  		});
  	return false;
  	}
  );
  callback(intentArray);
};

var dnode = require('dnode');
var savantLib = require('./savantLib');

//Setup any required Savant states
log.error('Setting up fletch button');
savantLib.writeState("userDefined.fletchButton",1);

//start server to receive requests from lambda server
var server = dnode({
    customRequest : function (s, cb) {
			cb(
				savantLib.readState("userDefined.fletchButton" ,function(fletchButton) {
					log.error("look what i found (fletch button): "+ fletchButton);
					if (fletchButton == 1){
						savantLib.readState('Kitchen.ZoneIsActive', function(isActive) {
							log.error("look what i found : "+isActive);
							if (isActive == 0) {
								savantLib.serviceRequest([s],"custom");
							} else {
								savantLib.serviceRequest(["Kitchen","PowerOff"],"zone");
							}
						})
					} else {
						log.error("button disabled, do nothing.");
						//FEEDBACK
					}
				})
			)
    }
});
server.listen(5004);


/*
Lambda function to run

exports.handler = function(event, context, callback) {
  var dnode = require('dnode');

  var d = dnode.connect('<<Savant host WAN address>>',5004);
  d.on('remote', function (remote) {
      remote.customRequest('Lutron_KitchenAV_On', function (s) {
          log.error('maybe i can tell amazon iot something here?');
          d.end();
      });
  });
};
*/

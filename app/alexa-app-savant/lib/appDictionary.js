var zoneParse = require('./zoneParse');
var _ = require('lodash');

GLOBAL.appDictionaryArray = [];

module.exports = function(app){
	obj = {
		"movementPrompt":["move","tell","send","ask"],
		"speedPrompt":["high","medium","low","on","off"],
		"applicationType":["channel","motor","shade","blind"],
		"scenePrompt":["run","excecute","play"],
		"openMovementPrompt":["open","lift","raise"],
		"closeMovementPrompt":["close","drop","lower"],
		"hvacSystemPrompt":["HVAC","A.C.","H.V.A.C.","house","system"],
		"hvacModes":["Heat","Cool","AC","Off","On","auto"],
		"actionPrompt":["Turn","Set","Switch","Power","Start"],
		"disablePrompt":["disable","turn off", "stop"],
		"enablePrompt":["enable","turn on","start","I want to Listen to","I want to watch","switch"],
		"rangePrompt":["High","Hi","Medium","Low"],
		"increasePrompt":["raise","increase","turn up"],
		"decreasePrompt":["lower","decrease","turn down"],
		"lightingPrompt":["Lights","Light","lighting"]
		};

	zoneParse.getZones(zoneInfo, function (err, systemZones) {
		//console.log(systemZones);
		obj.systemZones = systemZones;
		//console.log(obj);
		app.dictionary = obj;

		appDictionaryArray = _.values(app.dictionary.systemZones);
	});

	zoneParse.getServiceNames(serviceOrderPlist, function (err, systemServices){
		//console.log(systemServices);
		obj.services = systemServices;
		//console.log(obj);
		app.dictionary = obj;
	});

	var _dictionaryCheck = setInterval(function() {
	    if (typeof app.dictionary.services != 'undefined' && typeof app.dictionary.systemZones != 'undefined') {
	        clearInterval(_dictionaryCheck);
	        var customSlot = require('./customSlotFile')(app);
			}
	}, 10); // interval set at 100 milliseconds


};

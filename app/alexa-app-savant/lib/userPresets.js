const
  fs = require('fs'),
  path = require('path'),
  plist = require('simple-plist'),
  q = require('q');

module.exports = function(app){
  userPresets = {};

  getPresets()
  log.error("Finished Loading User Presets.")


  function getPresets(){
    var userPresetsFile = path.resolve(__dirname,'../userFiles/userPresets.plist');
    if (fs.existsSync(userPresetsFile)) {
      userPresets = plist.readFileSync(userPresetsFile);
      if ( !userPresets.volume || !userPresets.lighting ){
        makePresets()
        plist.writeFileSync(userPresetsFile, userPresets);
      }
    }else{
      makePresets()
      plist.writeFileSync(userPresetsFile, userPresets);
    }
  }

  function makePresets(){
    userPresets.volume = {};
    userPresets.lighting = {};
    for (var key of app.dictionary.systemZones){
      userPresets.volume[key] =  {};
      userPresets.volume[key]["high"] = 34;
      userPresets.volume[key]["medium"] = 25;
      userPresets.volume[key]["low"] = 15;
      userPresets.lighting[key] =  {};
      userPresets.lighting[key]["high"] = 100;
      userPresets.lighting[key]["medium"] = 50;
      userPresets.lighting[key]["low"] = 25;
    };
    for (var key of app.dictionary.systemGroupNames){
      userPresets.volume[key] =  {};
      userPresets.volume[key]["high"] = 34;
      userPresets.volume[key]["medium"] = 25;
      userPresets.volume[key]["low"] = 15;
      userPresets.lighting[key] =  {};
      userPresets.lighting[key]["high"] = 100;
      userPresets.lighting[key]["medium"] = 50;
      userPresets.lighting[key]["low"] = 25;
    };
  }
};

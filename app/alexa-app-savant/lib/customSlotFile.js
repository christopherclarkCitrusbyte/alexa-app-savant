var fs = require('fs');
var path = require("path");
var logger = fs.createWriteStream(path.join(__dirname, '..', '..', '..','public_html','customSlotTypes.html'), {

});

module.exports = function(app){
  logger.write('<h2>Temporary Intents and Utterances:</h2>');
  logger.write('<b>Initial Intent Schema:</b> <BR>');
  logger.write('{ <br>');
  logger.write('  "intents": [ <br>');
  logger.write('{ <br>');
  logger.write('  "intent": "TEMP", <br>');
  logger.write('  "slots": [] <br>');
  logger.write('} <br>');
  logger.write('] <br>');
  logger.write('} <br>');

  logger.write('<BR>');
  logger.write('<b>Initial Sample Utterances:</b> <BR>');
  logger.write('TEMP	TEMP<br>');

  logger.write('<h2>Custom Slots:</h2>');
  logger.write('<BR>');
  logger.write('<b>Custom Slot Type:</b> ZONE <br>');
  logger.write('<b>Custom Slot Values:</b> <br>');
  for (var key in app.dictionary.systemZones){
    logger.write(app.dictionary.systemZones[key]+'<br>');
  };
  for (var key in app.dictionary.systemGroupNames){
    logger.write(app.dictionary.systemGroupNames[key]+'<br>');
  };

  logger.write('<BR>');
  logger.write('<b>Custom Slot Type:</b> ZONE_TWO <BR>');
  logger.write('<b>Custom Slot Values:</b> <br>');
  for (var key in app.dictionary.systemZones){
    logger.write(app.dictionary.systemZones[key]+'<br>');
  };
  for (var key in app.dictionary.systemGroupNames){
    logger.write(app.dictionary.systemGroupNames[key]+'<br>');
  };
  logger.write('<BR>');
  logger.write('<b>Custom Slot Type:</b> SERVICE<br>');
  logger.write('<b>Custom Slot Values:</b><br>');
  for (var key in app.dictionary.services){
    logger.write(app.dictionary.services[key]+'<br>');
  };
  logger.write('<BR>');
  logger.write('<b>Custom Slot Type:</b> COMMANDREQ<br>');
  logger.write('<b>Custom Slot Values:</b><br>');
  for (var key in app.dictionary.serviceCommands.transport){
    logger.write(app.dictionary.serviceCommands.transport[key]+'<br>');
  };
  logger.write('<BR>');
  logger.write('<b>Custom Slot Type:</b> RANGE<br>');
  logger.write('<b>Custom Slot Values:</b><br>');
  for (var key in app.dictionary.rangePrompt){
    logger.write(app.dictionary.rangePrompt[key]+'<br>');
  };
  logger.write('<BR>');
  logger.write('<b>Custom Slot Type:</b> PERCENTAGE<br>');
  logger.write('<b>Custom Slot Values:</b><br>');
  for (var i = 1; i < 101; i++) {
    logger.write(i.toString()+'<br>');
  };
  logger.write('<BR>');
  logger.write('<b>Custom Slot Type:</b> LIGHTING<br>');
  logger.write('<b>Custom Slot Values:</b><br>');
  for (var key in app.dictionary.lightingPrompt){
    logger.write(app.dictionary.lightingPrompt[key]+'<br>');
  };
  logger.write('<BR>');
  logger.write('<b>Custom Slot Type:</b> CHANNEL<br>');
  logger.write('<b>Custom Slot Values:</b><br>');
  for (var key in appDictionaryChannelsArray){
    logger.write(appDictionaryChannelsArray[key]+'<br>');
  };
appDictionaryChannelsArray
  log.error("Finished Writing customSlotTypes.");
};

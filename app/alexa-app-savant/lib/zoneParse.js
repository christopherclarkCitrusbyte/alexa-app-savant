"use strict";
var plist = require('simple-plist');
var fs = require('fs');
var _ = require('lodash');



function getZones(plistFile, callback) {
  plist.readFile(plistFile, function(err,obj){
    if (err) {
        callback(err, err);
    }
    else {
        obj = obj.ServiceOrderPerZone;
        var ret = []

        for (var key in obj){
          ret.push(key);
        }
        callback(err, ret);
    }
  });
}

function getZoneServices(plistFile, callback) {
  plist.readFile(plistFile, function(err,obj){
    if (err) {
        callback(err, err);
    }
    else {
        obj = obj.ServiceOrderPerZone;
        var ret = []

        for (var key in obj){
          var dic = []
            for (var key2 in obj[key]){
                if (obj[key][key2]["Enabled"]==1){
                dic.push([key,obj[key][key2]["Source Component"],obj[key][key2]["Source Logical Component"],obj[key][key2]["Service Variant ID"],obj[key][key2]["Service Type"],obj[key][key2]["Service Type"],obj[key][key2]["Alias"]]);
                }
              }
              ret[key] = dic;
        }
        callback(err, ret);
    }
  });
}

function getServiceNames(plistFile, callback) {
  plist.readFile(plistFile, function(err,obj){
    if (err) {
        callback(err, err );
    }
    else {
        obj = obj.ServiceOrderPerZone;
        var ret = []
        for (var key in obj){
          for (var key2 in obj[key]){
            let value = obj[key][key2]; // map references is time consuming so let’s do it only once
            let type = _.get(value, 'Service Type');
            let disabledTypes = ["SVC_GEN_GENERIC","SVC_ENV_LIGHTING","SVC_ENV_HVAC",
              "SVC_ENV_SHADE","SVC_SETTINGS_STEREO","SVC_SETTINGS_SURROUNDSOUND",
              "SVC_ENV_GENERALRELAYCONTROLLEDDEVICE","nonService","SVC_ENV_SECURITYCAMERA"
            ];
            if (value.Enabled === 1 && (!type || !_.includes(disabledTypes, type))) {
              ret.push(value["Source Component"]);
              ret.push(value["Alias"]);
            }
          }
        }
        ret= _.uniq(ret, 'id');
        callback(err, ret);
    }
});
}

module.exports = {
getZones: getZones,
getZoneServices: getZoneServices,
getServiceNames: getServiceNames
}

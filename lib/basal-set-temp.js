'use strict';

function reason(rT, msg) {
  rT.reason = (rT.reason ? rT.reason + '. ' : '') + msg;
  console.error(msg);
}

var tempBasalFunctions = {};

tempBasalFunctions.getMaxSafeBasal = function getMaxSafeBasal(profile) {

    var max_daily_safety_multiplier = (isNaN(profile.max_daily_safety_multiplier) || profile.max_daily_safety_multiplier === null) ? 3 : profile.max_daily_safety_multiplier;
    var current_basal_safety_multiplier = (isNaN(profile.current_basal_safety_multiplier) || profile.current_basal_safety_multiplier === null) ? 4 : profile.current_basal_safety_multiplier;

    return Math.min(profile.max_basal, max_daily_safety_multiplier * profile.max_daily_basal, current_basal_safety_multiplier * profile.current_basal);
};

tempBasalFunctions.setTempBasal = function setTempBasal(rate, duration, profile, rT, currenttemp) {
    //var maxSafeBasal = Math.min(profile.max_basal, 3 * profile.max_daily_basal, 4 * profile.current_basal);

    var maxSafeBasal = tempBasalFunctions.getMaxSafeBasal(profile);
    var round_basal = require('./round-basal');
    function adjustMaxSafeBasalRelativeToTddIsf(profile, rate) {
        if (profile.use_autosens_isf_to_calculate_auto_isf_sens) {
          return rate;
        }
        return maxSafeBasal;      
  } // This function is the toggle to enable or disable maxSafeBasal adjustment relative to the TDD ISF if the 'Use TDD ISF to Calculate Sensitivity and Basal Rate' toggle is true.

    if (rate < 0) {
        rate = 0;
    } else if (rate > adjustMaxSafeBasalRelativeToTddIsf(profile, rate)) {
      console.error("TBR " + round_basal(rate,2) + "U/hr limited by maxSafeBasal " + round_basal(adjustMaxSafeBasalRelativeToTddIsf(profile, rate),2) + "U/hr");
      reason(rT, "TBR " + round_basal(rate,2) + "U/hr limited by maxSafeBasal " + round_basal(adjustMaxSafeBasalRelativeToTddIsf(profile, rate),2) + "U/hr");
      rate = adjustMaxSafeBasalRelativeToTddIsf(profile, rate);
    }

    var suggestedRate = round_basal(rate, profile);
    if (typeof(currenttemp) !== 'undefined' && typeof(currenttemp.duration) !== 'undefined' && typeof(currenttemp.rate) !== 'undefined' && currenttemp.duration > (duration-10) && currenttemp.duration <= 120 && suggestedRate <= currenttemp.rate * 1.2 && suggestedRate >= currenttemp.rate * 0.8 && duration > 0 ) {
        rT.reason += ", " + currenttemp.duration + "m left and " + currenttemp.rate + " ~ req " + suggestedRate + "U/hr: no change necessary";
        return rT;
    }

    if (suggestedRate === profile.current_basal) {
      if (profile.skip_neutral_temps === true) {
        if (typeof(currenttemp) !== 'undefined' && typeof(currenttemp.duration) !== 'undefined' && currenttemp.duration > 0) {
          reason(rT, 'Suggested rate is same as profile rate, a temp basal is active, canceling current temp');
          rT.duration = 0;
          rT.rate = 0;
          return rT;
        } else {
          reason(rT, 'Suggested rate is same as profile rate, no temp basal is active, doing nothing');
          return rT;
        }
      } else {
        reason(rT, 'Setting neutral temp basal of ' + profile.current_basal + 'U/hr');
        rT.duration = duration;
        rT.rate = suggestedRate;
        return rT;
      }
    } else {
      rT.duration = duration;
      rT.rate = suggestedRate;
      return rT;
    }
};

module.exports = tempBasalFunctions;

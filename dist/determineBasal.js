var freeaps_determineBasal;(()=>{var e={5546:(e,r,a)=>{var t=a(6880);function o(e,r){r||(r=0);var a=Math.pow(10,r);return Math.round(e*a)/a}function n(e,r){return"mmol/L"===r.out_units?o(e/18,1).toFixed(1):Math.round(e)}var s=1;e.exports=function(e,r,a,i,l,u,m,d,c,h){var g={},p=new Date;if(h&&(p=h),void 0===i||void 0===i.current_basal)return g.error="Error: could not get current basal rate",g;var f=t(i.current_basal,i),b=f,v=new Date;h&&(v=h);var B,M=new Date(e.date),_=o((v-M)/60/1e3,1),x=e.glucose,S=e.noise;B=e.delta>-.5?"+"+o(e.delta,0):o(e.delta,0);var G=Math.min(e.delta,e.short_avgdelta),y=Math.min(e.short_avgdelta,e.long_avgdelta),C=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(x<=10||38===x||S>=3)&&(g.reason="CGM is calibrating, in ??? state, or noise is high");var w=!1;if(x>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+x+"+"+e.delta+") for 5m w/ "+e.short_avgdelta+" mg/dL ~15m change & "+e.long_avgdelta+" mg/dL ~45m change"),console.error("Simulator mode detected (",e.device,"): continuing anyway")):w=!0),_>12||_<-5?g.reason="If current system time "+v+" is correct, then BG data is too old. The last BG data was read "+_+"m ago at "+M:w&&(e.last_cal&&e.last_cal<3?g.reason="CGM was just calibrated":g.reason="CGM data is unchanged ("+x+"+"+e.delta+") for 5m w/ "+e.short_avgdelta+" mg/dL ~15m change & "+e.long_avgdelta+" mg/dL ~45m change"),x<=10||38===x||S>=3||_>12||_<-5||w)return r.rate>b?(g.reason+=". Replacing high temp basal of "+r.rate+" with neutral temp of "+b,g.deliverAt=p,g.temp="absolute",g.duration=30,g.rate=b,g):0===r.rate&&r.duration>30?(g.reason+=". Shortening "+r.duration+"m long zero temp to 30m. ",g.deliverAt=p,g.temp="absolute",g.duration=30,g.rate=0,g):(g.reason+=". Temp "+r.rate+" <= current basal "+b+"U/hr; doing nothing. ",g);var O,T,I,A=i.max_iob;if(void 0!==i.min_bg&&(T=i.min_bg),void 0!==i.max_bg&&(I=i.max_bg),void 0===i.min_bg||void 0===i.max_bg)return g.error="Error: could not determine target_bg. ",g;O=(i.min_bg+i.max_bg)/2;var F=i.exercise_mode||i.high_temptarget_raises_sensitivity,U=100;if(i.half_basal_exercise_target)var j=i.half_basal_exercise_target;else j=160;if(F&&i.temptargetSet&&O>U||i.low_temptarget_lowers_sensitivity&&i.temptargetSet&&O<U){var D=j-U;s=D/(D+O-U),s=o(s=Math.min(s,i.autosens_max),2),process.stderr.write("Sensitivity ratio set to "+s+" based on temp target of "+O+"; ")}else void 0!==l&&l&&(s=l.ratio,process.stderr.write("Autosens ratio: "+s+"; "));if(s&&(b=i.current_basal*s,(b=t(b,i))!==f?process.stderr.write("Adjusting basal from "+f+" to "+b+"; "):process.stderr.write("Basal unchanged: "+b+"; ")),i.temptargetSet);else if(void 0!==l&&l&&(i.sensitivity_raises_target&&l.ratio<1||i.resistance_lowers_target&&l.ratio>1)){T=o((T-60)/l.ratio)+60,I=o((I-60)/l.ratio)+60;var E=o((O-60)/l.ratio)+60;O===(E=Math.max(80,E))?process.stderr.write("target_bg unchanged: "+E+"; "):process.stderr.write("target_bg from "+O+" to "+E+"; "),O=E}if(e.noise>=2){var q=Math.max(1.1,i.noisyCGMTargetMultiplier),W=(Math.min(250,i.maxRaw),o(Math.min(200,T*q))),R=o(Math.min(200,O*q)),z=o(Math.min(200,I*q));process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+O+" to "+R+"; "),T=W,O=R,I=z}var L=T-.5*(T-40),P=o(i.sens,1),k=i.sens;if(void 0!==l&&l&&((k=o(k=i.sens/s,1))!==P?process.stderr.write("ISF from "+P+" to "+k):process.stderr.write("ISF unchanged: "+k)),console.error("; CR:",i.carb_ratio),k=function(e,r,a,t,n,s,i){if(!1===a.auto_isf)return console.error("autoISF disabled in Preferences"),e;if(void 0===a.autoisf_max)return console.error("autoISF_max not defined"),e;if(a.autoisf_max){console.error("autoISF enabled in Preferences"),console.error("autoISF hourly change: "+a.autoisf_hourlychange),console.error("autoISF max: "+a.autoisf_max),console.error("SMB Range Extension: "+a.smb_max_range_extension),console.error("SMB fraction of InsReq: "+a.smb_delivery_ratio);var l=t.autoISF_duration,u=t.autoISF_average,m=a.autoisf_hourlychange;if(0==n.mealCOB&&l>=10)if(u>r){var d=a.autoisf_max,c=l/60,h=m/r,g=1+c*h*(u-r),p=Math.min(d,g);console.error("ISFreductionLevel = "+p+" ;");var f=Math.max(p,i);console.error("dura05_weight = "+c+";  avg05_weight = "+h+"; levelISF = "+g+"; liftISF = "+f),console.error("autoISF reports "+e+" did not do it for "+l+"min; go more aggressive by "+o(g,2)),d<g&&console.error("autoISF reduction "+o(g,2)+" limited by autoisf_max "+d),e=o(a.sens/f,1),console.error("autoISF reports sens is now "+e)}else console.error("autoISF by-passed; avg. glucose "+u+" below target "+r);else n.mealCOB>0?console.error("autoISF by-passed; mealCOB of "+o(n.mealCOB,1)):console.error("autoISF by-passed; BG is only "+l+"min at level "+u);return console.error("autoISF has run. Sens is now "+e),e}}(k,O,i,e,u,0,s),void 0===a)return g.error="Error: iob_data undefined. ",g;var N,Z=a;if(a.length,a.length>1&&(a=Z[0]),void 0===a.activity||void 0===a.iob)return g.error="Error: iob_data missing some property. ",g;var $=((N=void 0!==a.lastTemp?o((new Date(v).getTime()-a.lastTemp.date)/6e4):0)+r.duration)%30;if(console.error("currenttemp:",r,"lastTempAge:",N,"m","tempModulus:",$,"m"),g.temp="absolute",g.deliverAt=p,d&&r&&a.lastTemp&&r.rate!==a.lastTemp.rate&&N>10&&r.duration)return g.reason="Warning: currenttemp rate "+r.rate+" != lastTemp rate "+a.lastTemp.rate+" from pumphistory; canceling temp",m.setTempBasal(0,0,i,g,r);if(r&&a.lastTemp&&r.duration>0){var H=N-a.lastTemp.duration;if(H>5&&N>10)return g.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+H+"m ago; canceling temp",m.setTempBasal(0,0,i,g,r)}var J=o(-a.activity*k*5,2),K=o(6*(G-J));if(K<0&&(K=o(6*(y-J)))<0&&(K=o(6*(e.long_avgdelta-J))),a.iob>0)var Q=o(x-a.iob*k);else Q=o(x-a.iob*Math.min(k,i.sens));var V=Q+K;if(void 0===V||isNaN(V))return g.error="Error: could not calculate eventualBG. ",g;var X=function(e,r,a){return o(a+(e-r)/24,1)}(O,V,J);g={temp:"absolute",bg:x,tick:B,eventualBG:V,insulinReq:0,reservoir:c,deliverAt:p,sensitivityRatio:s};var Y=[],ee=[],re=[],ae=[];Y.push(x),ee.push(x),ae.push(x),re.push(x);var te=function(e,r,a,t){return r?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&t>100?(console.error("SMB disabled due to high temptarget of",t),!1):!0===a.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&a.mealCOB?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of",a.mealCOB),!0):!0===e.enableSMB_after_carbs&&a.carbs?(a.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&t<100?(a.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of",n(t,e)),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(i,d,u,O),oe=i.enableUAM,ne=0,se=0;ne=o(G-J,1);var ie=o(G-J,1);csf=k/i.carb_ratio,console.error("profile.sens:",i.sens,"sens:",k,"CSF:",csf);var le=o(30*csf*5/60,1);ne>le&&(console.error("Limiting carb impact from",ne,"to",le,"mg/dL/5m (",30,"g/h )"),ne=le);var ue=3;s&&(ue/=s);var me=ue;if(u.carbs){ue=Math.max(ue,u.mealCOB/20);var de=o((new Date(v).getTime()-u.lastCarbTime)/6e4),ce=(u.carbs-u.mealCOB)/u.carbs;me=o(me=ue+1.5*de/60,1),console.error("Last carbs",de,"minutes ago; remainingCATime:",me,"hours;",o(100*ce)+"% carbs absorbed")}var he=Math.max(0,ne/5*60*me/2)/csf,ge=90,pe=1;i.remainingCarbsCap&&(ge=Math.min(90,i.remainingCarbsCap)),i.remainingCarbsFraction&&(pe=Math.min(1,i.remainingCarbsFraction));var fe=1-pe,be=Math.max(0,u.mealCOB-he-u.carbs*fe),ve=(be=Math.min(ge,be))*csf*5/60/(me/2),Be=o(u.slopeFromMaxDeviation,2),Me=o(u.slopeFromMinDeviation,2),_e=Math.min(Be,-Me/3);se=0===ne?0:Math.min(60*me/5/2,Math.max(0,u.mealCOB*csf/ne)),console.error("Carb Impact:",ne,"mg/dL per 5m; CI Duration:",o(5*se/60*2,1),"hours; remaining CI (",me," peak):",o(ve,1),"mg/dL per 5m");var xe,Se,Ge,ye,Ce,we=999,Oe=999,Te=999,Ie=x,Ae=999,Fe=999,Ue=999,je=999,De=V,Ee=x,qe=x,We=0,Re=[],ze=[];try{Z.forEach((function(e){var r=o(-e.activity*k*5,2),a=o(-e.iobWithZeroTemp.activity*k*5,2),t=ne*(1-Math.min(1,ee.length/12));De=ee[ee.length-1]+r+t;var n=ae[ae.length-1]+a,s=Math.max(0,Math.max(0,ne)*(1-Y.length/Math.max(2*se,1))),i=Math.min(Y.length,12*me-Y.length),l=Math.max(0,i/(me/2*12)*ve);s+l,Re.push(o(l,0)),ze.push(o(s,0)),COBpredBG=Y[Y.length-1]+r+Math.min(0,t)+s+l;var u=Math.max(0,ie+re.length*_e),m=Math.max(0,ie*(1-re.length/Math.max(36,1))),d=Math.min(u,m);d>0&&(We=o(5*(re.length+1)/60,1)),UAMpredBG=re[re.length-1]+r+Math.min(0,t)+d,ee.length<48&&ee.push(De),Y.length<48&&Y.push(COBpredBG),re.length<48&&re.push(UAMpredBG),ae.length<48&&ae.push(n),COBpredBG<Ae&&(Ae=o(COBpredBG)),UAMpredBG<Fe&&(Fe=o(UAMpredBG)),De<Ue&&(Ue=o(De)),n<je&&(je=o(n));ee.length>18&&De<we&&(we=o(De)),De>Ee&&(Ee=De),(se||ve>0)&&Y.length>18&&COBpredBG<Oe&&(Oe=o(COBpredBG)),(se||ve>0)&&COBpredBG>Ee&&(qe=COBpredBG),oe&&re.length>12&&UAMpredBG<Te&&(Te=o(UAMpredBG)),oe&&UAMpredBG>Ee&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}u.mealCOB&&(console.error("predCIs (mg/dL/5m):",ze.join(" ")),console.error("remainingCIs:      ",Re.join(" "))),g.predBGs={},ee.forEach((function(e,r,a){a[r]=o(Math.min(401,Math.max(39,e)))}));for(var Le=ee.length-1;Le>12&&ee[Le-1]===ee[Le];Le--)ee.pop();for(g.predBGs.IOB=ee,Ge=o(ee[ee.length-1]),ae.forEach((function(e,r,a){a[r]=o(Math.min(401,Math.max(39,e)))})),Le=ae.length-1;Le>6&&!(ae[Le-1]>=ae[Le]||ae[Le]<=O);Le--)ae.pop();if(g.predBGs.ZT=ae,o(ae[ae.length-1]),u.mealCOB>0&&(ne>0||ve>0)){for(Y.forEach((function(e,r,a){a[r]=o(Math.min(401,Math.max(39,e)))})),Le=Y.length-1;Le>12&&Y[Le-1]===Y[Le];Le--)Y.pop();g.predBGs.COB=Y,ye=o(Y[Y.length-1]),V=Math.max(V,o(Y[Y.length-1]))}if(ne>0||ve>0){if(oe){for(re.forEach((function(e,r,a){a[r]=o(Math.min(401,Math.max(39,e)))})),Le=re.length-1;Le>12&&re[Le-1]===re[Le];Le--)re.pop();g.predBGs.UAM=re,Ce=o(re[re.length-1]),re[re.length-1]&&(V=Math.max(V,o(re[re.length-1])))}g.eventualBG=V}console.error("UAM Impact:",ie,"mg/dL per 5m; UAM Duration:",We,"hours"),we=Math.max(39,we),Oe=Math.max(39,Oe),Te=Math.max(39,Te),xe=o(we);var Pe=u.mealCOB/u.carbs;Se=o(Te<999&&Oe<999?(1-Pe)*UAMpredBG+Pe*COBpredBG:Oe<999?(De+COBpredBG)/2:Te<999?(De+UAMpredBG)/2:De),je>Se&&(Se=je),Ie=o(Ie=se||ve>0?oe?Pe*Ae+(1-Pe)*Fe:Ae:oe?Fe:Ue);var ke=Te;if(je<L)ke=(Te+je)/2;else if(je<O){var Ne=(je-L)/(O-L);ke=(Te+(Te*Ne+je*(1-Ne)))/2}else je>Te&&(ke=(Te+je)/2);if(ke=o(ke),u.carbs)if(!oe&&Oe<999)xe=o(Math.max(we,Oe));else if(Oe<999){var Ze=Pe*Oe+(1-Pe)*ke;xe=o(Math.max(we,Oe,Ze))}else xe=oe?ke:Ie;else oe&&(xe=o(Math.max(we,ke)));xe=Math.min(xe,Se),process.stderr.write("minPredBG: "+xe+" minIOBPredBG: "+we+" minZTGuardBG: "+je),Oe<999&&process.stderr.write(" minCOBPredBG: "+Oe),Te<999&&process.stderr.write(" minUAMPredBG: "+Te),console.error(" avgPredBG:",Se,"COB:",u.mealCOB,"/",u.carbs),qe>x&&(xe=Math.min(xe,qe)),g.COB=u.mealCOB,g.IOB=a.iob,g.BGI=J,g.deviation=n(K,i),g.ISF=n(k,i),g.CR=o(i.carb_ratio,2),g.target_bg=n(O,i),g.reason="minPredBG "+n(xe,i)+", minGuardBG "+n(Ie,i)+", IOBpredBG "+n(Ge,i),ye>0&&(g.reason+=", COBpredBG "+n(ye,i)),Ce>0&&(g.reason+=", UAMpredBG "+n(Ce,i)),g.reason+="; ";var $e=Q;$e<40&&($e=Math.min(Ie,$e));var He,Je=L-$e,Ke=240,Qe=240;if(u.mealCOB>0&&(ne>0||ve>0)){for(Le=0;Le<Y.length;Le++)if(Y[Le]<T){Ke=5*Le;break}for(Le=0;Le<Y.length;Le++)if(Y[Le]<L){Qe=5*Le;break}}else{for(Le=0;Le<ee.length;Le++)if(ee[Le]<T){Ke=5*Le;break}for(Le=0;Le<ee.length;Le++)if(ee[Le]<L){Qe=5*Le;break}}te&&Ie<L&&(console.error("minGuardBG",n(Ie,i),"projected below",n(L,i),"- disabling SMB"),te=!1),void 0===i.maxDelta_bg_threshold&&(He=.2),void 0!==i.maxDelta_bg_threshold&&(He=Math.min(i.maxDelta_bg_threshold,.3)),C>He*x&&(console.error("maxDelta "+n(C,i)+" > "+100*He+"% of BG "+n(x,i)+" - disabling SMB"),g.reason+="maxDelta "+n(C,i)+" > "+100*He+"% of BG "+n(x,i)+": SMB disabled; ",te=!1),console.error("BG projected to remain above",n(T,i),"for",Ke,"minutes"),(Qe<240||Ke<60)&&console.error("BG projected to remain above",n(L,i),"for",Qe,"minutes");var Ve=Qe,Xe=i.current_basal*k*Ve/60,Ye=Math.max(0,u.mealCOB-.25*u.carbs),er=(Je-Xe)/csf-Ye;if(Xe=o(Xe),er=o(er),console.error("naive_eventualBG:",Q,"bgUndershoot:",Je,"zeroTempDuration:",Ve,"zeroTempEffect:",Xe,"carbsReq:",er),er>=i.carbsReqThreshold&&Qe<=45&&(g.carbsReq=er,g.reason+=er+" add'l carbs req w/in "+Qe+"m; "),x<L&&a.iob<20*-i.current_basal/60&&G>0&&G>X)g.reason+="IOB "+a.iob+" < "+o(20*-i.current_basal/60,2),g.reason+=" and minDelta "+n(G,i)+" > expectedDelta "+n(X,i)+"; ";else if(x<L||Ie<L){g.reason+="minGuardBG "+n(Ie,i)+"<"+n(L,i);var rr=(Je=O-Ie)/k,ar=o(60*rr/i.current_basal);return ar=30*o(ar/30),ar=Math.min(120,Math.max(30,ar)),m.setTempBasal(0,ar,i,g,r)}if(i.skip_neutral_temps&&g.deliverAt.getMinutes()>=55)return g.reason+="; Canceling temp at "+g.deliverAt.getMinutes()+"m past the hour. ",m.setTempBasal(0,0,i,g,r);if(V<T){if(g.reason+="Eventual BG "+n(V,i)+" < "+n(T,i),G>X&&G>0&&!er)return Q<40?(g.reason+=", naive_eventualBG < 40. ",m.setTempBasal(0,30,i,g,r)):(e.delta>G?g.reason+=", but Delta "+n(B,i)+" > expectedDelta "+n(X,i):g.reason+=", but Min. Delta "+G.toFixed(2)+" > Exp. Delta "+n(X,i),r.duration>15&&t(b,i)===t(r.rate,i)?(g.reason+=", temp "+r.rate+" ~ req "+b+"U/hr. ",g):(g.reason+="; setting current basal of "+b+" as temp. ",m.setTempBasal(b,30,i,g,r)));var tr=2*Math.min(0,(V-O)/k);tr=o(tr,2);var or=Math.min(0,(Q-O)/k);if(or=o(or,2),G<0&&G>X)tr=o(tr*(G/X),2);var nr=b+2*tr;nr=t(nr,i);var sr=r.duration*(r.rate-b)/60;if(sr<Math.min(tr,or)-.3*b)return g.reason+=", "+r.duration+"m@"+r.rate.toFixed(2)+" is a lot less than needed. ",m.setTempBasal(nr,30,i,g,r);if(void 0!==r.rate&&r.duration>5&&nr>=.8*r.rate)return g.reason+=", temp "+r.rate+" ~< req "+nr+"U/hr. ",g;if(nr<=0){if((ar=o(60*(rr=(Je=O-Q)/k)/i.current_basal))<0?ar=0:(ar=30*o(ar/30),ar=Math.min(120,Math.max(0,ar))),ar>0)return g.reason+=", setting "+ar+"m zero temp. ",m.setTempBasal(nr,ar,i,g,r)}else g.reason+=", setting "+nr+"U/hr. ";return m.setTempBasal(nr,30,i,g,r)}if(G<X&&(!d||!te))return e.delta<G?g.reason+="Eventual BG "+n(V,i)+" > "+n(T,i)+" but Delta "+n(B,i)+" < Exp. Delta "+n(X,i):g.reason+="Eventual BG "+n(V,i)+" > "+n(T,i)+" but Min. Delta "+G.toFixed(2)+" < Exp. Delta "+n(X,i),r.duration>15&&t(b,i)===t(r.rate,i)?(g.reason+=", temp "+r.rate+" ~ req "+b+"U/hr. ",g):(g.reason+="; setting current basal of "+b+" as temp. ",m.setTempBasal(b,30,i,g,r));if(Math.min(V,xe)<I&&(!d||!te))return g.reason+=n(V,i)+"-"+n(xe,i)+" in range: no temp required",r.duration>15&&t(b,i)===t(r.rate,i)?(g.reason+=", temp "+r.rate+" ~ req "+b+"U/hr. ",g):(g.reason+="; setting current basal of "+b+" as temp. ",m.setTempBasal(b,30,i,g,r));if(V>=I&&(g.reason+="Eventual BG "+n(V,i)+" >= "+n(I,i)+", "),a.iob>A)return g.reason+="IOB "+o(a.iob,2)+" > max_iob "+A,r.duration>15&&t(b,i)===t(r.rate,i)?(g.reason+=", temp "+r.rate+" ~ req "+b+"U/hr. ",g):(g.reason+="; setting current basal of "+b+" as temp. ",m.setTempBasal(b,30,i,g,r));(tr=o((Math.min(xe,V)-O)/k,2))>A-a.iob&&(g.reason+="max_iob "+A+", ",tr=A-a.iob),nr=t(nr=b+2*tr,i),tr=o(tr,3),g.insulinReq=tr;var ir=o((new Date(v).getTime()-a.lastBolusTime)/6e4,1);if(d&&te&&x>L){var lr=o(u.mealCOB/i.carb_ratio,3);if(!1===i.auto_isf){console.error("autoISF disabled, don't adjust SMB range");var ur=1}else ur=i.smb_max_range_extension;if(ur>1&&console.error("SMB max range extended from default by factor "+ur),void 0===i.maxSMBBasalMinutes){var mr=o(ur*i.current_basal*30/60,1);console.error("profile.maxSMBBasalMinutes undefined: defaulting to 30m")}else a.iob>lr&&a.iob>0?(console.error("IOB",a.iob,"> COB",u.mealCOB+"; mealInsulinReq =",lr),i.maxUAMSMBBasalMinutes?(console.error("profile.maxUAMSMBBasalMinutes:",i.maxUAMSMBBasalMinutes,"profile.current_basal:",i.current_basal),mr=o(i.current_basal*i.maxUAMSMBBasalMinutes/60,1)):(console.error("profile.maxUAMSMBBasalMinutes undefined: defaulting to 30m"),mr=o(30*i.current_basal/60,1))):(console.error("profile.maxSMBBasalMinutes:",i.maxSMBBasalMinutes,"profile.current_basal:",i.current_basal),mr=o(i.current_basal*i.maxSMBBasalMinutes/60,1));var dr=i.bolus_increment,cr=1/dr;if(!1===i.auto_isf)console.error("autoISF disabled, don't adjust SMB ratio"),hr=.5;else var hr=i.smb_delivery_ratio;hr>.5&&console.error("SMB ratio increased from default 0.5 to "+hr);var gr=Math.floor(Math.min(tr*hr,mr)*cr)/cr;ar=o(60*(rr=(O-(Q+we)/2)/k)/i.current_basal),tr>0&&gr<dr&&(ar=0);var pr=0;ar<=0?ar=0:ar>=30?(ar=30*o(ar/30),ar=Math.min(60,Math.max(0,ar))):(pr=o(b*ar/30,2),ar=30),g.reason+=" insulinReq "+tr,gr>=mr&&(g.reason+="; maxBolus "+mr),ar>0&&(g.reason+="; setting "+ar+"m low temp of "+pr+"U/h"),g.reason+=". ";var fr=3;i.SMBInterval&&(fr=Math.min(10,Math.max(1,i.SMBInterval)));var br=o(fr-ir,0),vr=o(60*(fr-ir),0)%60;if(console.error("naive_eventualBG",Q+",",ar+"m "+pr+"U/h temp needed; last bolus",ir+"m ago; maxBolus: "+mr),ir>fr?gr>0&&(g.units=gr,g.reason+="Microbolusing "+gr+"U. "):g.reason+="Waiting "+br+"m "+vr+"s to microbolus again. ",ar>0)return g.rate=pr,g.duration=ar,g}var Br=m.getMaxSafeBasal(i);return nr>Br&&(g.reason+="adj. req. rate: "+nr+" to maxSafeBasal: "+Br+", ",nr=t(Br,i)),(sr=r.duration*(r.rate-b)/60)>=2*tr?(g.reason+=r.duration+"m@"+r.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+nr+"U/hr. ",m.setTempBasal(nr,30,i,g,r)):void 0===r.duration||0===r.duration?(g.reason+="no temp, setting "+nr+"U/hr. ",m.setTempBasal(nr,30,i,g,r)):r.duration>5&&t(nr,i)<=t(r.rate,i)?(g.reason+="temp "+r.rate+" >~ req "+nr+"U/hr. ",g):(g.reason+="temp "+r.rate+"<"+nr+"U/hr. ",m.setTempBasal(nr,30,i,g,r))}},6880:(e,r,a)=>{var t=a(6654);e.exports=function(e,r){var a=20;void 0!==r&&"string"==typeof r.model&&(t(r.model,"54")||t(r.model,"23"))&&(a=40);return e<1?Math.round(e*a)/a:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,r,a)=>{var t=a(5639).Symbol;e.exports=t},9932:e=>{e.exports=function(e,r){for(var a=-1,t=null==e?0:e.length,o=Array(t);++a<t;)o[a]=r(e[a],a,e);return o}},9750:e=>{e.exports=function(e,r,a){return e==e&&(void 0!==a&&(e=e<=a?e:a),void 0!==r&&(e=e>=r?e:r)),e}},4239:(e,r,a)=>{var t=a(2705),o=a(9607),n=a(2333),s=t?t.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":s&&s in Object(e)?o(e):n(e)}},531:(e,r,a)=>{var t=a(2705),o=a(9932),n=a(1469),s=a(3448),i=t?t.prototype:void 0,l=i?i.toString:void 0;e.exports=function e(r){if("string"==typeof r)return r;if(n(r))return o(r,e)+"";if(s(r))return l?l.call(r):"";var a=r+"";return"0"==a&&1/r==-Infinity?"-0":a}},7561:(e,r,a)=>{var t=a(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,t(e)+1).replace(o,""):e}},1957:(e,r,a)=>{var t="object"==typeof a.g&&a.g&&a.g.Object===Object&&a.g;e.exports=t},9607:(e,r,a)=>{var t=a(2705),o=Object.prototype,n=o.hasOwnProperty,s=o.toString,i=t?t.toStringTag:void 0;e.exports=function(e){var r=n.call(e,i),a=e[i];try{e[i]=void 0;var t=!0}catch(e){}var o=s.call(e);return t&&(r?e[i]=a:delete e[i]),o}},2333:e=>{var r=Object.prototype.toString;e.exports=function(e){return r.call(e)}},5639:(e,r,a)=>{var t=a(1957),o="object"==typeof self&&self&&self.Object===Object&&self,n=t||o||Function("return this")();e.exports=n},7990:e=>{var r=/\s/;e.exports=function(e){for(var a=e.length;a--&&r.test(e.charAt(a)););return a}},6654:(e,r,a)=>{var t=a(9750),o=a(531),n=a(554),s=a(9833);e.exports=function(e,r,a){e=s(e),r=o(r);var i=e.length,l=a=void 0===a?i:t(n(a),0,i);return(a-=r.length)>=0&&e.slice(a,l)==r}},1469:e=>{var r=Array.isArray;e.exports=r},3218:e=>{e.exports=function(e){var r=typeof e;return null!=e&&("object"==r||"function"==r)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,r,a)=>{var t=a(4239),o=a(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==t(e)}},8601:(e,r,a)=>{var t=a(4841),o=1/0;e.exports=function(e){return e?(e=t(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,r,a)=>{var t=a(8601);e.exports=function(e){var r=t(e),a=r%1;return r==r?a?r-a:r:0}},4841:(e,r,a)=>{var t=a(7561),o=a(3218),n=a(3448),s=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,l=/^0o[0-7]+$/i,u=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(n(e))return NaN;if(o(e)){var r="function"==typeof e.valueOf?e.valueOf():e;e=o(r)?r+"":r}if("string"!=typeof e)return 0===e?e:+e;e=t(e);var a=i.test(e);return a||l.test(e)?u(e.slice(2),a?2:8):s.test(e)?NaN:+e}},9833:(e,r,a)=>{var t=a(531);e.exports=function(e){return null==e?"":t(e)}}},r={};function a(t){var o=r[t];if(void 0!==o)return o.exports;var n=r[t]={exports:{}};return e[t](n,n.exports,a),n.exports}a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var t=a(5546);freeaps_determineBasal=t})();
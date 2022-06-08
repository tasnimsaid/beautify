__ez.vaep=(function(){var pixels=[],pxURL="/porpoiseant/lemon.gif";function AddPixel(vaID,pixelData,adData){if(__ez.dot.isDefined(vaID)&&__ez.dot.isValid(pixelData)){let pix={type:'video-ad',video_ad_impression_id:vaID,domain_id:__ez.dot.getDID(),t_epoch:__ez.dot.getEpoch(0),data:__ez.dot.dataToStr(pixelData)};if(adData&&adData.hasOwnProperty("impression_id")&&adData.hasOwnProperty("ad_unit")){pix.impression_id=(adData.impression_id).toString();pix.unit=adData.ad_unit;};pixels.push(pix);}}
function Fire(){if(typeof document.visibilityState!=='undefined'&&document.visibilityState==="prerender"){return;}
if(__ez.dot.isDefined(pixels)&&pixels.length>0){while(pixels.length>0){var j=5;if(j>pixels.length){j=pixels.length;}
var pushPixels=pixels.splice(0,j);var pixelURL=__ez.dot.getURL(pxURL)+"?orig="+(__ez.template.isOrig===true?1:0)+"&va="+btoa(JSON.stringify(pushPixels));__ez.dot.Fire(pixelURL);}}
pixels=[];}
return{Add:AddPixel,Fire:Fire};})();
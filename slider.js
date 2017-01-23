/*code slider cijfer geven*/
/* bron = https://www.developphp.com/video/HTML/Slider-Tutorial-Javascript-Function-Programming */

function sliderChange(val) {
    var sliderstatus = document.getElementsByClassName('sliderstatus');
    sliderstatus[0].innerHTML = zinnen[val];
}

var zinnen = new Array();
zinnen[0] = zinnen[1] = zinnen[2] = "Ik had geen  last van spanning";
zinnen[3] = zinnen[4] = "Ik had een beetje last van spanning";
zinnen[5] = zinnen[6] = "Ik had best wel last van spanning";
zinnen[7] = zinnen[8] = "Ik had veel last van spanning";
zinnen[9] = zinnen[10] = "Ik had heel erg last van spanning";



//var slider = document.getElementById("slider");
//console.log(slider);
//slider.onInput = sliderChange(slider.value);






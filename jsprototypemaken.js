function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var d = new Date();
var h = addZero(d.getHours());
var m = addZero(d.getMinutes());
var s = addZero(d.getSeconds());
var tijd = h + ":" + m + ":" + s;

var random = Math.random();

var mijnZinnenAvond = new Array();
mijnZinnenAvond[0] = "Wat heb je vandaag gedaan?";
mijnZinnenAvond[1] = "Wat zou je graag willen doen?";
mijnZinnenAvond[2] = "Wat heb je vandaag bereikt?";
mijnZinnenAvond[3] = "Heb je vandaag iets leuks gedaan?";

var lengteAvond = mijnZinnenAvond.length;

var mijnZinnenOchtend= new Array();
mijnZinnenOchtend[0] = "Wat ga je doen vandaag?";
mijnZinnenOchtend[1] = "Wat zou je graag willen doen?";
mijnZinnenOchtend[2] = "Wat wil je vandaag bereiken?";
mijnZinnenOchtend[3] = "Hoe wil je je voelen vandaag?";

var lengteOchtend = mijnZinnenOchtend.length;

if (d.getHours() >= 12 && d.getMinutes() >= 00) {
   document.getElementById("tekst").innerHTML = mijnZinnenAvond[Math.floor(random*(lengteAvond-1))];
} else{
  document.getElementById("tekst").innerHTML = mijnZinnenOchtend[Math.floor(random*(lengteOchtend-1))];
}


/*menu code*/
var menuIcon = document.getElementById("menu-icon");
var menuList = document.getElementById("menu-list");
menuList.classList.add("is-hidden");

menuIcon.addEventListener('click', function (e) {
    'use strict';
    e.preventDefault();
    menuList.classList.toggle('is-hidden');
});


/* code doet het zinnen veranderen, bij onload*/

/*var random = Math.random();

var mijnZinnen = new Array();
mijnZinnen[0] = "Wat heb je vandaag gedaan?";
mijnZinnen[1] = "Wat zou je graag willen doen?";
mijnZinnen[2] = "Wat heb je vandaag bereikt?";
mijnZinnen[3] = "Heb je vandaag iets leuks gedaan?";

var lengte = mijnZinnen.length;

window.onload = function(){
    document.getElementById("tekst").innerHTML = mijnZinnen[Math.floor(random*(lengte-1))];
}*/




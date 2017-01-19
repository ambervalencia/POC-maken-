var CLIENT_ID = "767701219000-skc85592k6fbterbqcfa63t4bkpu6a4g.apps.googleusercontent.com";

var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

var allEvents = new Array();
      

/**
* Check if current user has authorized this application.
*/
function checkAuth() {
    gapi.auth.authorize(
        {
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': true
        }, handleAuthResult);
}



/**
* Handle response from authorization server. Haalt button weg als gebruiker al toestemming heeft.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
      loadCalendarApi();
    } else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      authorizeDiv.style.display = 'inline';
    }
}

/**
* Initiate auth flow in response to user clicking authorize button.
*
* @param {Event} event Button click event.
*/
function handleAuthClick(event) {
    gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResult);
    return false;
}

/**
* Load Google Calendar client library. List upcoming events
* once client library is loaded.
*/
function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
* Print the summary and start datetime/date of the next ten events in
* the authorized user's calendar. If no events are found an
* appropriate message is printed.
*/
function listUpcomingEvents() {
    var limits = timeLimits();
    var request = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'maxResults': 10,
        'orderBy': 'startTime',
        'showDeleted': false,
        'singleEvents': true,
        'timeMax': limits.end.toISOString(),
        'timeMin': limits.start.toISOString()
        });
          
// var events bevat de verschillende evenementen in de agenda van de gebruiker.
// allEvents slaat de evenementen op in een array die uit de variabelen events komen.
// var index bevat de functie noFinischedEventYet(Events).
    request.execute(function(resp) {
        var events = resp.items;
        allEvents = events;
        if (events.length > 0) {
            var index1 = findEventsBeforeNow(events);
            var index2 = findEventsAfterNow(events);
            //first event of the day.
            if (index1 == -1 ) {
                //no finished events yet
                futureSentence(events[0]);  
                //between two events
            } else if (index2 != -1 ) {
                futureOrPastSentence(events[index1], events[index1 + 1]);
                //every event is done for the day.
            } else if (index1 != -1 && index2 == -1) {
                pastSentence(events[events.length - 1]);
            }
        } else {
            var zin = document.getElementById('passende-zin');
            zin.innerHTML = "Geen evenementen";
        }
    });
}

// Alle onderstaande functies zijn in listUpcomingEvents en in request.execute(function(resp)) gebruikt.

// Wordt object gemaakt met de waardes start en end daarin.
      function timeLimits() {
        var today = new Date();
        // 0:00
        var startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0);
        // 23:59
        var endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59 , 59);

        return {
            end: endOfToday,
            start: startOfToday  
        };
      };

// Zoek naar het eerste event dat klaar is VOOR tijdstip nu (return z). Als deze niet gevonden wordt, dan zijn alle events klaar na tijdstip nu (return -1).
// Alles in de TOEKOMST als -1 wordt gereturned.
function findEventsBeforeNow(events) { 
    var now = new Date()
    for (var z = 0; z < events.length; z++) {
          // Bepaal eindtijd event
          var e = events[z];
          var endEvent = endToEvent(e)

          // Check of eindtijd event eerder is dan tijdstip nu 
          if (endEvent < now) {
            return z;
          }
    }
    // Geen enkel event is afgelopen. return -1.
    return -1;
}

// Zoek naar het eerste event dat klaar is NA tijdstip nu. Als deze niet gevonden wordt, dan zijn alle events klaar voor tijdstip nu (return -1).
// Alles in het VERLEDEN als -1 wordt gereturned.
function findEventsAfterNow(events) {
    var now = new Date();
    for (var z = 0; z < events.length; z++) {
        // Pakt 1 event uit de lijst events.
        var e = events[z];
        var endEvent = endToEvent(e);
            
        // is de einddatum van het evenement later dan nu. dan is het evenement nog niet afgelopen afgelopen.
        if (endEvent > now) {
            return z;
        }
    }
    // Alle events zijn al afgelopen. return -1.
    return -1;
}

// functie vult het element bij id: passende-zin met een toekomstige zin. 
function futureSentence(event) {
    var zin = document.getElementById('passende-zin');
    zin.innerHTML = "Heb je al zin om te gaan:" + event.summary;
 };

// we zijn op het moment tussen twee evenement in.
// checkt of we dichter bij het vorige evenement zijn of bij het volgende evenement. 
// Krijgt eerste en tweede evenement mee vanuit eerdere functie. 
// via de functies endToEvent en startToEvent worden de start en eindtijden van de evenementen opgehaald. 
function futureOrPastSentence(prevEvent, nextEvent) {
    var end = endToEvent(prevEvent);
    var start = startToEvent(nextEvent);
    var now = new Date();

    //hoelang is het geleden dat previous is afgelopen.
    var prev = now.getTime() - end.getTime();
    //hoelang duurt het tot next gaat beginnen.
    var next = start.getTime() - now.getTime();

    //als previous minder lang geleden is dan dat we nog moeten wachten op next.
    if (prev < next) {
        pastSentence(prevEvent);
    } else {
        futureSentence(nextEvent);
    }
}

//zet een tijd string van de calander api om naar een javascript date object.
function endToEvent(event) {
    return new Date(Date.parse(event.end.dateTime));
};

function startToEvent(event) {
    return new Date(Date.parse(event.start.dateTime));
};

// functie vult het element bij id: passende-zin met een verledentijd zin. 
function pastSentence(event) {
    var zin = document.getElementById('passende-zin');
    zin.innerHTML = "Hoe ging: " + event.summary + " ?";
};

    
window.onload = function() {
  //haal de calendar data de eerste keer op.
  checkAuth()
  //en na elke 3 seconden haal het opnieuw op.
  setInterval(checkAuth, 3000)
}

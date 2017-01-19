# Proof of Concept -maken-

"Hoe kunnen we BDD patiënten helpen om hun herstelproces inzichtelijker te maken, zodat ze zich bewust worden van hun gedrag en minder kans hebben op een terugval?"

Deelvraag: Hoe kunnen we ervoor zorgen dat de patiënten elke dag een leuk berichtje in de applicatie plaatsen?

####Eerste gedachten
In eerst instantie wilde ik ervoor zorgen dat ik de antwoorden op de 'vraag van de dag' kon opslaan in een database. Ik wilde gaan onderzoeken hoe een database opgezet kon worden voor de applicatie en hoe ik hier gebruik van kon gaan maken. Dit zou handig zijn voor de ontwikkeling van de applicatie en voor mijn eigen kennis-ontwikkeling. 

Mijn leerdoelen:
- Javascript beter onder de knie krijgen, zodat ik voor meer interactie kan zorgen binnen een applicatie.
- Begrijpen hoe de antwoorden op een vraag binnen de applicatie per persoon opgeslagen kunnen worden. 

Technische uitdagingen:
- Opslaan van het antwoord op een vraag binnen de applicatie, dus hoe wordt de data opgeslagen?
- De vraag elke dag of elk dagdeel laten veranderen.
- Het antwoord op een vraag omzetten in een visuele weergave. 

# Onderzoek

### Inleiding:

Om een beter beeld te krijgen van wat mijn deelvraag precies inhoudt, ben ik schetsen gaan maken om het idee snel te kunnen prototypen. Ik ben direct in HTML, CSS en Javascript begonnen. Framer had in dit geval geen zin, omdat de vraag elke dag of elk dagdeel moet veranderen. Ik heb een prototype gemaakt waarbij de vraag elke keer verandert als de pagina opnieuw geladen wordt. Hiermee kon ik zien hoe dat eruit kwam te zien op technisch gebied. Tijdens het maken van dit prototype, schoten een aantal vragen in me op:
- Moeten de vragen random of gestructureerd veranderen?
- Op welke manier wordt de verkregen data opgeslagen?
- Welke mogelijkheden zijn er op het gebied van tijdsgebonden vragen met Javascript?

### Onderzoek:
- Moeten de vragen random of gestructureerd veranderen?

Om deze vraag te beantwoorden, ben ik opnieuw naar de huidige applicatie gaan kijken. Hier wordt geen duidelijke vraag gesteld aan de gebruikers. Er wordt op dit moment gevraagd om een afbeelding van een activiteit toe te voegen. Hierbij kunnen de gebruikers hun gevoelens weergeven door een aantal korte vragen te beantwoorden, zoals: 'Hoe voelde je je hierbij op dit moment?', 'Welke risico's waren er op dit moment van toepassing?', 'Welke signalen waren er op dit moment van toepassing?'. Aan het einde kunnen de gebruikers een korte beschrijving van de activiteit toevoegen. Op dit moment wordt er dus niet één duidelijke vraag gesteld, maar wordt er ook niet gewisseld tussen vragen. De gebruikers krijgen elke dag exact hetzelfde te zien, wat de motivatie om een bericht te plaatsen niet heel groot maakt. 

Wij willen dat de gebruikers gemotiveerd worden om een bericht te plaatsen omdat het als leuk en interessant ervaren wordt. Door naar het concept en de huidige applicatie te kijken, lijkt het erop dat random vragen handiger zijn. Dit houdt de applicatie interessant en leuk om te gebruiken. Als de vragen op een vaste volgorde gevraagd worden, ontstaat er een patroon die de gebruikers zouden kunnen herkennen. Dit haalt het interessante en het leuke van de applicatie weg. 

Ik zou ook graag willen weten of de vraag in de ochtend anders moet zijn dan in de middag. Misschien één vraag die in de ochtend op een andere manier wordt gesteld dan in de middag en de avond. Een voorbeeld in de ochtend: 'Wat ga je vandaag doen?', in de middag: 'Wat ben je aan het doen?', in de avond:'Wat heb je vandaag gedaan?'. 
 
Om dit te verifiëren, wil ik graag met een BDD-patiënt praten over het soort vragen dat ze zouden verwachten en op welke manier ze de vragen zouden willen zien. 

#####Verandering na gesprek met BDD-patienten en de therapeuten

Na de gesprekken met de BDD-patiënten en de therapeuten, zijn we erachter gekomen dat de 'vraag van de dag' niet op random aspecten uit het leven van de gebruiker gebaseerd moet worden. De vragen gaan vanaf nu gebaseerd worden op de activiteiten uit de agenda van de gebruiker, de locatie van de gebruiker en de activiteit binnen de applicatie van de gebruiker. 

- Op welke manier wordt de verkregen data opgeslagen?

De informatie moet opgeslagen worden in de database, zodat het vervolgens gevisualiseerd weergegeven kan worden binnen de applicatie. Door middel van SQL-code wordt de data naar de database gestuurd en kan de data ook weer opgevraagd worden. Over hoe dit moet, heb ik niet veel kunnen vinden. De stukken die ik heb kunnen vinden begreep ik niet en veel mensen hebben mij afgeraden om hier al mee te gaan werken als Javascript nog als lastig ervaren wordt.  

- Welke mogelijkheden zijn er op het gebied van tijdsgebonden vragen met Javascript?

Ik ben opzoek gegaan op het internet naar mogelijkheden om een vraag te laten veranderen op basis van de tijd. Ik heb een stukje code gevonden waarmee de tijd door middel van Javascript gevonden kan worden. De tijd die uit de code hieronder zou komen is de huidige tijd in uren, minuten en seconden. 

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
}

Nadat ik het eerste stukje code had gevonden, ben ik opzoek gegaan naar het volgende stukje code. Namelijk de code waarmee we uiteindelijk de vragen gaan veranderen naar aanleiding van de tijd. Deze code heb ik geprobeerd werkend te krijgen en dat is me gelukt. 

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
else {
  document.getElementById("tekst").innerHTML = mijnZinnenOchtend[Math.floor(random*(lengteOchtend-1))];
}

Bron: http://www.2john.com/html/js/js-dt.htm#tijd


#Verandering van focus

Nadat ik me twee weken heb gefocust op het begrijpen van databases en veel tips heb gekregen om hier niet mee verder te gaan, heb ik besloten om me te gaan focussen op een ander gedeelte van de 'vraag van de dag'. Er zit voor mij al veel uitdaging in het koppelen van een agenda aan de applicatie. Ik ga me vanaf dit punt dan ook focussen op de javascript en de API die gebruikt moet worden om de agenda van een gebruiker aan te sluiten aan de applicatie. Uiteindelijk moet de vraag gebaseerd zijn op een activiteit in de agenda van de gebruiker. 

Mijn leerdoelen:
- Javascript beter onder de knie krijgen, zodat ik voor meer interactie kan zorgen binnen een applicatie.
- Javascript gebruiken om een vraag te baseren op de agenda van de gebruiker. 

Technische uitdagingen:
- De vraag baseren op de activiteiten in de agenda van de gebruiker.
- Een calendar-API aansluiten aan de applicatie. 
- De code van de calendar-API ombouwen tot javascript die gebruikt kan worden voor de 'vraag van de dag'. 

# Onderzoek 2

Om een calendar-API aan te sluiten aan de applicatie, ben ik gaan zoeken naar verschillende API's. Zo heb ik een calendar API gevonden die alle soorten agenda's op kan halen. Deze API heet Cronofy. Ik had deze API helemaal ingesteld, maar kwam er bij de laatste stap achter dat er back-end code voor nodig was om het werkend te krijgen. Ik ben hiermee naar Fons gegaan om te vragen wat ik hier mee moest en hij vertelde mij hier niet verder meer te gaan. Ik ben toen opzoek gegaan naar een andere calender-API en kwam uit bij de Google Calendar-API. Ook hiervan heb ik het stappen plan gevolgd om het werkend te krijgen. Ik heb ervoor gezorgd dat ik een cliënt-ID meekreeg zodat de code op mijn applicatie kon draaien. 

De code die ik mee kreeg van de Google API:

<html>
  <head>
    <script type="text/javascript">
      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '<YOUR_CLIENT_ID>';

      var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

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
       * Handle response from authorization server.
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
        var request = gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        });

        request.execute(function(resp) {
          var events = resp.items;
          appendPre('Upcoming events:');

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found.');
          }

        });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

    </script>
    <script src="https://apis.google.com/js/client.js?onload=checkAuth">
    </script>
  </head>
  <body>
    <div id="authorize-div" style="display: none">
      <span>Authorize access to Google Calendar API</span>
      <!--Button for the user to click to initiate auth sequence -->
      <button id="authorize-button" onclick="handleAuthClick(event)">
        Authorize
      </button>
    </div>
    <pre id="output"></pre>
  </body>
</html>




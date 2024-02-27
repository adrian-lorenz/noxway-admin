const texts: { [key: string]: { [key: number]: string } } = {
    de: {
      1: 'Benutzername',
      2: 'Passwort',
      3: 'Anmelden',
      4: 'Anmeldung fehlgeschlagen! Bitte versuche es erneut...',
    5:'Pfad zum Logfile',
    6:'Domain Name oder IP Adresse',
    7:'Pfad zur PEM CRT Datei',
    8:'Pfad zum PEM Schlüssel Datei',
    9:'Verbindungen pro IP Adresse im Zeitrahmen.',
    10:'Zeit in Sekunden',
    11:'Neue IP hinzufügen',
    12:'Neuer Eintrag',
    13:'Hinzufügen',
    14:'Abbrechen',

      100: 'Prefix',
      500: 'Das Prefix wird immer an die gateway URL hinzugefügt. Bitte gib einen gültigen Prefix ein (/v1/).',
      101: 'Debug',
      501: 'Debug bitte nur für Testzwecke verwenden. Das Gateway wird hierduch instabil.',
      102: 'Hostnamecheck',
      502: 'Überprüfung des eingehhenden Hostnamens. Wenn dies fehlschlägt, wird die Anfrage verworfen. z.B. api.gateway.url',
      103: 'Export Logs',
      503: 'Der Export der Logs als Log Datei.',
      104: 'SSL',
      504: 'Externes SSL Zertifikat für die Verbindung zum Gateway.',
      105: 'Rate Limit',
      505: 'Rate Limit für die Anfragen an das Gateway. pro IP Adresse im Zeitrahmen.',
      106: 'CORS',
      506: 'Cross-Origin Resource Sharing. Erlaubt die Anfragen von einer anderen Domain.',
      107: 'Interne Whitelist',
      507: 'Interne Whitelist für die internen Anfragen an das Gateway.',





      
   
    },
    en: {
      1: 'Username',
      2: 'Password',
      3: 'Login',
      4: 'Login failed! Please try again...',
      5:'Path to Logfile',
      6:'Domain Name or IP Address',
      7:'Path to PEM CRT File',
      8:'Path to PEM Key File',
      9:'Connects per IP address in the timeframe.',
      10:'Time in seconds',
      11:'Add new IP',
      12:'New Entry',
      13:'Add',
      14:'Cancel',
      100: 'Prefix',
      500: 'The prefix is always added to the gateway URL. Please enter a valid prefix (/v1/).',
      101: 'Debug',
      501: 'Please use debug only for testing purposes. The gateway will be unstable.',
      102: 'Hostnamecheck',
      502: 'Checking the incoming hostname. If this fails, the request is discarded. e.g. api.gateway.url',
      103: 'Export Logs',
      503: 'Export the logs as a log file.',
      104: 'SSL',
      504: 'External SSL certificate for the connection to the gateway.',
      105: 'Rate Limit',
      505: 'Rate limit for requests to the gateway. per IP address in the timeframe.',
      106: 'CORS',
      506: 'Cross-Origin Resource Sharing. Allows requests from a different domain.',
      107: 'Internal Whitelist',
      507: 'Internal whitelist for internal requests to the gateway.',

     
     
    },
  };
  
  export default texts;
  
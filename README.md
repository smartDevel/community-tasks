## Kollaborative Echtzeit-Aufgabenlisten (Community Tasklist)

![Community Tasklist](https://ways4eu.files.wordpress.com/2020/06/startscreengifanimationv02.gif)

## Tutorial

[https://wp.me/p4wJQa-xa](https://wp.me/p4wJQa-xa)

## Achtung

Diese Anwendung bietet keine clientseitige Authentifizierung. Bitte daher keine sensiblen Informationen eintragen. Listen sind über ihre URL öffentlich aufrufbar.

## Erforderliche Umgebungsvariablen

Erstelle im Root-Ordner eine `.env` mit den folgenden Angaben. Die Werte können aus dem Supabase-Projekt-Dashboard abgerufen werden:

```bash
REACT_APP_SUPABASE_URL=<your-supabase-url>
REACT_APP_SUPABASE_KEY=<your-supabase-key>
```

Die bisherigen Variablennamen bleiben aus Kompatibilitätsgründen erhalten.

## Entwicklung und Build

Benötigt wird Node.js 20.19 oder neuer.

### `npm install`

Installiert die Abhängigkeiten.

### `npm start`

Startet den Vite-Entwicklungsserver.

### `npm run build`

Erstellt den optimierten Produktions-Build im Ordner `build`.

### `npm run preview`

Startet eine lokale Vorschau des Produktions-Builds.

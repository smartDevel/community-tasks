## Kollaborative Echtzeit-Aufgabenlisten (Community Tasklist)

![Community Tasklist](https://ways4eu.files.wordpress.com/2020/06/startscreengifanimationv02.gif)

## Tutorial

[https://wp.me/p4wJQa-xa](https://wp.me/p4wJQa-xa)

## Achtung

Diese Anwendung bietet keine clientseitige Authentifizierung. Bitte daher keine sensiblen Informationen eintragen. Listen sind über ihre URL öffentlich aufrufbar.

## Erforderliche Umgebungsvariablen

Erstelle im Root-Ordner eine `.env` mit den folgenden Angaben. Die Werte können aus dem Supabase-Projekt-Dashboard abgerufen werden:

```bash
SUPABASE_URL=<your-supabase-url>
SUPABASE_PUBLISHABLE_KEY=<your-publishable-key>
```

Diese Namen werden von der aktuellen Supabase–Vercel-Integration automatisch gesetzt. Die bisherigen Variablennamen `REACT_APP_SUPABASE_URL` und `REACT_APP_SUPABASE_KEY` bleiben aus Kompatibilitätsgründen ebenfalls unterstützt.

## Neues Supabase-Projekt einrichten

1. Im Supabase-Dashboard ein neues Projekt anlegen.
2. Den SQL Editor öffnen und den Inhalt von [`supabase/schema.sql`](supabase/schema.sql) ausführen.
3. Unter **Project Settings → API** die Projekt-URL und den öffentlichen `anon`-/Publishable-Key kopieren.
4. Das bestehende Vercel-Projekt `community-tasks-8k5m` über die Supabase–Vercel-Integration verbinden. Dadurch werden `SUPABASE_URL` und `SUPABASE_PUBLISHABLE_KEY` für Preview und Production synchronisiert. Alternativ können beide Werte manuell in Vercel eingetragen werden.
5. Das Vercel-Deployment erneut starten und Erstellen, Laden, Aktualisieren sowie Echtzeit-Synchronisation einer Testliste prüfen.

Das Schema erlaubt absichtlich anonymes Lesen, Erstellen und Aktualisieren. Die Anwendung darf daher keine sensiblen Daten enthalten.

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

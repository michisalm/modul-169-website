# .env-Dateien

`.env`-Dateien sind einfache Textdateien, die Umgebungsvariablen für Anwendungen
definieren. In der Docker- und Docker Compose-Welt werden .env-Dateien häufig
verwendet, um Konfigurationen und sensible Informationen wie Passwörter,
API-Schlüssel oder Datenbankverbindungsdetails zu speichern. Hier sind die
wichtigsten Aspekte, wie .env-Dateien funktionieren:

## 1. Struktur der .env-Datei

Eine .env-Datei besteht aus Schlüssel-Wert-Paaren, die durch ein
Gleichheitszeichen (=) getrennt sind. Kommentare können mit einem #-Symbol
eingeleitet werden. Hier ist ein einfaches Beispiel:

```bash title=".env"
# Datenbank-Konfiguration
DB_HOST=localhost
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
# API-Konfiguration
API_KEY=1234567890abcdef
```

## 2. Verwendung in Docker Compose

Docker Compose kann .env-Dateien automatisch laden, um Umgebungsvariablen für
die Container zu setzen. Wenn Sie eine docker-compose.yml-Datei haben, können
Sie auf die in der .env-Datei definierten Variablen zugreifen, indem Sie die
`${VARIABLE_NAME}`-Syntax verwenden.

Hier ist ein Beispiel, wie Sie eine .env-Datei in einer docker-compose.yml-Datei
verwenden können:

```yaml title="docker-compose.yml"
services:
  db:
    image: postgres
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
```

-
- https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables

## 3. Automatisches Laden der .env-Datei

Docker Compose sucht standardmässig nach einer .env-Datei im gleichen Verzeichnis
wie die docker-compose.yml-Datei. Wenn die Datei vorhanden ist, werden die darin
definierten Variablen automatisch geladen und stehen in der docker-compose.yml
zur Verfügung.

## 4. Manuelles definieren der .env-Datei

Definiert man mit `env_file`, dass ein .env file gegeben sein muss, werden
automatisch alle darin definierten Variablen in den Service gemountet. Es können
auch mehrere Dateien angegeben werden. Dabei überschreiben die unteren die
oberen.

```yaml title="docker-compose.yml"
services:
  db:
    image: postgres
    env_file:
      - path: .env
        required: true # muss vorhanden sein
      - path: ./override.env
        required: false # ist optional
```

- https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/#use-the-env_file-attribute

## 5. Vorteile der Verwendung von .env-Dateien

Trennung von Konfiguration und Code: .env-Dateien ermöglichen es,
Konfigurationen von der Anwendung zu trennen, was die Wartbarkeit und
Flexibilität erhöht.

Sensible Informationen: Sie können sensible Informationen wie Passwörter und
API-Schlüssel in einer .env-Datei speichern, anstatt sie direkt in den Code oder
die docker-compose.yml-Datei zu schreiben.

Einfache Anpassung: Änderungen an Konfigurationen können einfach durch
Bearbeiten der .env-Datei vorgenommen werden, ohne dass der Code geändert werden
muss.

## 6. Sicherheitshinweise

.gitignore: Es ist eine gute Praxis, .env-Dateien in die .gitignore-Datei
aufzunehmen, um zu verhindern, dass sie versehentlich in ein
Versionskontrollsystem (wie Git) eingecheckt werden. Dies schützt sensible
Informationen vor unbefugtem Zugriff. Beispiel

```txt title=".gitignore"
.env
override.env
```

## Zusammenfassung

.env-Dateien sind ein nützliches Werkzeug zur Verwaltung von Umgebungsvariablen
in Docker- und Docker Compose-Projekten. Sie ermöglichen eine einfache und
sichere Handhabung von Konfigurationen und sensiblen Informationen, indem sie
eine klare Trennung zwischen Code und Konfiguration bieten.

---
sidebar_position: 3
---

# Docker Compose - Referenz

Ein Docker Compose File (in der Regel **docker-compose.yml** genannt) ist eine
YAML-Datei, die die Konfiguration für Docker-Container beschreibt.

:::info

- Eine vollständige Dokumentation ist auf der
  [offiziellen Webseite](https://docs.docker.com/reference/compose-file/) zu
  finden.

:::

## Beispieldatei

Anhand von diesem Beispiel wird unter [Schmea](#schema) auf jeden Punkt einzlen
eingegangen.

:::info

- Dies ist ein komplexes Beispiel welches **nicht einfach per copy-paste
  funktioniert**. Es benötigt dazugehörige Dockerfiles.

:::

<div className="grid sixtyFourty"><div>

```yaml title="docker-compose.yml"
version: "3.8"

services:
  web:
    build:
      context: ./web
      dockerfile: Dockerfile
    container_name: frontend
    depends_on:
      - db
    environment:
      NGINX_HOST: localhost
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - my-network
    labels:
      com.example.description: "Webserver"
    ports:
      - "80:80"
    restart: always
    volumes:
      - web-data:/usr/share/nginx/html
  db:
    image: postgres
    container_name: database
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    deploy:
      replicas: 1
      resources:
        limits:
          cpus: "0.1"
          memory: 512M
    healthcheck:
      test: ["CMD-SHELL", "pg_isready", "-d", "db_prod"]
      interval: 30s
      timeout: 60s
      retries: 5
      start_period: 80s
    networks:
      - my-network
    secrets:
      - my_secret
    volumes:
      - db-data:/var/lib/postgresql/data

networks:
  my-network:
    driver: bridge

volumes: # Dieser Eintrag ist nur für Docker Volumes nötig, nicht für Bind Mounts.
  web-data:
  db-data:

configs:
  my_config:
    file: ./config.yml

secrets:
  my_secret:
    file: ./secret.txt
```

</div><div>

### Erläuterungen

- [**version**](#1-version): Gibt die verwendete Version der Docker
  Compose-Syntax an.
- [**services**](#2-services): Definiert zwei Services: web (Nginx) und db
  (Postgres).
  - [**build**](#servicesbuild): Der web-Service wird aus einem Dockerfile im
    Verzeichnis ./web gebaut.
  - [**container_name**](#servicescontainer_name): Der Container erhält den Namen
    "frontend". Dieser ist sogleich auch der DNS Name.
  - [**depends_on**](#servicesdepends_on): Der web-Service hängt vom db-Service
    ab.
  - [**environment**](#servicesenvironment): Umgebungsvariablen werden für die
    Konfiguration der Services gesetzt.
  - [**healthcheck**](#serviceshealthcheck): Ein Gesundheitscheck für den
    web-Service, um sicherzustellen, dass er ordnungsgemäss funktioniert.
  - [**labels**](#serviceslabels): Metadaten für den web-Service.
  - [**ports**](#servicesports): Der web-Service leitet Port 80 des Hosts auf
    Port 80 des Containers weiter.
  - [**restart**](#servicesrestart): Der web-Service wird immer neu gestartet,
    wenn er stoppt.
  - [**volumes**](#servicesvolumes): Beide Services verwenden Volumes für die
    Datenpersistenz.
  - [**deploy**](#servicesdeploy): Bereitstellungsoptionen für den db-Service,
    einschliesslich Ressourcenlimits.
- [**networks**](#3-networks): Definiert ein benutzerdefiniertes Netzwerk.
- [**configs**](#5-configs): Definiert eine Konfiguration, die in den Services
  verwendet werden kann.
- [**secrets**](#6-secrets): Definiert geheime Daten, die im db-Service
  verwendet werden.
- [**volumes**](#4-volumes): Definiert benannte Volumes für die Persistenz,
  welche von den Services gemountet werden.

</div></div>

## Schema

Hier sind die wichtigsten Top-Level-Elemente eines Docker Compose Files mit
Erklärungen.

Diese Elemente bilden die Grundlage für die Konfiguration von Docker Compose und
ermöglichen es Ihnen, komplexe Anwendungen mit mehreren Containern einfach zu
definieren und zu verwalten.

### 1. version

Gibt die Version der Docker Compose-Syntax an, die verwendet wird. Gemäss Docker
ist die Bezeichnung der Version obsolet und wird nicht beachtet und sollte nicht
mehr verwendet werden. In vielen docker-compose.yml, welche man auf dem Internet
findet, ist sie nach wie vor vorhanden.

```yaml title="docker-compose.yml"
version: "3.8"
```

- https://docs.docker.com/reference/compose-file/version-and-name/

### 2. services

Definiert die Container, die in der Anwendung verwendet werden. Jeder Service
entspricht einem Container und kann spezifische Konfigurationen wie Image,
Ports, Umgebungsvariablen usw. enthalten.

Beispiel:

```yaml title="docker-compose.yml"
services:
  web:
    image: nginx
  db:
    image: postgres
```

- https://docs.docker.com/reference/compose-file/services/

#### services.build

Gibt an, wie ein Docker-Image aus einem Dockerfile erstellt werden soll. Hier
können Sie den Kontext (Verzeichnis) und andere Build-Optionen wie
Dockerfile-Pfad und Build-Argumente angeben.

Beispiel:

```yaml title="docker-compose.yml"
services:
  app:
    build:
      context: ./app
      dockerfile: Dockerfile
      args:
        NODE_ENV: production
```

- https://docs.docker.com/reference/compose-file/services/#build

#### services.container_name

Der Container Name vom gestarteten Container. Wenn leergelassen, wird
automatisch der Servicename verwendet.

- Der Container Name ist automatisch auch der **DNS Name** vom Container.

#### services.depends_on

Gibt an, dass ein Service von einem oder mehreren anderen Services abhängt. Dies
stellt sicher, dass die abhängigen Services in der richtigen Reihenfolge
gestartet werden. Beachten Sie, dass dies keine Wartezeit für die Verfügbarkeit
der abhängigen Services garantiert.

Beispiel:

```yaml title="docker-compose.yml"
services:
  db:
    image: postgres
  web:
    image: my_image
    depends_on:
      - db
```

- https://docs.docker.com/reference/compose-file/services/#depends_on

#### services.environment

Ermöglicht das Setzen von Umgebungsvariablen für einen Service. Diese Variablen
können in der Anwendung verwendet werden, um Konfigurationen oder sensible Daten
bereitzustellen.

Beispiel:

```yaml title="docker-compose.yml"
services:
  app:
    image: my_image
    environment:
      DATABASE_URL: postgres://user:password@db:5432/mydb
```

- https://docs.docker.com/reference/compose-file/services/#environment

#### services.ports

Definiert die Portweiterleitungen zwischen dem Host und dem Container. Dies
ermöglicht den Zugriff auf die Dienste, die in den Containern laufen, von
ausserhalb des Docker-Netzwerks.

Beispiel:

```yaml title="docker-compose.yml"
services:
  web:
    ports:
      - "80:80"
```

- https://docs.docker.com/reference/compose-file/services/#ports

#### services.volumes

Definiert, welche Volumes in einem bestimmten Service verwendet werden sollen.
Dies ermöglicht die Persistenz von Daten und den Austausch von Daten zwischen
Containern.

Beispiel:

```yaml title="docker-compose.yml"
services:
  db:
    volumes:
      - db-data:/var/lib/postgresql/data
```

- https://docs.docker.com/reference/compose-file/services/#volumes

#### services.restart

Gibt die Restart-Politik für einen Service an. Dies kann nützlich sein, um
sicherzustellen, dass Container bei einem Fehler oder nach einem Neustart des
Docker-Daemons automatisch neu gestartet werden.

Optionen:

- **no**: Standard. Container wird nicht neu gestartet.
- **always**: Container wird immer neu gestartet, unabhängig vom Grund.
- **unless-stopped**: Container wird neu gestartet, es sei denn, er wurde
  manuell gestoppt.
- **on-failure**: Container wird neu gestartet, wenn er mit einem Fehlercode
  stoppt. Optionale maximale Anzahl von Neustartversuchen möglich.

Beispiel:

```yaml title="docker-compose.yml"
services:
  web:
    restart: always
  db:
    restart: on-failure:5
```

- https://docs.docker.com/reference/compose-file/services/#restart

#### services.healthcheck

Definiert einen Gesundheitscheck für einen Service, um sicherzustellen, dass der
Container ordnungsgemäss funktioniert. Docker kann dann entscheiden, ob der
Container neu gestartet werden soll, wenn der Gesundheitscheck fehlschlägt.

Beispiel:

```yaml title="docker-compose.yml"
services:
  web:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
```

- https://docs.docker.com/reference/compose-file/services/#healthcheck

#### services.deploy

Definiert Bereitstellungsoptionen für Services, **insbesondere in einem
Swarm-Cluster**. Hier können Sie Einstellungen wie Replikate, Ressourcenlimits
und Update-Strategien angeben.

Beispiel:

```yaml title="docker-compose.yml"
services:
  web:
    deploy:
      replicas: 3
      resources:
        limits:
        cpus: "0.1"
        memory: 50M
```

- https://docs.docker.com/reference/compose-file/services/#deploy

#### services.labels

Ermöglicht das Hinzufügen von Metadaten zu einem Service oder Container in Form
von Schlüssel-Wert-Paaren. Labels können für die Organisation, das Management
oder die Automatisierung verwendet werden.

Beispiel:

```yaml title="docker-compose.yml"
services:
  web:
    labels:
      com.example.description: "Webserver"
```

- https://docs.docker.com/reference/compose-file/services/#labels

### 3. networks

Definiert die Netzwerke, die von den Services verwendet werden. Dies ermöglicht
die Kommunikation zwischen Containern und kann benutzerdefinierte Netzwerke
erstellen.

Beispiel:

```yaml title="docker-compose.yml"
networks:
  my-network:
    driver: bridge
```

- https://docs.docker.com/reference/compose-file/networks/

### 4. volumes

Definiert die Volumes, die von den Services verwendet werden. Volumes sind
persistent und ermöglichen es, Daten über Container-Neustarts hinweg zu
speichern.

Beispiel:

```yaml title="docker-compose.yml"
volumes:
  db-data:
```

- https://docs.docker.com/reference/compose-file/volumes/

### 5. configs

Ermöglicht die Definition von Konfigurationsdaten, die in Services verwendet
werden können. Dies ist nützlich für die Verwaltung von Konfigurationen, die
nicht in Umgebungsvariablen gespeichert werden sollen.

Beispiel:

```yaml title="docker-compose.yml"
configs:
  my_config:
    file: ./config.yml
services:
  my_service:
    image: my_image
    configs:
      - source: my_config
        target: /etc/my_config_file.conf
```

- In dem Beispiel wird die Datei `./config.yml` als `my_config` registriert und
  im Service `my_service` unter dem Pfad `/etc/my_config_file.conf` gemounted.
- https://docs.docker.com/reference/compose-file/configs/

### 6. secrets

Definiert geheime Daten, die in Services verwendet werden können. Dies ist
besonders wichtig für sensible Informationen wie Passwörter oder API-Schlüssel.

Beispiel:

```yaml title="docker-compose.yml"
secrets:
  my_secret:
    file: ./secret.txt
services:
  my_service:
    image: my_image
    secrets:
      - my_secret
```

- https://docs.docker.com/reference/compose-file/secrets/

## Visualisierung

Diese Befehle im Ordner der `docker-compose.yml` Datei ausführen:

```bash title="Linux/Mac: bash"
docker run --rm -it --name dcv -v $(pwd):/input pmsipilot/docker-compose-viz render -m image docker-compose.yml
```

```powershell title="Windows: Powershell"
docker run --rm -it --name dcv -v ${pwd}:/input pmsipilot/docker-compose-viz render -m image docker-compose.yml
```

## Befehle

Diese Befehle sind die grundlegenden Werkzeuge, um mit Docker Compose zu
arbeiten. Sie ermöglichen es Ihnen, Container zu starten, zu stoppen, zu bauen
und zu verwalten, sowie Protokolle zu überwachen und in Container zu
interagieren. Docker Compose vereinfacht die Verwaltung von
Multi-Container-Anwendungen erheblich.

### docker compose up

Startet die in der docker-compose.yml-Datei definierten Services. Wenn die
Images nicht vorhanden sind, werden sie automatisch gebaut oder heruntergeladen.
Der Befehl kann mit verschiedenen Optionen verwendet werden:

- `-d`: Startet die Container im Hintergrund (Detached Mode).
- `--build`: Erzwingt den Neubau der Images, auch wenn sie bereits existieren.

Beispiel:

```bash
docker compose up
docker compose up -d
docker compose up -d --build
```

### docker compose down

Stoppt und entfernt die Container und Netzwerke, die von docker compose up
erstellt wurden. Dies ist nützlich, um die gesamte Umgebung zu bereinigen.

Beispiel:

```bash
docker compose down
```

### docker compose build

Baut die Images für die in der docker-compose.yml-Datei definierten Services.
Dies ist nützlich, wenn Sie Änderungen an den Dockerfiles vorgenommen haben und
die Images neu erstellen möchten. Die Container werden dabei nicht gestartet.

Beispiel:

```bash
docker compose build
```

### docker compose ps

Listet die laufenden Container, die **von Docker Compose verwaltet** werden,
zusammen mit ihrem Status und den Ports, die sie verwenden.

Beispiel:

```bash
docker compose ps
```

### docker compose logs

Zeigt die Protokolle der Container an, die von Docker Compose verwaltet werden.
Sie können auch spezifische Services angeben, um nur deren Logs anzuzeigen. Mit
der Option -f (oder --follow) werden die Protokolle fortlaufend angezeigt.

Beispiel:

```bash
docker compose logs
docker compose logs web # Zeigt die Logs des 'web'-Services an
docker compose logs web -f # Zeigt die Logs des 'web'-Services fortlaufend an
```

### docker compose exec

Führt einen Befehl in einem laufenden Container aus. Dies ist nützlich, um in
einen Container zu gelangen und Befehle auszuführen, z. B. um eine Shell zu
öffnen.

Beispiel:

```bash
docker compose exec web bash # Öffnet eine Shell im 'web'-Container
```

### docker compose stop

Stoppt die laufenden Container, ohne sie zu entfernen. Dies ist nützlich, wenn
Sie die Container später wieder starten möchten, ohne sie neu zu erstellen.

Beispiel:

```bash
docker compose stop # stoppt alle services
docker compose stop service1 # stoppt nur service1
```

### docker compose start

Startet gestoppte Container, die von Docker Compose verwaltet werden. Dies
funktioniert nur für Container, die zuvor mit docker compose stop gestoppt
wurden.

Beispiel:

```bash
docker compose start # startet alle services
docker compose start service1 # startet nur service1
```

### docker compose restart

Stoppt und startet die Container neu. Dies kann nützlich sein, um Änderungen an
der Konfiguration oder den Umgebungsvariablen zu übernehmen.

Beispiel:

```bash
docker compose restart # startet alle services neu
docker compose restart service1 # startet nur service1 neu
```

### docker compose rm

Entfernt gestoppte Container, die von Docker Compose verwaltet werden. Dies ist
nützlich, um nicht mehr benötigte Container zu bereinigen.

Beispiel:

```bash
docker compose rm
```

### docker compose pull

Lädt die neuesten Images für die in der docker-compose.yml-Datei definierten
Services aus einem Docker-Registry (z. B. Docker Hub).

Beispiel:

```bash
docker compose pull
```

### docker compose config

Überprüft die docker-compose.yml-Datei auf Syntaxfehler und gibt die
konstruierte Konfiguration aus. Dies ist nützlich, um sicherzustellen, dass die
Datei korrekt ist, bevor Sie die Container starten.

Beispiel:

```bash
docker compose config
```

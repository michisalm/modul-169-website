---
sidebar_position: 3
---

# Docker Image

Ein Docker-Image ist eine leichtgewichtige, ausführbare Softwareeinheit, die
alles enthält, was benötigt wird, um eine Anwendung auszuführen. Dazu gehören
der Anwendungscode, Bibliotheken, Abhängigkeiten, Umgebungsvariablen und
Konfigurationsdateien. Docker-Images sind die Grundlage für Container, die die
Ausführung von Anwendungen in isolierten Umgebungen ermöglichen.

## Hauptmerkmale von Docker-Images:

### Schichtenarchitektur

- Docker-Images bestehen aus mehreren Schichten (Layers). Jede Schicht
  repräsentiert eine Änderung oder einen Befehl, der in einem Dockerfile
  definiert ist. Diese Schichten sind schreibgeschützt und werden in einem
  Dateisystem gespeichert.
- Wenn ein Image aktualisiert wird, wird nur die betroffene Schicht neu
  erstellt, was die Effizienz erhöht und Speicherplatz spart.

### Dockerfile

- Ein Docker-Image wird typischerweise aus einem Dockerfile erstellt, das eine
  Reihe von Anweisungen enthält, die Docker mitteilen, wie das Image aufgebaut
  werden soll. Ein Dockerfile kann Befehle wie `FROM`, `RUN`, `COPY`, `CMD` und
  viele andere enthalten.
- Beispiel eines einfachen Dockerfiles:

```Dockerfile title="Dockerfile"
# Basis-Image
FROM python:3.9

# Arbeitsverzeichnis festlegen
WORKDIR /app

# Abhängigkeiten kopieren
COPY requirements.txt .

# Abhängigkeiten installieren
RUN pip install -r requirements.txt

# Anwendungscode kopieren
COPY . .

# Befehl zum Ausführen der Anwendung
CMD ["python", "app.py"]
```

### Portabilität

Docker-Images sind plattformunabhängig und können auf jedem System ausgeführt
werden, das Docker unterstützt. Dies ermöglicht eine konsistente Ausführung von
Anwendungen in verschiedenen Umgebungen, sei es lokal, in der Cloud oder in
einem Rechenzentrum.

### Versionierung

Docker-Images können versioniert werden, indem Tags verwendet werden. Ein Tag
ist ein Label, das einem Image zugewiesen wird, um eine bestimmte Version zu
kennzeichnen. Zum Beispiel könnte ein Image mit dem Tag myapp:1.0 eine bestimmte
Version der Anwendung darstellen.

### Verteilung

Docker-Images können in einem Docker-Registry (z. B. Docker Hub) gespeichert und
verteilt werden. Benutzer können Images von der Registry herunterladen oder
eigene Images hochladen, um sie mit anderen zu teilen.

Verwendung von Docker-Images

- Erstellen von Containern: Um einen Container zu starten, wird ein Docker-Image
  verwendet. Der Befehl docker run erstellt einen neuen Container aus dem
  angegebenen Image.
- Microservices-Architektur: In einer Microservices-Architektur können
  verschiedene Teile einer Anwendung in separaten Containern ausgeführt werden,
  die jeweils aus unterschiedlichen Docker-Images erstellt werden. Dies fördert
  die Modularität und Skalierbarkeit.

## Dockerfile

Wie bereits erwähnt, werden Docker Images mithilfe eines _Dockerfile_ erstellt.

Ein _Dockerfile_ ist eine Textdatei, die alle Anweisungen enthält, die Docker
benötigt, um ein Docker-Image zu erstellen. Der Aufbau eines Dockerfiles folgt
einer bestimmten Syntax und Struktur. Hier sind die grundlegenden Komponenten
und Anweisungen, die in einem Dockerfile verwendet werden:

### Befehle

1. **FROM**: Diese Anweisung gibt das Basis-Image an, auf dem das neue Image
   aufgebaut wird. Es ist die erste Zeile in den meisten Dockerfiles.

   ```Dockerfile
   FROM ubuntu:20.04
   ```

2. **LABEL**: Mit dieser Anweisung können Metadaten zum Image hinzugefügt
   werden, wie z.B. der Autor oder die Version.

   ```Dockerfile
   LABEL maintainer="deinname@example.com"
   ```

3. **RUN**: Diese Anweisung führt Befehle während des Build-Prozesses aus, um
   Software zu installieren oder Konfigurationen vorzunehmen.

   ```Dockerfile
   RUN apt-get update && apt-get install -y python3
   ```

4. **COPY**: Mit dieser Anweisung können Dateien oder Verzeichnisse vom Host in
   das Image kopiert werden.

   ```Dockerfile
   COPY . /app
   ```

5. **ADD**: Ähnlich wie COPY, aber mit zusätzlichen Funktionen, wie das
   Entpacken von Archiven oder das Herunterladen von Dateien von einer URL.

   ```Dockerfile
   ADD myapp.tar.gz /app
   ```

6. **CMD**: Diese Anweisung gibt den Standardbefehl an, der ausgeführt wird,
   wenn ein Container aus dem Image gestartet wird.

   ```Dockerfile
   CMD ["python3", "app.py"]
   ```

7. **ENTRYPOINT**: Diese Anweisung legt den Hauptbefehl fest, der beim Starten
   des Containers ausgeführt wird. Sie kann zusammen mit CMD verwendet werden,
   um Standardargumente bereitzustellen.

   ```Dockerfile
   ENTRYPOINT ["python3"]
   ```

8. **ENV**: Mit dieser Anweisung können Umgebungsvariablen im Container gesetzt
   werden. Diese Variablen können während der Laufzeit des Containers von
   Anwendungen oder Skripten verwendet werden, um Konfigurationen oder
   Einstellungen bereitzustellen.

   ```Dockerfile
   ENV APP_ENV=production
   ```

9. **EXPOSE**: Diese Anweisung dokumentiert, welche Ports der Container zur
   Verfügung stellt. Es hat keine Auswirkungen auf die Netzwerkkonfiguration,
   dient aber als Hinweis für Benutzer.

   ```Dockerfile
   EXPOSE 80
   ```

10. **VOLUME**: Diese Anweisung erstellt ein Verzeichnis, das als Datenvolumen
    verwendet wird, um Daten zwischen Containern oder zwischen Host und
    Container zu teilen. Auf Volumes wird in der nächsten Woche ausführlicher
    eingegangen.

    ```Dockerfile
    VOLUME ["/data"]
    ```

11. **WORKDIR**: Diese Anweisung legt das Arbeitsverzeichnis für nachfolgende
    Anweisungen fest.

    ```Dockerfile
    WORKDIR /app
    ```

### Beispiel

Ein einfaches Beispiel für ein Dockerfile könnte so aussehen:

```Dockerfile title="Dockerfile"
# Basis-Image
FROM python:3.8-slim

# Metadaten
LABEL maintainer="deinname@example.com"
LABEL version="1.0"
LABEL description="Ein einfaches Beispiel für ein Dockerfile"

# Arbeitsverzeichnis festlegen
WORKDIR /app

# Umgebungsvariablen setzen
ENV APP_ENV=production
ENV PORT=5000

# Abhängigkeiten kopieren und installieren
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Anwendungscode kopieren
COPY . .

# Exponiere den Port
EXPOSE $PORT

# Datenvolumen erstellen
VOLUME ["/app/data"]

# Hauptbefehl festlegen
ENTRYPOINT ["python3"]
CMD ["app.py"]
```

In diesem Beispiel wird ein Python-Image als Basis verwendet, Abhängigkeiten
werden installiert, und schliesslich wird die Anwendung gestartet.

### CMD vs. ENTRYPOINT

Der Hauptunterschied zwischen `CMD` und `ENTRYPOINT` in einem _Dockerfile_ liegt
in ihrer Funktion und Verwendung:

#### CMD

- Zweck: CMD wird verwendet, um den Standardbefehl anzugeben, der ausgeführt
  wird, wenn ein Container aus dem Image gestartet wird. Es kann durch
  Argumente, die beim Starten des Containers übergeben werden, überschrieben
  werden.
- Flexibilität: CMD ist flexibler, da es leicht durch Benutzeranweisungen beim
  Starten des Containers ersetzt werden kann.

Beispiel:

```Dockerfile
CMD ["app.py"]
```

Wenn der Container gestartet wird, wird standardmässig app.py ausgeführt, aber
der Benutzer kann dies durch Angabe eines anderen Befehls beim Starten des
Containers überschreiben.

#### ENTRYPOINT

- Zweck: ENTRYPOINT legt den Hauptbefehl fest, der beim Starten des Containers
  ausgeführt wird. Es ist schwieriger, diesen Befehl zu überschreiben, da er als
  fester Bestandteil des Containers betrachtet wird.
- Verwendung: ENTRYPOINT wird häufig verwendet, um sicherzustellen, dass ein
  bestimmter Befehl immer ausgeführt wird, unabhängig von den übergebenen
  Argumenten.

Beispiel:

```Dockerfile
ENTRYPOINT ["python3"]
```

In diesem Fall wird beim Starten des Containers immer python3 ausgeführt, und
der Benutzer kann zusätzliche Argumente (z.B. app.py) über CMD oder beim Starten
des Containers hinzufügen.

In vielen Fällen werden CMD und ENTRYPOINT zusammen verwendet, um eine flexible
und dennoch kontrollierte Ausführung von Containeranwendungen zu ermöglichen.

## Image bilden

Um ein Docker-Image aus einem Dockerfile zu erstellen, folgen Sie diesen
Schritten:

### 1. Dockerfile erstellen

Erstellen Sie eine Datei mit dem Namen Dockerfile (ohne Dateiendung) in einem
Verzeichnis, das Ihren Anwendungscode und alle benötigten Dateien enthält. Fügen
Sie die gewünschten Anweisungen (z.B. FROM, RUN, COPY, etc.) in das Dockerfile
ein.

### 2. Terminal öffnen

Öffnen Sie ein Terminal oder eine Eingabeaufforderung (z.B. PowerShell oder
Eingabeaufforderung) und navigieren Sie zu dem Verzeichnis, in dem sich Ihr
Dockerfile befindet.

### 3. Docker-Image erstellen

Verwenden Sie den Befehl `docker build`, um das Image zu erstellen. Der
grundlegende Befehl hat die folgende Syntax:

```bash
docker build -t <image-name>:<tag> .
```

- `<image-name>`: Geben Sie einen Namen für Ihr Image an.
- `<tag>`: (Optional) Geben Sie eine Tag-Version an (z.B. latest oder v1.0).
- Der Punkt `.` am Ende gibt an, dass das _Dockerfile_ **im aktuellen
  Verzeichnis** gefunden werden soll.

Beispiel:

```bash
docker build -t myapp:latest .
```

### 4. Image überprüfen

Nach dem erfolgreichen Erstellen des Images können Sie die Liste der verfügbaren
Docker-Images mit dem folgenden Befehl anzeigen:

```bash
docker images
```

### 5. Container aus dem Image starten

Um einen Container aus dem erstellten Image zu starten, verwenden Sie den Befehl
`docker run`:

```bash
docker run -d -p <host-port>:<container-port> <image-name>:<tag>
```

- `-d`: Startet den Container im Hintergrund (detached mode).
- `-p <host-port>:<container-port>`: Bindet einen Port des Hosts an einen Port
  des Containers.

Beispiel:

```bash
docker run -d -p 5000:5000 myapp:latest
```

### Zusammenfassung

1. Erstellen Sie ein Dockerfile mit den gewünschten Anweisungen.
2. Öffnen Sie ein Terminal und navigieren Sie zum Verzeichnis mit dem
   Dockerfile.
3. Führen Sie `docker build -t <image-name>:<tag> .` aus, um das Image zu
   erstellen.
4. Überprüfen Sie das Image mit `docker images`.
5. Starten Sie einen Container mit `docker run`.

Mit diesen Schritten können Sie ein Docker-Image mit `docker build` erstellen
und einen Container basierend auf diesem Image ausführen.

## Caching beim Erstellen von Docker-Images

Beim Erstellen von Docker-Images gibt es einen Prozess, der als "Caching"
bezeichnet wird. Caching hilft, den Erstellungsprozess schneller und effizienter
zu gestalten. Hier ist eine einfache Erklärung, wie das funktioniert.

### Was ist Caching?

Caching bedeutet, dass bereits ausgeführte Schritte oder Ergebnisse gespeichert
werden, damit sie nicht erneut berechnet oder heruntergeladen werden müssen.
Wenn Sie ein Docker-Image erstellen, durchläuft Docker mehrere Schritte, die im
Dockerfile definiert sind. Jeder Schritt in dieser Datei wird als "Layer"
bezeichnet.

### Wie funktioniert das Caching in Docker?

1. **Layer-Erstellung**: Jedes Mal, wenn Sie ein Docker-Image erstellen, wird
   jeder Befehl im Dockerfile in einen eigenen Layer umgewandelt. Zum Beispiel,
   wenn Sie ein Basis-Image herunterladen oder eine Datei kopieren, wird dafür
   ein Layer erstellt.
2. **Speicherung der Layer**: Wenn Sie das Image das nächste Mal erstellen,
   prüft Docker, ob es bereits einen Layer gibt, der dem aktuellen Befehl
   entspricht. Wenn ja, wird dieser Layer aus dem Cache verwendet, anstatt ihn
   erneut zu erstellen. Das spart Zeit und Ressourcen.
3. **Änderungen und Cache-Invalidierung**: Wenn Sie eine Änderung im Dockerfile
   vornehmen, z. B. eine neue Datei hinzufügen oder einen Befehl ändern, wird
   der Cache für diesen Layer und alle nachfolgenden Layer ungültig. Docker muss
   diese Layer dann neu erstellen.

### Vorteile von Caching

- **Schnelligkeit**: Durch das Caching werden die Erstellungszeiten erheblich
  verkürzt, da Docker nicht alles von Grund auf neu erstellen muss.
- **Effizienz**: Weniger Bandbreite und Speicherplatz werden benötigt, da
  bereits vorhandene Layer wiederverwendet werden.
- **Ressourcenschonung**: Caching reduziert die Belastung des Systems, da
  weniger Rechenleistung benötigt wird.

### Fazit

Caching ist ein wichtiger Bestandteil des Docker-Image-Erstellungsprozesses. Es
hilft, die Effizienz zu steigern und die Zeit zu verkürzen, die benötigt wird,
um ein Image zu erstellen. Wenn Sie verstehen, wie Caching funktioniert, können
Sie Ihre Docker-Images schneller und effektiver erstellen.

## Optimierung

Es gibt mehrere Arten ein Image zu optimieren.

### Wahl eines kleinen Base-Image `FROM`

Jedes _Dockerfile_ startet mit dem Befehl `FROM`. Damit wird angegeben, welches
das Basis-Image ist. Ist dieses bereits gross, kann das _Dockerfile_ nicht mehr
allzu viel optimiert werden. Es ist zwar theoretisch möglich, viele Dateien und
Programme durch `RUN` Befehle wieder zu deinstallieren, dies ist jedoch sehr
aufwändig und unnötig.

Dafür gibt es für die gängigsten Technologien bereits vorgefertigte Images. Dazu
zählen:

- Programmiersprachen: `node`, `python`, `ruby`, `java`...
- Webserver: `nginx`, `apache`, `traefik`...
- Datenbanken: `mysql`, `mariadb`, `postresql`...
- Und weitere mehr!

Schaut also immer zuerst, wenn z.B. eine Programmiersprache eingesetzt wird, ob
nicht bereits ein Standardimage existiert, anstatt in ubuntu die Sprache manuell
zu installieren?

### So wenig Layer wie möglich generieren

Unter [Caching](#caching-beim-erstellen-von-docker-images) wurde erläutert, dass
ein Docker-Image für jeden Befehl (`FROM`, `COPY` aber auch `RUN`) einen _Layer_
enthält. Das führt dazu, dass ein Image mit jedem Layer grösser wird. Ein
Docker-Image kann also verkleinert werden, indem versucht wird, so wenig Befehle
wie möglich zu verwenden.

Die Befehle `FROM`, `WORKDIR`, `ENV`, `ARG`, `ENTRYPOINT`, `EXPOSE` und `CMD`
können ausgeschlossen werden, da diese nicht zusammenfügbar sind.

Die Befehle die zur Optimierung genau angeschaut werden sollten sind:

#### COPY

Mit dem `COPY` Befehl werden Dateien ins Image kopiert. Hier kann gespart
werden, indem nur die Dateien kopiert werden, welche auch wirklich verwendet
werden.

Durch die Datei `.dockerignore` können, analog zu einer `.gitignore` Datei,
ganze Ordner oder einzelne Dateien vom `COPY` Befehl ausgeschlossen werden.

Auch kann ein `COPY` Befehl durch `*` mehrere Dateien gleichzeitig kopieren. So
können potenziell mehrere `COPY` Befehle zu einem vereint werden.

#### RUN

Der `RUN` Befehl ist prädestiniert, um optimiert zu werden. Ein _Dockerfile_
kann sehr schnell mehrere `RUN` Befehle enthalten.

```dockerfile
# ...
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y nodejs
RUN rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://deb.nodesource.com | bash -
# ...
```

Mehrere `RUN` Befehle können mit den Operatoren `&&` und `\` erreicht werden.

- Der Operator `&&` bedeutet dass, wenn der rechte Befehl erfolgreich war,
  direkt der linke Befehl ausgeführt werden soll.
  - So lassen sich also mehrere Befehle zu einem `RUN` vereinen.
- Der Operator `\` signalisiert _Bash_, dass der Zeilenumbruch nicht als das
  Ende vom Befehl interpretiert werden soll. Damit können Bashbefehle auf
  mehrere Zeilen geschrieben werden.
  - Dies dient ausschliesslich der Lesbarkeit.

Damit können die oberen 5 `RUN` Befehle in einen vereint werden:

```dockerfile
# ...
RUN apt-get update \
  && apt-get install -y curl \
  && apt-get install -y nodejs \
  && rm -rf /var/lib/apt/lists/* \
  && curl -fsSL https://deb.nodesource.com | bash -
# ...
```

:::tip

Optimierung, egal in welcher Disziplin hat immer den Effekt, dass die
Fehlersuche komplizierter wird. Daher empfehle ich diese Vorgehensweise:

- Beim Erstellen vom _Dockerfile_ noch nicht Optimieren.
- Viele Layer sind anfangs gut, da die einzelnen gecached werden!
  - Wenn also einzelne Befehle angepasst werden, müssen die vorhergehenden
    Befehle nicht mehr ausgeführt werden.
- Erst wenn das _Dockerfile_ fertig ist und getestet wurde, kann es Optimiert
  werden.
- Zur nachträglichen Fehlersuche (Debugging), ist es sinnvoll, optimierte `RUN`
  Befehle wieder aufzuteilen, damit besser sichtbar wird, welcher Befehl genau
  das Problem verursacht.

:::

### Multistage Builds

Eine weitere, sehr effektive Art zur Optimierung bietet der "Multistage" Build.
Im nächsten Abschnitt wird darauf im Detail eingegangen.

## Multistage Builds

Multistage Builds in _Dockerfiles_ sind eine Technik, die es ermöglicht, mehrere
Schritte beim Erstellen eines Docker-Images zu kombinieren. Dadurch kann die
Grösse des endgültigen Images reduziert und die Build-Zeit optimiert werden.
Hier ist eine einfache Erklärung mit Beispielen:

### Was sind Multistage Builds?

Stellen Sie sich vor, Sie möchten eine Anwendung bauen, die aus mehreren Teilen
besteht. Normalerweise würden Sie alle Abhängigkeiten und Tools in ein einziges
Docker-Image packen. Das kann jedoch dazu führen, dass das Image sehr gross
wird, weil viele Dinge, die nur während des Builds benötigt werden, auch im
endgültigen Image landen.

Mit Multistage Builds können Sie verschiedene "Bauphasen" in einem Dockerfile
definieren. In jeder Phase können Sie unterschiedliche Basis-Images verwenden
und nur die Teile, die Sie wirklich benötigen, in das endgültige Image kopieren.

### Beispiel

Angenommen, Sie haben eine einfache Node.js-Anwendung. Hier ist ein einfaches
Dockerfile mit Multistage Builds:

```Dockerfile
# Erste Phase: Build
FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Zweite Phase: Produktion
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

#### Erklärung des Beispiels:

1. Erste Phase (Build):
   - Wir verwenden das Node.js-Image (`node:14`) als Basis.
   - Wir setzen das Arbeitsverzeichnis auf /app.
   - Wir kopieren die package.json-Dateien und installieren die Abhängigkeiten.
   - Dann kopieren wir den gesamten Code und führen den Build-Befehl aus, um die
     Anwendung zu erstellen.

2. Zweite Phase (Produktion):
   - Hier verwenden wir ein leichtgewichtiges Nginx-Image (`nginx:alpine`).
   - Wir kopieren nur die gebauten Dateien (/app/dist) aus der ersten Phase in
     das Nginx-Image.
   - Das endgültige Image enthält also nur die notwendigen Dateien für die
     Ausführung der Anwendung, nicht die Build-Tools oder den Quellcode.

### Vorteile von Multistage Builds:

- **Kleinere Images**: Nur die benötigten Dateien werden ins finale Image
  kopiert, was die Grösse reduziert.
- **Schnelleres Deployment**: Kleinere Images laden schneller.
- **Sauberer Code**: Sie können verschiedene Umgebungen (Build, Test,
  Produktion) klarer trennen.

Multistage Builds sind also eine sehr nützliche Technik, um Docker-Images
effizienter zu gestalten!

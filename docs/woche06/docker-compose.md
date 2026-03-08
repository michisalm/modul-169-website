---
sidebar_position: 2
---

# Docker Compose

## Warum Docker Compose

Docker Compose ist ein leistungsstarkes Tool, das die Verwaltung von
Multi-Container-Anwendungen in Docker erheblich vereinfacht. Es ermöglicht
Entwicklern, komplexe Anwendungen, die aus mehreren Services bestehen, einfach
zu definieren, zu starten und zu verwalten. Hier sind einige Gründe, warum
Docker Compose nützlich und sinnvoll ist:

### 1. Einfache Definition von Multi-Container-Anwendungen

Mit Docker Compose können Sie **alle** Komponenten Ihrer Anwendung in einer
einzigen YAML-Datei (`docker-compose.yml`, oder `compose.yml`) definieren. Diese
Datei beschreibt die verschiedenen **Services** (Docker Image/Container),
**Netzwerke** und **Volumen**, die Ihre Anwendung benötigt. Dadurch wird die
Konfiguration klar und übersichtlich, was die Zusammenarbeit im Team
erleichtert.

:::tip

- :bulb: Das `docker-compose.yml` ermöglicht es **alle Parameter** für die
  `docker ...` Befehle übersichtlich zu beschreiben.
- Anstatt viele `docker ...` Befehle, lässt sich eine gesamte Umgebung mit einem
  einzigen Befehl (`docker compose up`) starten.

:::

### 2. Konsistenz in der Entwicklungsumgebung

Docker Compose sorgt dafür, dass alle Entwickler in einem Team die gleiche
Umgebung verwenden. Wenn jeder Entwickler die gleiche `docker-compose.yml`-Datei
verwendet, können Sie sicherstellen, dass Ihre Anwendung unter denselben
Bedingungen startet. Dies reduziert Probleme, die durch unterschiedliche
Umgebungen entstehen können, und erleichtert das Debugging.

### 3. Einfache Verwaltung von Abhängigkeiten

In vielen Anwendungen gibt es Abhängigkeiten zwischen verschiedenen Services,
wie z. B. zwischen einer Webanwendung und einer Datenbank. Docker Compose
ermöglicht es Ihnen, diese Abhängigkeiten einfach zu definieren. Mit der
`depends_on`-Option können Sie sicherstellen, dass Services in der richtigen
Reihenfolge gestartet werden, was die Verwaltung komplexer Anwendungen
erleichtert.

### 4. Schnelles Starten und Stoppen von Anwendungen

Mit nur einem Befehl (`docker-compose up`) können Sie alle definierten Services
starten. Ebenso können Sie mit `docker-compose down` alle Container und
Netzwerke, die von der Anwendung verwendet werden, schnell stoppen und
entfernen. Dies spart Zeit und Aufwand, insbesondere bei der Entwicklung und dem
Testen.

### 5. Skalierbarkeit

Docker Compose ermöglicht es Ihnen, die Anzahl der Instanzen eines Services
einfach zu skalieren. Sie können die Anzahl der Replikate eines bestimmten
Services in der `docker-compose.yml`-Datei angeben, und Docker Compose kümmert
sich um den Rest. Dies ist besonders nützlich, wenn Sie Ihre Anwendung in einer
Produktionsumgebung skalieren möchten.

### 6. Integration mit Docker Swarm mode

Docker Compose kann auch in Verbindung mit
[Docker Swarm mode](https://docs.docker.com/engine/swarm/) verwendet werden, um
Container-Orchestrierung zu ermöglichen. Dies bedeutet, dass Sie Ihre
Compose-Datei verwenden können, um Anwendungen in einem Cluster von Docker-Hosts
zu verwalten, was die Bereitstellung und Verwaltung von Anwendungen in grossem
Massstab erleichtert.

:::note

- [Docker Swarm mode](https://docs.docker.com/engine/swarm/) ist nicht das
  gleiche wie [Docker Swarm](https://github.com/docker-archive/classicswarm).
  [Hier ein Vergleich](https://dockerlabs.collabnix.com/intermediate/swarm/difference-between-docker-swarm-vs-swarm-mode-vs-swarmkit.html).
- Docker Swarm wird nicht mehr weiterentwickelt.
- [Docker Swarm mode](https://docs.docker.com/engine/swarm/) erlaubt ähnliches
  out-of-the-box, jedoch noch nicht alles.

:::

### 7. Einfache Verwaltung von Umgebungsvariablen

Docker Compose ermöglicht es Ihnen, **Umgebungsvariablen** einfach zu definieren
und zu verwalten. Sie können eine `.env`-Datei verwenden, um sensible
Informationen wie Datenbank-Passwörter oder API-Schlüssel zu speichern, ohne sie
direkt in der `docker-compose.yml`-Datei anzugeben. Dies erhöht die Sicherheit
und Flexibilität Ihrer Anwendung.

### 8. Visualisieren einer Umgebung

Mit dem Tool
[Docker Compose Viz](https://github.com/pmsipilot/docker-compose-viz) kann ein
docker-compose.yml visualisiert werden. Es zeichnet ein Diagramm, dass unserer
Richtlinie folgt. Dies hilft der Dokumentation noch mehr.

Diese Befehle im Ordner der `docker-compose.yml` Datei ausführen:

```bash title="Linux/Mac: bash"
docker run --rm -it --name dcv -v $(pwd):/input pmsipilot/docker-compose-viz render -m image docker-compose.yml
````

```powershell title="Windows: Powershell"
docker run --rm -it --name dcv -v ${pwd}:/input pmsipilot/docker-compose-viz render -m image docker-compose.yml
```

## Fazit

[Docker Compose](https://docs.docker.com/compose/) ist ein unverzichtbares
Werkzeug für alle die mit Docker arbeiten. Es vereinfacht die Verwaltung von
Multi-Container-Anwendungen, sorgt für Konsistenz in der Entwicklungsumgebung
und ermöglicht eine einfache Skalierung und Verwaltung von Abhängigkeiten.
Docker Compose eignet sich auch als Dokumentation einer Umgebung.

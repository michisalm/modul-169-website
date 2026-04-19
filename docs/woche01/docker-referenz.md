---
sidebar_position: 4
---

# Docker CLI - Referenz

Allgemeine Informationen über das System. Hilfreich beim debuggen von Probleme
mit dem Daemon oder Speicher.

```bash
docker info
```

System bereinigen. Gut, wenn der Diskspace Probleme macht.

```bash
docker system prune # löscht Images, Volumen und Container von gestoppten Containern
docker images prune # löscht nur Images von gestoppten Containern
```

## Container Verwaltung

### Informationen über alle Container Ressourcen anzeigen

```bash
docker container stats
```

### docker run

#### **Erstellen und starten eines Containers** aus einem Image (Image starten)

```bash
docker run <image_name>
```

```bash title="Beispiel"
docker run ubuntu
```

#### Erstellen eines Containers aus einem Image **mit spezifischem Containernamen**

```bash
docker run --name <container_name> <image_name>
```

```bash title="Beispiel"
docker run --name mein-ubuntu ubuntu
```

:::info

- Der Container Name ist automatisch auch der **DNS Name** vom Container.

:::

#### Erstellen eines Containers aus einem Image mit spezifischem Containernamen, **im Hintergrund**.

```bash
docker run -d --name <container_name> <image_name>
```

```bash title="Beispiel"
docker run -d --name mein-ubuntu ubuntu
```

#### Erstellen eines Containers aus einem Image mit spezifischem Containernamen im Hintergrund **mit Portweiterleitung**.

```bash
docker run -p <host_port>:<container_port> -d --name <container_name> <image_name>
```

```bash title="Beispiel"
docker run -p 8080:80 -d --name mein-ubuntu ubuntu
```

#### Erstellen eines, beim Stoppen selbstlöschenden Containers, mit spezifischem Containernamen, im interactive mode.

```bash
docker run --rm -it --name <container_name> <image_name>
```

```bash title="Beispiel"
docker run --rm -it --name meine-busybox busybox:1.37.0
```

#### Erstellen eines Containers mit Environmentvariablen

```bash
docker run -e MY_ENV=Value -e MY_OTHER_ENV=Value <image_name>
```

### docker start

#### **Starten** eines Containers

```bash
docker start <container_name>
```

### docker stop

#### **Stoppen** eines Containers

```bash
docker stop <container_name>
```

:::info

- `docker run` erstellt und startet ein Container.

:::

### docker rm

#### Ein gestoppter **Container entfernen** (löschen)

```bash
docker rm <container_name>
```
### docker ps

#### Laufende **Container auflisten**

```bash
docker ps
```

#### Laufende **und gestoppte Container auflisten**

```bash
docker ps -all
```

### docker logs

#### **Logs** vom Container anzeigen

```bash
docker logs <container_name>
```

### docker exec

#### **Ein Befehl** in einem laufenden Container ausführen

```bash
docker exec -it <container_name> echo "hallo"
```

#### Eine **Shell in einem laufenden Container** ausführen.

```bash
docker exec -it <container_name> /bin/bash
```

### docker inspect

#### Ein **laufender Container Inspizieren**. Zeigt Metadaten sowie Volumen und Netzwerk Informationen über einen laufenden Container an.

```bash
docker inpect <container_name>
```

:::info

- Es lohnt sich die
  [offizielle Doku von inspect](https://docs.docker.com/reference/cli/docker/inspect/)
  zu studieren. Vieles ist möglich!

:::

## Image Verwaltung

### docker images

Alle lokal verfügbaren **Images** anzeigen.

```bash
docker images
```

### docker build

Ein Image aus einem Dockerfile im aktuellen Ordner erstellen (Bauen).

```bash
docker build -t <image_name>:<image_tag> .
```

Ein Image aus einem Dockerfile im aktuellen Ordner **ohne Cache** erstellen.
Dies kann nützlich sein, wenn Probleme auftreten.

```bash
docker build -t <image_name>:<image_tag> . --no-cache
```

```bash title="Beispiel"
docker build -t myimage:v1
```

### docker tag

Ein **Image Tagen**. Erstellt ein neuer Tag für ein existierendes Image.

```bash
docker tag <source_image> <target_image>
```

```bash title="Beispiel"
docker tag my-app:latest my-app:1.0
```

### docker image inspect

Ein **Image inspizieren**. Zeigt Informationen über die Metadaten, layer,
environment variablen, Netzwerke usw. an. Sehr nützlich um zu debuggen!

```bash
docker image inspect <image_name>
```

```bash title="Beispiel"
docker image inspect ubuntu
```

### docker rmi

Ein **Image entfernen**.

```bash
docker rmi <image_name>
```

**Alle Images entfernen**.

```bash
docker rmi -f $(docker images -q)
```

## Registry

### docker login

An der **Registry anmelden**.

```bash
docker login -u <username>
```

### docker pull

Ein **Image von der Registry herunterladen**.

```bash
docker pull <image_name>
```

```bash title="Beispiel"
docker pull ubuntu
```

:::info

- Wenn nur ein name angegeben wird, ohne registry URL, wird automatisch das
  Image auf hub.docker.com gesucht!

:::

### docker push

Ein lokales Image in die Registry hochladen.

```bash
docker push <username>/<image_name>:<image_tag>
```

```bash title="Beispiel"
docker push michisalm/my-app:1.0
```

## Netzwerkverwaltung

- **docker network**: Verwaltet Docker-Netzwerke. Mit Unterbefehlen wie docker
  network ls können Sie Netzwerke auflisten.

## Volumenverwaltung

- **docker volume**: Verwaltet Docker-Volumes, die zur Speicherung von Daten
  verwendet werden. Beispiel: docker volume ls listet alle Volumes auf.

Diese Befehle sind grundlegend für die Arbeit mit Docker und helfen Ihnen,
Container und Images effektiv zu verwalten.

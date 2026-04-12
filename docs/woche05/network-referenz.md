---
sidebar_position: 3
---

# Docker Network - Referenz

### Netzwerke anzeigen und inspizieren (inspect)

Liste aller Netzwerke anzeigen

```bash
docker network ls
```

Details zu einem bestimmten Netzwerk anzeigen

```bash
docker network inspect <netzwerkname>
```

### Netzwerke erstellen

Ein neues Bridge-Netzwerk erstellen

```bash
docker network create <netzwerkname>
```

Ein Overlay-Netzwerk erstellen

```bash
docker network create --driver overlay <netzwerkname>
```

Ein Macvlan-Netzwerk erstellen

```bash
docker network create -d macvlan --subnet=<subnet> --gateway=<gateway> -o parent=<interface> <netzwerkname>
```

Ein IPvlan-Netzwerk erstellen

```bash
docker network create -d ipvlan --subnet=<subnet> --gateway=<gateway> <netzwerkname>
```

### Netzwerke entfernen

Ein Netzwerk löschen

```bash
docker network rm <netzwerkname>
```

### Container mit Netzwerken verbinden

Einen Container in einem Netzwerk starten

```bash
docker run -d --name <containername> --network <netzwerkname> <image>
```

Einen laufenden Container mit einem bestehenden Netzwerk verbinden

```bash
docker network connect <netzwerkname> <containername>
```

Einen Container von einem Netzwerk trennen

```bash
docker network disconnect <netzwerkname> <containername>
```

### Ports und Exposition (Portmapping)

Einen Container mit Portweiterleitung starten

```bash
docker run -d -p <host-port>:<container-port> --name <containername> <image>
```

## Beispielbefehle

Hier sind einige Beispielbefehle, die die Verwendung der oben genannten Befehle
veranschaulichen:

Erstellen eines Bridge-Netzwerks, "mein_netzwerk":

```bash
docker network create mein_netzwerk
```

Einen nginx Container im neuen Netzwerk "mein_netzwerk" starten.

```bash
docker run -d --name mein_container --network mein_netzwerk nginx
```

Einen nginx Container im neuen Netzwerk "mein_netzwerk" starten, welcher den
internen port 80 nach 8080 zum Host öffnet (exposed).

```bash
docker run -d --name mein_container_exposed --network mein_netzwerk -p 8080:80 nginx
```

Erstellen eines Bridge-Netzwerks, "mein_anderes_netzwerk".

```bash
docker network create mein_anderes_netzwerk
```

Den laufenden Container "mein_container" mit dem Netzwerk
"mein_anderes_netzwerk" verbinden.

```bash
docker network connect mein_anderes_netzwerk mein_container
```

Details zum Netzwerk "mein_netzwerk" anzeigen

```bash
docker network inspect mein_netzwerk
```

Details zum Netzwerk "mein_anderes_netzwerk" anzeigen

```bash
docker network inspect mein_anderes_netzwerk
```

Das Netzwerk "mein_netzwerk" entfernen

```bash
docker network rm mein_netzwerk
```

Das Netzwerk "mein_anderes_netzwerk" entfernen

```bash
docker network rm mein_anderes_netzwerk
```

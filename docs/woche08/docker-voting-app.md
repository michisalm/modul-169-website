---
sidebar_position: 3
---

# Docker Voting App

Um den Swarm Mode zu demonstrieren, werden wir in dieser Übung alle Ubuntu VMs
zu einem docker swarm verbinden und das offizielle Docker Beispiel
["Example Voting App"](https://github.com/dockersamples/example-voting-app)
darauf deployen.

## Auftrag

1. Startet alle die VM "Modul 169" auf der Workstation.
2. Öffnet ein Terminal.
3. Klont mit folgendem Befehl das Repository von Docker.

```bash
git clone https://github.com/dockersamples/example-voting-app.git
```

4. Navigiert in das repository

```bash
cd example-voting-app
```

6. Das docker-compose.yml editieren

```bash
code docker-compose.yml
```

Auf der ersten Linie `version: "3.8"` einfügen.

7. Visualisieren

```bash
docker run --rm -it --name dcv -v $(pwd):/input pmsipilot/docker-compose-viz render -m image docker-compose.yml
```

8. die Datei docker-compose.png öffnen und staunen 🤯

9. Öffnet den Browser und wählt euch in euer
   [Google Mail](https://mail.google.com) mit eurem BBZBL Account ein.

10. **Wartet auf die Lehrperson!**

### Befehl vom Manager Node

11. **Die Lehrperson** erstellt nun einen docker swarm Manager mit dem Befehl

```bash
docker swarm init
```

Es wird ein Swarm initialisiert. Im Output sollte ein Befehl wie folgender
ausgegeben werden (mit token, ip und port!). Dieser für die Übung an die Klasse
per Mail versenden, damit alle dem Swarm beitreten können.

```bash
docker swarm join --token <token> <ip>:<port>
```

:::caution

- Natürlich sollte dies produktiv nicht per Mail verbreitet werden 😅

:::

12. Alle geben den versendeten `docker swarm join` Befehl ein

13. Alle Nodes auflisten

```bash
docker node ls
```

14. Die Kommunikation zwischen den Nodes verschlüsseln

```bash
docker swarm ca --rotate
```

15. Die App deployen

```bash
docker stack deploy --compose-file docker-stack.yml vote
```

**Erklärungen**
- **docker stack deploy**: Stack auf dem Swarm erstellen oder aktualisieren
- **--compose-file docker-stack.yml**: Zu verwendene Stack-Datei festlegen
- **vote**: Stack-Name, Präfix für alle Ressourcen: vote_redis, vote_result, vote_vote, vote_worker


16. Die Services auflisten

```bash
docker service ls
```

17. Den Swarm Visualisieren, nach jeder status Änderung die Visualisierung
    anschauen. Den [Visualizer im Browser](http://localhost:8088) öffnen.

```bash
docker run -it -d -p 8088:8080 -v /var/run/docker.sock:/var/run/docker.sock dockersamples/visualizer
```

18. Den Service skalieren (Mehr Containers pro Service)

```bash
docker service scale vote_vote=30
```

Es muss **vote_**vote heissen wegen dem Namen resp. Präfix des Docker Stacks (siehe 15.).

19. Der Manager macht ein anderen Node zum Manager

```bash

docker swarm join-token manager
```

Der Output ist wieder ein `docker join ...` Befehl. Diesen mehreren Lernenden
versenden. Diese müssen den Befehl ausführen damit Sie als Manager Node
fungieren. Achtung: zuerst den Swarm verlassen mit `docker swarm leave`.

Alternativ kann der Manager einen Worker direkt zu einem weiteren Manager befördern:
`docker node promote worker1` (`docker node demote worker1`)

### Wieder auf allen Maschinen

20. Die [Voting App öffnen](http://localhost:8080) und die
    [Result App](http://localhost:8081) im Browser öffnen.

21. Eine Vote abgeben.

22. Jeder soll schauen wie viele Prozesse auf seiner Maschine laufen.

```bash
docker ps
```

23. Die hälfte soll nun den Swarm verlassen, die services sollten sich nun neu
    verteilen

```bash
docker swarm leave
```

24. Jeder soll schauen wie viele Prozesse auf seiner Maschine laufen.

```bash
docker ps
```

25. Der letzte Manager verlässt den Swarm und beendet ihn damit

```bash
docker swarm leave --force
```

:::info

- `--force` ist nötig, weil der Master natürlich wichtig ist.

:::

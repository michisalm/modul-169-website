---
marp: true
theme: bbzbl
paginate: true
header: Modul 169 - Git / Docker Images
footer: BBZBL / Lukas Hodel / Michael Salm / Services mit Containern bereitstellen
---

<!-- _class: big center -->

# Git / Docker Images

## Modul 169

---

# Inhalt

:::columns r65

- **Repetition**

- **Modul 169 VM**

- **Git**<br/>
  - Grundlagen
  - Installieren
  - Konfigurieren
  - SSH-Key

::: split

- **Docker Image**<br/> _Schichtenarchitektur / Eigenschaften / Bilden eines
  Image_

- **Dockerfile**<br/> _Befehle / Caching / Multistage Build_
- **Übungen**<br/> _zu Docker Image und Dockerfile_
  <!-- - **Docker Hub** -->
  <!-- - eigene **Apps containerisieren** -->

:::

---

<!-- _class: big center -->

# Was versteht Ihr unter einem Container?

---

<!-- _class: center -->

# Virtuelle Maschine / Container

![inline height:500](img/vm-vs-container.png)

---

<!-- _class: big center -->

# :bulb: Container teilen \*_physikalische_ Ressourcen!

\* unter Linux 🤓

---

<!-- _class: big center -->

# Modul 169 VM

## Live Demo der Umgebung durch Lehrperson

---

# 📖 Auftrag

::: columns l60

Lesen Sie das Kapitel "Git"

- [Git Start](https://michisalm.github.io/modul-169-website/docs/woche02/git)

::: split

- :dna: Einzelarbeit
- :clock1: 10 Min

:::

---

<!-- _class: big center -->

# GIT Demo

- GitHub Projekte zeigen
- Commits
- Änderungen sehen
- PR vs Mergen

---

# :pencil: Auftrag

::: columns l60

Machen Sie die Übung "Git: Start".

- [Git Start](https://michisalm.github.io/modul-169-website/docs/woche02/uebungen/aufgabe-git)

::: split

- :dna: Einzelarbeit
- :clock1: Bis zur grossen Pause

:::

---

<!-- _class: big center -->

# 🛌 20 Min Pause

---

# :pencil: Auftrag

::: columns l60

Lesen und Machen Sie die Übung "Git: Übungs-Repository".

- [Git: Übungs-Repository](https://michisalm.github.io/modul-169-website/docs/woche02/uebungen/aufgabe-git-clone)

::: split

- :dna: Einzelarbeit
- :clock1: bis zur Grossen Pause

:::

---

<!-- _class: big center -->

# Wie werden Docker Images erstellt?

---

# Docker: vom File zum Container

![docker-file-image-container](./img/docker-file-image-container.png)

---

# Docker: Hauptmerkmale

::: columns

## Dockerfile

```dockerfile
FROM ubuntu

COPY . /app

RUN pip install -r requirements.txt

CMD ["python", "app.py"]
```

Vom File zum Image

```bash
docker build . -t webapp:1.12.5
```

::: split

## Image

- **Schichtenarchitektur:**
  - _FROM, RUN, COPY, ADD, WORKDIR → **verändern Dateisystem**_
- **Portabilität:**
  - on premise / cloud (kubernetes)
- **Versionierung**:
  - _tag: z.B. webapp:1.12.5_
- **Verteilung:** _Container Registry_

:::

---

# 📖 Auftrag

::: columns l60

Lesen Sie auf der Modulwebseite Woche 2

- [Docker Images](https://michisalm.github.io/modul-169-website/docs/woche02/docker-images)
  - Bis und Mit
    ["Dockerfile"](https://michisalm.github.io/modul-169-website/docs/woche02/docker-images#dockerfile-1)

::: split

- :dna: Einzelarbeit
- :clock1: 10 Min

:::

---

<!-- _class: big center -->

# Dockerfile Demo

---

# :pencil: Auftrag

::: columns

Machen Sie die
[Übung 1](https://michisalm.github.io/modul-169-website/docs/woche02/uebungen/aufgabe-einfaches-dockerfile)
unter Einfaches Dockerfile.

- Öffnen Sie den Ordner der Übung01
- Kopieren Sie die Lösung
- Passen Sie den Author an
- Bilden Sie das Docker Image
- Listen Sie das Image
- Erstellen Sie einen Container

::: split

## Git Bash Befehle

```bash
cd ./02-dockerimage/uebung01

cp ./solution/Dockerfile Dockerfile

code Dockerfile # öffnet VS-Code

docker buildx build -t uebung01 .

docker images

docker run uebung01

docker ps
```

:::

---

# Warum jetzt Git für Docker?

- Git eignet sich für die Versionierung von Textfiles

- Das Dockerfile ist ein Textfile.
- Docker Images sind auch getagget 🤝.
- Es ist klar, welchen Code welches Image gebaut hat.
- Automatisierung braucht immer beschreibenden Code.

---

# 📖 Auftrag

::: columns l60

Lesen Sie auf der Modulwebseite Woche 2

- [Image builden](https://michisalm.github.io/modul-169-website/docs/woche02/docker-images#image-bilden)
- [Caching beim Erstellen von Docker-Images](https://michisalm.github.io/modul-169-website/docs/woche02/docker-images#caching-beim-erstellen-von-docker-images)
- [Multistage Builds](https://michisalm.github.io/modul-169-website/docs/woche02/docker-images#multistage-builds)

::: split

- :dna: Einzelarbeit
- :clock1: 10 Min

:::

---

# 🔨 Auftrag

::: columns l60

Lösen Sie die weiteren Aufgaben von "Einfaches Dockerfile" und **mindestens
eine** von "Multistage Dockerfile".

- [Einfaches Dockerfile](https://michisalm.github.io/modul-169-website/docs/woche02/uebungen/aufgabe-einfaches-dockerfile)
  - Übungen 1 - 10

- [Multistage Dockerfile](https://michisalm.github.io/modul-169-website/docs/woche02/uebungen/auftage-multistage-dockerfile)
  - Übungen 11 - 12

::: split

- :dna: Einzelarbeit
- :clock1: 60 Min

:::

---

# Hausaufgaben

- Üben, üben, üben.

- Es gibt genug Übungen.
- Sie können sie auch wiederholen! Das schadet nicht ;)

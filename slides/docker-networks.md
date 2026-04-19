---
marp: true
theme: bbzbl
paginate: true
header: Modul 169 - Docker Networks
footer: BBZBL / Lukas Hodel / Services mit Containern bereitstellen
---

<!-- _class: big center -->

# Docker Networks

## Modul 169

---

# Inhalt

:::columns

- **Repetition**
- **Prüfung**

::: split

- **Docker Netzwerke**
- **Übungen**<br/> _zu Docker Netzwerke_

:::

---

<!-- _class: big center -->

# Regeln 👮‍♀️

## _INP24C_ spezial

---

# §1 Fokus und Geräte

::: columns

Die **digitalen Geräte**: 📱, 💻, etc.

- immer nur auf **Aufforderung der Lehrkraft**
- immer nur zur **Bearbeitung der gestellten Aufgaben**

**Private Aktivitäten sind untersagt**: _unter anderem Social Media, Spiele,
Videos, private E-Mails/Chats, Surfen, Shoppen, etc._

::: split s1

### 1. Verwarnung

- **Mündliche** Ermahnung durch Lehrperson

### 2. Verwarnung

- 👨‍🏫 Das Gerät ist für den **Rest der Lektion bei der Lehrperson** zu
  hinterlegen.
- 🚨 **Absenz**, wenn dadurch nicht gearbeitet werden kann!
- 🗣️ **Meldung an den Berufsbildner**.

:::

---

# §2 Ruhe und Umgangsformen

::: columns

Die Konzentration der Mitschüler muss gewährleistet sein.

- **Lärm ist zu vermeiden**<br/> z.B. laute Gespräche, Geräusche, Rufen.

- **Freundlicher, höflicher und respektvoller** Umgangston

::: split s1

### 1. Verwarnung

- **Mündliche** Ermahnung durch Lehrperson.
- Evtl. auf separaten Arbeitsplatz versetzen.

### 2. Verwarnung

- 🚪 Für den Rest der Lektion **aus dem Unterricht gewiesen**.
- 🚨 Die gesamte Lektion gilt als **Absenz**.
- 🗣️ **Meldung an den Berufsbildner**.

:::

---

> Achte auf deine Gedanken, denn sie werden Worte.
>
> Achte auf deine Worte, denn sie werden Handlungen.
>
> Achte auf deine Handlungen, denn sie werden Gewohnheiten.
>
> Achte auf deine Gewohnheiten, denn sie werden dein Charakter.
>
> Achte auf deinen Charakter, denn er wird dein Schicksal.
>
> -- Talmud

---

# Prüfung

---

<!-- _class: big -->

## Repetition

# Was passiert mit neu erstellten Daten, wenn ein Container gestoppt und gelöscht wird?

---

<!-- _class: big -->

## Repetition

# Was ist ein Bind Mount?

---

<!-- _class: big -->

## Repetition

# Was ist ein Docker Volumen?

---

<!-- _class: big -->

# Wie können Container miteinander kommunizieren?

- Warum sollten sie das können?

- Gibt es Sicherheitsaspekte?

---

<!-- _class: big center -->

# Docker Networks

---

![bg width:65%](./img/network-overview.svg)

---

# Demo docker network

```bash
docker network ls
docker network inspect bridge
docker network create my-network
docker network ls

docker run -d --rm --name my-container --network my-network nginx
docker inspect my-container

docker network disconnect my-network my-container
docker inspect my-container

docker network connect my-network my-container
docker inspect my-container

docker container stop my-container
docker network rm my-network
```

---

# 📖 Auftrag

::: columns l60

Lesen Sie das Kapitel "Docker Network"

- [Docker Network](https://michisalm.github.io/modul-169-website/docs/woche05/docker-network)

::: split

- :dna: Einzelarbeit
- :clock1: 15 Min

:::

---

# 📝 Auftrag

::: columns l60

Lesen und Machen Sie die Übung 6: Netzwerk Grundlagen

- [Übung 6: Netzwerk Grundlagen](https://michisalm.github.io/modul-169-website/docs/woche05/uebungen-network/aufgabe-network-06)

::: split

- :dna: Einzelarbeit
- :clock1: 20 Min

:::

---

# Netzwerk Diagramme

1. Es gibt **keinen wirklichen Standard**.

2. Es gibt Icons von Cisco, AWS, ...
3. **Physikalische** Diagramme: beschreiben **Hardware**.
4. **Logische** Diagramme: beschreiben **Zusammenhänge**.

---

# Legende _vom Unterricht_

::: columns

## Logisch

![inline height:400px](./img/network-legende-logisch.svg)

::: split

## Physikalisch

![inline fit](./img/network-legende-physikalisch.svg)

:::

---

<!-- _class: center -->

# Physikalische Netzwerk Diagramme

![inline height:500px](./img/network-physikalisch.svg)

---

<!-- _class: center -->

# Logische Netzwerk Diagramme

![inline height:500px](./img/network-overview.svg)

---

# 📝 Auftrag

::: columns l60

Lesen und Machen Sie die Übungen 7-9

- [Übung 7: Docker Networking und DNS](https://michisalm.github.io/modul-169-website/docs/woche05/uebungen-network/aufgabe-networks-07)
- [Übung 8: MariaDB und phpMyAdmin im Docker-Netzwerk](https://michisalm.github.io/modul-169-website/docs/woche05/uebungen-network/aufgabe-networks-08)
- [Übung 9: Diagramme](https://michisalm.github.io/modul-169-website/docs/woche05/uebungen-network/aufgabe-networks-09)

::: split

- :dna: Einzelarbeit
- :clock1: bis ans Ende des Unterrichts

:::

---

> Als die Nazis die Kommunisten holten, habe ich geschwiegen;
>
> - ich war ja kein Kommunist.
>
> Als sie die Gewerkschaftler holten, habe ich geschwiegen,
>
> - ich war ja kein Gewerkschaftler.
>
> Als sie die Juden holten, habe ich geschwiegen,
>
> - ich war ja kein Jude.
>
> Als sie mich holten, gab es keinen mehr, der protestieren konnte.
>
> – Martin Niemöller

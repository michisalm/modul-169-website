---
sidebar_position: 1
---

# Docker Security

Security ist ein wichtiges, jedoch auch schwieriges Thema. Es muss
kontinuierlich geprüft und angepasst werden. Hier sind 4 "Best Practices" auf
deren Grundlage aufgebaut werden können.

## 1. Minimale, offizielle Images verwenden

Verwende so kleine Basis-Images wie möglich (z. B. `node:alpine` oder
"distroless").

- **Vorteil**: Ein kleineres Image hat eine geringere Angriffsfläche, da
  unnötige Tools wie Shells, Paketmanager oder Editoren fehlen.
- **Effekt**: Weniger Sicherheitslücken *und sc*hnellere Downloads.

:::danger

- **3rd-Party Images mit Vorsicht** verwenden. Natürlich könnten die
  Schadsoftware einschläusen!

:::

### Beispiel

Anstatt einem `ubuntu` image noch node zu installieren, kann direkt das
offizielle `node` image verwendet werden. Diese gibt es fast für alle
Programmiersprachen und auch Systeme wie `nginx`.

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
CMD ["node", "index.js"]
```

## 2. Multistage Images

Nutze mehrere FROM-Anweisungen in einem Dockerfile, um Build-Tools vom fertigen
Image zu trennen.

- **Vorteil**: Du installierst Compiler, Header und Caches in der ersten Stufe
  ("Build"), kopierst aber nur die fertigen Binärdateien in die finale, schlanke
  Stufe.
- **Effekt**: Dein produktives Image enthält keinen Quellcode oder
  Build-Werkzeuge, die Angreifern helfen könnten.

### Beispiel

Hier wird zuerst die Node Applikation in einem `node:20` Image gebaut und dann
in ein produktives `node:20-slim` image kopiert. Dadurch entfallen die Build
dependencies.

```dockerfile
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
COPY server.js ./
RUN npm install

# Stage 2: Production stage "slim!"
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "start"]
```

## 3. Kein Root User verwenden

Container laufen standardmässig als root. Erstelle stattdessen einen dedizierten
Benutzer (z. B. mit `useradd`) und wechsle mit `USER` im Dockerfile.

- **Vorteil**: Falls ein Angreifer eine Lücke in deiner App findet, landet er in
  einer Umgebung mit minimalen Rechten (Least Privilege).
- **Effekt**: Er kann keine Systemdateien ändern und ein "Ausbruch" auf das
  Host-System wird massiv erschwert.

### Beispiel

Hier wird einem offiziellen Ubuntu Image ein user **appuser** erstellt und
verwendet.

```dockerfile
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com | bash - \
    && apt-get install -y nodejs && rm -rf /var/lib/apt/lists/*
# Eigenen Benutzer und Gruppe anlegen und verwenden
RUN adduser --system --group --home /home/appuser appuser
WORKDIR /app
RUN chown appuser:appuser /app # Rechte setzen
USER appuser # User appuser verwenden
COPY --chown=appuser:appuser package*.json ./ # Berechtigungen geben
RUN npm install --production
COPY --chown=appuser:appuser . .
CMD ["node", "index.js"] # App starten
```

## 4. Keine Secrets im Code

Speichere Passwörter, API-Keys oder Zertifikate **niemals im Quellcode** oder
direkt im Dockerfile (ENV).

- **Vorteil**: Secrets bleiben ausserhalb deines Git-Repositorys und der
  Image-Layer (wo sie mit docker history sichtbar wären).
- **Lösung**: Nutze Tools wie [fnox](https://fnox.jdx.dev/),
  [Docker Secrets](https://docs.docker.com/engine/swarm/secrets/) zusammen mit
  Umgebungsvariablen, die erst zur Laufzeit sicher injiziert werden.

### Beispiele

#### Fnox

```bash
fnox init
# Ein Secret verschlüsselt hinzufügen (wird in fnox.toml gespeichert)
fnox set DB_PASSWORD "mein-super-geheimes-passwort"

# fnox entschlüsselt DB_PASSWORD und übergibt es an Docker
fnox exec -- docker run -d \
  --name meine-app \
  -e DB_PASSWORD \
  mein-node-image
```

#### Locale Datei

```bash
# Datei mit Secret erstellen, Achtung: Bash-History leeren!
echo "MY_PASSWORD=super-geheim-123" > .env.secret

# Container starten und die Datei einbinden
docker run -d \
  --name meine-app \
  --env-file .env.secret \
  mein-node-image
```

#### Docker Secrets

```bash
# Datei mit Secret erstellen, Achtung: Bash-History leeren!
echo "MY_PASSWORD=super-geheim-123" > .password.txt
```

```yaml
services:
  app:
    image: mein-node-image
    secrets:
      - db_password

secrets:
  db_password:
    file: ./password.txt
```

## Netzwerk

Ein weiterer Aspekt der Security ist die Isolierung durch verschiedene
Netzwerke. Darauf wird in der
[Woche 05](/docs/woche05/docker-network.md#sicherheit-im-docker-networking)
näher eingegangen.

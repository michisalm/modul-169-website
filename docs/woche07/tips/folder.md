# Ausschluss von Ordnern beim Bind Mount

In Docker Compose können Sie mit
[Bind Mounts](/docs/lektionen/woche03/docker-volume.md#bind-mounts)
Verzeichnisse von Ihrem Host-System in Container einbinden. Manchmal möchten Sie
jedoch bestimmte Ordner im Container ausschliessen, während Sie andere einbinden.
Hier erfahren Sie, wie Sie dies erreichen können.

## Ausschluss von Ordnern

Um einen Ordner beim Bind Mount auszuschliessen, können Sie mehrere Mounts in
Ihrer docker-compose.yml-Datei definieren. Wird ein Volume mount als Path
definiert, ohne, dass ein Host pfad angegeben wird (das ":" fehlt), wird ein
Pfad im container mit sich selbst referenziert. Dies hat den Effekt, dass dieser
Pfad, ignoriert wird, wenn er ein Unterordner eines anderen Mounts ist.

Beispiel:

```yaml title="docker-compose.yml"
services:
  app:
    image: my_image
    volumes:
      - todo_data:/etc/todos # Benanntes Volume für persistente Daten, kein Bind Mount!
      - /app/node_modules # Mount für node_modules mit sich selbst
      - ./:/app # Bind Mount für das aktuelle Host Verzeichnis (./) nach /app
volumes:
  todo_data:
```

### Erläuterung

- **Benanntes Volume**:
  - `todo_data:/etc/todos` speichert Daten, die zwischen Container-Neustarts
    persistent bleiben. Dies ist kein
    [Mount Bind](/docs/lektionen/woche03/docker-volume.md#bind-mounts), sondern
    ein
    [Docker Volume](/docs/lektionen/woche03/docker-volume.md#docker-volumes).
- **Bind Mount für node_modules**:
  - `/app/node_modules`: Stellt sicher, dass das node_modules-Verzeichnis im
    Container nicht mit dem Host synchronisiert wird, was Konflikte vermeidet.
    **Zu beachten ist, dass dieses kein ":" beinhaltet**. Also sich, mit sich
    selbst mountet.
- **Bind Mount für das aktuelle Verzeichnis**:
  - `./:/app`: Bindet das gesamte aktuelle Verzeichnis in den Container, mit
    Ausnahme des Verzeichnisses `node_modules`. Dieses wird ignoriert, da im
    Container bereits einen Mount dafür vorhanden ist.

## Fazit

Durch die Verwendung mehrerer Mounts können Sie gezielt steuern, welche Ordner
in den Container eingebunden werden und welche ausgeschlossen bleiben. Dies
hilft, eine saubere und isolierte Entwicklungsumgebung zu schaffen.

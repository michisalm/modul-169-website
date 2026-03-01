#  Docker CLI

Hier sind einige einfache Übungen, bei denen verschiedene Docker CLI-Befehle
verwendet werden. Sie können den Terminal in Docker Desktop verwenden (unten auf
Terminal klicken), oder einen beliebigen anderen Terminal.

## Übung 1: Einfache Container-Erstellung und -Verwaltung

1. Ziel: Erstellen Sie einen neuen Container aus dem _hello-world_ Image.
   - **Befehl**: `docker run hello-world`
   - **Frage**: Was passiert, wenn Sie diesen Befehl ausführen?

<details>
  <summary>Lösung:</summary>

Der Befehl gibt eine Nachricht aus, die bestätigt, dass Docker erfolgreich
installiert ist und der Container korrekt ausgeführt wurde. Es zeigt auch
Informationen darüber, wie Docker funktioniert.

</details>

2. Ziel: Starten Sie einen neuen Container aus dem ubuntu Image und führen Sie
   einen Befehl aus, um die Version von Ubuntu anzuzeigen.
   - **Befehl**: `docker run -it ubuntu cat /etc/os-release`
   - **Frage**: Was zeigt der Befehl an?

<details>
  <summary>Lösung:</summary>

Der Befehl zeigt die Ubuntu-Version und andere relevante Informationen über das
Betriebssystem an.

</details>

## Übung 2: Container-Management

1. Ziel: Starten Sie einen Container aus dem _nginx_ Image und lassen Sie ihn im
   Hintergrund laufen.
   - **Befehl**: `docker run -d nginx`
   - **Frage**: Wie können Sie überprüfen, ob der Container läuft?

<details>
  <summary>Lösung:</summary>

Der Befehl gibt die Container-ID des gestarteten Nginx-Containers zurück.

</details>

2. Ziel: Listen Sie alle laufenden Container auf.
   - **Befehl**: `docker ps`
   - **Frage**: Was zeigt die Ausgabe an?

<details>
  <summary>Lösung:</summary>

Die Ausgabe zeigt eine Liste der laufenden Container, einschliesslich ihrer IDs,
Namen, Status und Ports.

</details>

3. Ziel: Stoppen Sie den laufenden Nginx-Container.
   - **Befehl**: `docker stop <container_id>`
   - **Hinweis**: Ersetzen Sie `<container_id>` durch die tatsächliche ID des
     Nginx-Containers.
   - **Frage**: Was passiert, wenn Sie den Container stoppen?

<details>
  <summary>Lösung:</summary>

Der Container wird gestoppt, und Sie erhalten eine Bestätigung in Form der
Container-ID. Wenn Sie docker ps erneut ausführen, wird der Container nicht mehr
angezeigt.

</details>

## Übung 3: Arbeiten mit Images

1. Ziel: Laden Sie das _alpine_ Image herunter.
   - **Befehl**: `docker pull alpine`
   - **Frage**: Wie können Sie überprüfen, ob das Image erfolgreich
     heruntergeladen wurde?

<details>
  <summary>Lösung:</summary>

Der Befehl zeigt den Fortschritt des Downloads an und bestätigt, dass das Image
erfolgreich heruntergeladen wurde.

</details>

2. Ziel: Listen Sie alle lokal gespeicherten Docker-Images auf.
   - **Befehl**: `docker images`
   - **Frage**: Was zeigt die Ausgabe an?

<details>
  <summary>Lösung:</summary>

Die Ausgabe zeigt eine Liste aller lokal gespeicherten Images, einschliesslich
ihrer Repositories, Tags und IDs.

</details>

3. Ziel: Entfernen Sie das _alpine_ Image.
   - **Befehl**: `docker rmi alpine`
   - **Frage**: Was passiert, wenn das Image von einem laufenden Container
     verwendet wird?

<details>
  <summary>Lösung:</summary>

Wenn das Image nicht von einem laufenden Container verwendet wird, wird es
erfolgreich entfernt. Andernfalls erhalten Sie eine Fehlermeldung, dass das
Image nicht entfernt werden kann, weil es in Verwendung ist.

</details>

## Übung 4: Protokolle und Volumes

1. Ziel: Starten Sie einen Container aus dem _nginx_ Image und zeigen Sie die
   Protokolle an.
   - **Befehl**: `docker run -d --name mynginx nginx`
   - **Befehl** für Protokolle: `docker logs mynginx`
   - **Frage**: Was können Sie in den Protokollen sehen?

<details>
  <summary>Lösung:</summary>

Die Protokolle zeigen die Startnachricht des Nginx-Servers und andere relevante
Informationen an.

</details>

2. Ziel: Erstellen Sie ein Volume und verwenden Sie es in einem neuen Container.
   - **Befehl**:

   ```bash
   docker volume create myvolume
   docker run -d -v myvolume:/data --name mydata-container ubuntu
   ```

   - **Frage**: Wie können Sie überprüfen, ob das Volumen erfolgreich erstellt
     und verwendet wurde?

<details>
  <summary>Lösung:</summary>

Der Befehl erstellt ein Volume namens _myvolume_ und startet einen Container,
der das Volume im Verzeichnis _/data_ einbindet. Sie können die Volumes mit
`docker volume ls` auflisten, um zu überprüfen, ob das Volume erfolgreich
erstellt wurde

</details>

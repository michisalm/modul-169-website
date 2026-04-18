# Praktische Anwendungen

Es gibt viele FOSS (Free and Open-Source-Software) Anwendungen, die bereits als
Container angeboten werden und sich gut für den Heimgebrauch eignen,
insbesondere wenn man ein sogenanntes Homelab betreibt (eigene Server zu Hause).
Dazu gehören Anwendungen, die ähnliche Funktionen wie _Office 365_ oder _Google
Drive_ bieten, mit denen (Office-)Dateien erstellt, gespeichert und geteilt
werden können, wie beispielsweise
[_Nextcloud_](https://docs.linuxserver.io/images/docker-nextcloud/#usage).
Darüber hinaus bieten diese Plattformen auch Chat-Funktionen und weiteres an.

Ein weiteres Beispiel ist
[_Bitwarden_](https://bitwarden.com/help/install-on-premise-manual/), ein
bekannter Passwortmanager, den man selbst hosten kann, sodass die Passwörter
niemals in der Cloud gespeichert werden. Zudem gibt es Anwendungen, die
Media-Streaming ermöglichen, wie
[_Jellyfin_](https://docs.linuxserver.io/images/docker-jellyfin/).

Es liessen sich noch viele weitere Beispiele anführen, doch das würde den Rahmen
sprengen.

Auf den folgenden Links werden bekanntere "dockerisierte" Applikationen
aufgelistet und verlinkt:

- https://fleet.linuxserver.io/
- https://www.bitdoze.com/docker-containers-home-server/

## Aufgabe

Durchsuchen Sie die Liste der beiden Webseiten und versuchen Sie, einige
Container auf Ihrem Rechner zum Laufen zu bringen. Einige Anwendungen bestehen
aus mehreren Containern. In solchen Fällen wird normalerweise eine Docker
Compose-Datei (`docker-compose.yml`) bereitgestellt. Sie können diese
Anwendungen ausprobieren, indem Sie die Datei `docker-compose.yml` in einem
separaten Ordner speichern, danach im Terminal zu diesem Ordner navigieren und
den Befehl docker compose up ausführen. Mit `Strg + C` können Sie die gestartete
Docker-Compose-Umgebung im Terminal wieder stoppen.

:::info

- Docker Compose werden wir **in der sechsten Woche** genauer betrachten.

:::

Falls Sie Port-Konflikte haben, müssen Sie entweder das Portmapping anpassen,
oder laufende Container stoppen.

Um ein wenig zu verstehen, was all die Parameter beim Befehl docker run oder in
der Datei docker-compose.yml bedeuten, empfehle ich, Google oder ChatGPT oder
ähnlich verwenden. Es ist im Moment in Ordnung, wenn Sie noch nicht alles
verstehen.

Falls Sie die Applikationen nach dem Testen nicht mehr weiterverwenden möchten,
empfiehlt es sich, sowohl die Container, Images und Volumes wieder zu löschen.
Dabei müssen Sie in dieser Reihenfolge vorgehen, da ein Image oder Volume eines
vorhandenen Containers nicht gelöscht werden kann.

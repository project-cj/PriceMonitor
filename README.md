Projekt System wspomagający monitorowanie cen w sklepach stacjonarnych
Autorzy: Karolina Czapla, Dawid Czarnecki, Jakub Dąbrowski

Potrzebne oprogramowanie (strona internetowa):
Node Package Manager - 9.6.7
lokalny serwer bazy danych - MySQL 8.2.0

Instrukcja uruchomienia aplikacji:
1. Uruchomić serwer MySQL i załadować bazę danych o nazwie "inz_db" z kodu umieszczonego w projekcie pod nazwą inz_db_kod.sql
2. Dostęp do bazy danych odbywa się poprzez użytkownika "root" bez hasła
3. W terminalu otworzyć folder server i zainstalować wszystkie potrzebne moduły przy użyciu komendy npm install
4. W terminalu otworzyć folder client i zainstalować wszystkie potrzebne moduły przy użyciu komendy npm install
5. Uruchomić aplikację serwerową w folderze server poleceniem npm start
6. Uruchomić aplikację serwerową w folderze client poleceniem npm start

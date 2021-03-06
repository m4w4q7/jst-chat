**FIGYELEM!** _A beadandót már bemutattam és már nem fejlesztem. Bár alapvetően törekedtem a rendre a kódban, nem ez volt az elsődleges cél, és a határidő közeledtével egyre inkább háttérbe szorult._


# JST-Chat [ ![Codeship Status for emartech/mediadb](https://codeship.com/projects/7c24f9b0-ead7-0132-6365-7ee58af40c21/status?branch=master)](https://codeship.com/projects/83245)

_Production: [http://jst-chat.herokuapp.com/](http://jst-chat.herokuapp.com/)_  

Beadandó feladat [JavaScript technológiák](http://webprogramozas.inf.elte.hu/jstech.html) kurzusra

##Indítás
1. npm install
2. npm run buildstart (vagy: gulp build; npm start;)

##Felhasznált technológiák
* Szerver:
 * io.js
 * ES6 (class, let, Promise, enhanced object literal, template string)
 * Express (body-parser, session, router, static, views)
 * Jade
 * Passport (local strategy)
 * socket.io
* Kliens:
 * Bootstrap
 * AngularJS
 * socket.io
 * jQuery
 * CryptoJS / SHA-256
 * ES6 (class, arrow functions)
 * modulok (Browserify)
* Egyéb:
 * VCS: git (repo: GitHub)
 * CI: Codeship
 * deploy: Heroku
 * CDN: cdnjs, MaxCDN, Google APIs
 * build system: gulp (Browserify, Babel, uglify)

##Eddig elkészült:
* szerver / fájlkiszolgálás
* nagyjából a felület
* regisztráció
 * a felhasználók adatai a szerver újraindítása esetén sem vesznek el
 * kliens oldalon SHA-256 titkosítás
 * hibakezelés (üres mező, jelszavak nem egyeznek, már létezik felhasználó a megadott névvel, egyéb szerver hiba)
* autentikáció
 * attól függ, hogy mit mutat a root, hogy be van-e lépve a felhasználó 
 * csak valid névvel és jelszóval lehet belépni
 * ki lehet lépni
 * bejelentkezett felhasználóknak megjelenik a neve a jobb felső sarokban
 * a munkamenetek szerver újraindítása esetén sem törlődnek
* kontaktok
 * a kontaktok bal oldalon listázódnak
 * lexikografikus rendezés szerint listázódnak
 * szűrhetőek
 * hibaüzenet, ha olyat próbálunk felvenni, aki nincs az adatbázisban
 * hibaüzenet, ha olyat próbálunk felvenni, aki már a kontaktjaink közt szerepel
 * hibaüzenet, ha saját magunkat akarjuk felvenni
 * egyébként az új kontakt azonnal felkerül a kontaktlistára minden olyan kliensnél, aki az adott felhasználóval volt belépve
 * szerver újraindítása esetén is megmaradnak 
* üzenetek
 * kontaktra klikkelve megjelenek az eddigi üzenetek
 * lehet újat küldeni
 * minden kliens, aki a küldővel vagy a fogadóval van belépve, azonnal megkapja az üzenetet
 * az üzenetek a szerver újraindítása esetén is megmaradnak

# JST-Chat [ ![Codeship Status for emartech/mediadb](https://codeship.com/projects/7c24f9b0-ead7-0132-6365-7ee58af40c21/status?branch=master)](https://codeship.com/projects/83245)

_Production: [http://jst-chat.herokuapp.com/](http://jst-chat.herokuapp.com/)_  

Beadandó feladat [JavaScript technológiák](http://webprogramozas.inf.elte.hu/jstech.html) kurzusra

##Felhasznált technológiák
* Szerver:
 * io.js
 * ES6 (class, let, Promise)
 * Express  
* Kliens:
 * Bootstrap
 * jQuery
 * CryptoJS / SHA-256
* Egyéb:
 * VCS: git (repo: GitHub)
 * CI: Codeship
 * deploy: Heroku
 * CDN: cdnjs, MaxCDN, Google APIs

##Eddig elkészült:
* szerver / statikus fájlkiszolgálás
* nagyjából a felület
* regisztráció
 * szerver oldal adatbázisba perzisztál
 * kliens oldalon SHA-256 titkosítás
 * hibakezelés (kitöltetlen mező, jelszavak nem egyeznek, már létezik felhasználó a megadott névvel, egyéb szerver hiba)


Még sok dolog van hátra...

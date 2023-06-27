Binome:
	HADDADI Mazigh, Grp3
	OTMANE CHERIF Mohammed Islem, Grp3


Etapes pour faire tourner l'application:
	Tout d'abord, assurez-vous d'avoir installé Node et npm sur votre machine.
	Il suffit ensuite d’installer les modules (express, mustache-express, better-sqlite3, alert, cookie-session) avec la commande npm install …
Par exemple : npm install better-sqlite3
npm install cookie-session
npm install alert ….

Après, exécutez la commande : node create-db.js
Et finalement lancez le serveur (node server.js)
L’application sera (Si tout s’est bien installé) à l’URL : http://localhost:3000



Si ça ne marche toujours pas, essayez de supprimer le dossier node_modules, le fichier package-lock.json ainsi que la base de données et de réinstaller les modules mentionnés précédemment.

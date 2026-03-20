                     # API Blog Backend - INF222 EC1

  API backend pour gérer un blog simple (articles, auteurs, catégories, tags) développée avec Node.js et MySQL.

                     ## Installation

                 Cloner le dépôt :
   git clone <https://github.com/Arthur976360/Backend-API-pour-le-TP-INF222>

              Configurer MySQL :
   - Créer la base de données "blogDB"
   - Créer la table "articles" :

     CREATE DATABASE blogDB;
     USE blogDB;

     CREATE TABLE articles (
         id INT AUTO_INCREMENT PRIMARY KEY,
         titre VARCHAR(255),
         contenu TEXT,
         auteur VARCHAR(100),
         categorie VARCHAR(100),
         tags VARCHAR(255),
         date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );

          Lancer le serveur:
   node index.js

      ### Endpoints

       Créer un article:

POST /api/articles  
Body (JSON) :
{
  "titre": "Titre de l'article",
  "contenu": "Contenu de l'article",
  "auteur": "Nom",
  "categorie": "Tech",
  "tags": "exemple,backend"
}

    Lire tous les articles:
GET /api/articles

     Lire un article unique:
GET /api/articles/{id}

     Modifier un article:
PUT /api/articles/{id}  
Body (JSON) avec les champs à modifier

    Supprimer un article:
DELETE /api/articles/{id}

     Rechercher un article:
GET /api/articles/search?query=texte

    Exemple avec POSTMAN:

-   POST: http://localhost:3000/api/articles avec body JSON
-  GET: http://localhost:3000/api/articles

   #### Bonnes pratiques et codes HTTP 
 - 200 : OK
- 201 : Création réussie
- 400 : Requête mal formée
- 404 : Article non trouvé
- 500 : Erreur serveur

##### Technologies utilisées

- Node.js + Express
- MySQL
- Postman (tests API)

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
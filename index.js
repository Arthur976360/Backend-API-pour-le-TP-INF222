const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// Connexion MySQL 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin1234", 
    database: "blogDB"
});

db.connect(err => {
    if (err) {
        console.log("Erreur MySQL:", err);
    } else {
        console.log("MySQL connecté !");
    }
});

// Route racine 
app.get("/", (req, res) => {
    res.send("API backend OK");
});

// Créer un article 
app.post("/api/articles", (req, res) => {
    const { titre, contenu, auteur, categorie, tags } = req.body;

    if (!titre || !auteur) {
        return res.status(400).json({ message: "Titre et auteur obligatoires" });
    }

    const sql = "INSERT INTO articles (titre, contenu, auteur, categorie, tags) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [titre, contenu, auteur, categorie, tags], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Article créé", id: result.insertId });
    });
});

//  Récupérer tous les articles 
app.get("/api/articles", (req, res) => {
    const sql = "SELECT * FROM articles";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(results);
    });
});

//  Récupérer un article par ID
app.get("/api/articles/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM articles WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: "Article non trouvé" });
        res.status(200).json(results[0]);
    });
});

//  Modifier un article 
app.put("/api/articles/:id", (req, res) => {
    const { id } = req.params;
    const { titre, contenu, auteur, categorie, tags } = req.body;

    const sql = "UPDATE articles SET titre=?, contenu=?, auteur=?, categorie=?, tags=? WHERE id=?";
    db.query(sql, [titre, contenu, auteur, categorie, tags, id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Article non trouvé" });
        res.status(200).json({ message: "Article modifié" });
    });
});

//  Supprimer un article 
app.delete("/api/articles/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM articles WHERE id=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Article non trouvé" });
        res.status(200).json({ message: "Article supprimé" });
    });
});

// Lancer le serveur 
app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});
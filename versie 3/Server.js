const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// CORS toestaan (handig als je later met fetch() werkt)
app.use(cors());

// Static files (HTML, CSS, JS)
app.use(express.static('public'));

// 🔌 MySQL-verbinding
const db = mysql.createConnection({
  host: 'localhost',     // of je serveradres
  user: 'root',          // jouw MySQL-gebruiker
  password: '',          // jouw wachtwoord
  database: 'star_wars_db'  // jouw database
});

// Verbinden met de database
db.connect((err) => {
  if (err) {
    console.error('Fout bij verbinden met database:', err);
  } else {
    console.log('Verbonden met de database star_wars_db');
  }
});

// API endpoint om alle quotes op te halen
app.get('/api/quotes', (req, res) => {
   const sql = 'SELECT quote_id, Quote, Personage, Film, Datum FROM quotes';
   db.query(sql, (err, results) => {
    if (err) {
      console.error('Fout bij ophalen quotes:', err);
      res.status(500).json({ error: 'Databasefout' });
    } else {
      res.json(results);
    }
  });
});

// Frontend-pagina’s
app.get('/Burger', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Burger.html'));
});

app.get('/Ambtenaar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Ambtenaar.html'));
});

app.get('/', (req, res) => {
  res.send('<h1>Welkom! <a href="/Burger">Burger</a> | <a href="/Ambtenaar">Ambtenaar</a></h1>');
});

// Server starten
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
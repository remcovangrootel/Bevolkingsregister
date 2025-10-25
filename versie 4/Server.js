const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

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

// Select: Haal alle quotes op
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

// POST: Nieuwe quote toevoegen
app.post('/api/quotes', (req, res) => {
  const { Quote, Personage, Film, Datum } = req.body;

  if (!Quote || !Personage || !Film || !Datum) {
    return res.status(400).json({ error: 'Vul alle velden in.' });
  }

  const sql = 'INSERT INTO quotes (Quote, Personage, Film, Datum) VALUES (?, ?, ?, ?)';
  db.query(sql, [Quote, Personage, Film, Datum], (err, result) => {
    if (err) {
      console.error('Fout bij toevoegen quote:', err);
      res.status(500).json({ error: 'Kon quote niet toevoegen' });
    } else {
      console.log('Nieuwe quote toegevoegd:', Quote);
      res.json({ success: true, id: result.insertId });
    }
  });
});

// PUT: bestaande quote bewerken
app.put('/api/quotes/:id', (req, res) => {
  const { id } = req.params;
  const { Quote, Personage, Film, Datum } = req.body;

  if (!Quote || !Personage || !Film || !Datum) {
    return res.status(400).json({ error: 'Vul alle velden in.' });
  }

  const sql = 'UPDATE quotes SET Quote = ?, Personage = ?, Film = ?, Datum = ? WHERE quote_id = ?';
  db.query(sql, [Quote, Personage, Film, Datum, id], (err, result) => {
    if (err) {
      console.error('Fout bij updaten quote:', err);
      res.status(500).json({ error: 'Kon quote niet updaten' });
    } else {
      res.json({ success: true });
    }
  });
});

// DELETE: quote verwijderen
app.delete('/api/quotes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM quotes WHERE quote_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Fout bij verwijderen quote:', err);
      res.status(500).json({ error: 'Kon quote niet verwijderen' });
    } else {
      res.json({ success: true });
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
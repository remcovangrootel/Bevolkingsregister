const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/Burger', (req, res) => {
  res.sendFile(__dirname + '/public/Burger.html');
});

app.get('/Ambtenaar', (req, res) => {
  res.sendFile(__dirname + '/public/Ambtenaar.html');
});

app.get('/', (req, res) => {
  res.send('<h1>Welkom! Kies een pagina: <a href="/Burger">Burger</a> | <a href="/Ambtenaar">Ambtenaar</a></h1>');
});

app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
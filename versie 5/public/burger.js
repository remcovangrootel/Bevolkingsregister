let allQuotes = [];

const input = document.getElementById('searchInput');
const list = document.getElementById('quotes');

// Quotes ophalen van de server
function loadQuotes() {
  fetch('/api/quotes')
    .then(res => res.json())
    .then(data => {
      allQuotes = data;
      displayQuotes(allQuotes);
    })
    .catch(err => console.error('Fout bij ophalen quotes:', err));
}

// Quotes tonen in de lijst
function displayQuotes(quotes) {
  list.innerHTML = '';
  quotes.forEach(q => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${q.Personage}</strong> uit <em>${q.Film}</em>: "${q.Quote}" <br><small>${q.Datum}</small>`;
    list.appendChild(li);
  });
}

// Zoeken/filteren
input.addEventListener('input', () => {
  const searchTerm = input.value.toLowerCase();
  const filtered = allQuotes.filter(q => 
    q.Personage.toLowerCase().includes(searchTerm) ||
    q.Film.toLowerCase().includes(searchTerm) ||
    q.Quote.toLowerCase().includes(searchTerm)
  );
  displayQuotes(filtered);
});

// Laden
loadQuotes();
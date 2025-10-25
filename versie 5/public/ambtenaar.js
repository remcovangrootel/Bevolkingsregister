const form = document.getElementById('quoteForm');
    const list = document.getElementById('quotes');

    function loadQuotes() {
      fetch('/api/quotes')
        .then(res => res.json())
        .then(data => {
          list.innerHTML = '';
          data.forEach(q => {
            const li = document.createElement('li');
            li.innerHTML = `
              <strong>${q.Personage}</strong> uit <em>${q.Film}</em>:<br>
              "${q.Quote}" <br>
              <small>${q.Datum}</small><br>
              <button onclick='editQuote(${q.quote_id}, "${q.Quote}", "${q.Personage}", "${q.Film}", "${q.Datum}")'>Bewerken</button>
              <button onclick='deleteQuote(${q.quote_id})'>Verwijderen</button>
            `;
            list.appendChild(li);
          });
        });
    }

    // Nieuwe quote toevoegen
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          form.reset();
          loadQuotes();
        } else {
          alert('❌ Fout: ' + (result.error || 'Onbekend probleem'));
        }
      });
    });

    // Quote verwijderen
    function deleteQuote(id) {
      if (!confirm('Weet je zeker dat je deze quote wilt verwijderen?')) return;
      fetch('/api/quotes/' + id, { method: 'DELETE' })
        .then(res => res.json())
        .then(result => {
          if (result.success) loadQuotes();
        });
    }

    // Quote bewerken
    function editQuote(id, quote, personage, film, datum) {
      const newQuote = prompt('Nieuwe quote:', quote);
      const newPersonage = prompt('Nieuwe personage:', personage);
      const newFilm = prompt('Nieuwe film:', film);
      const newDatum = prompt('Nieuwe datum (YYYY-MM-DD):', datum);

      if (!newQuote || !newPersonage || !newFilm || !newDatum) return alert('Alle velden zijn verplicht');

      fetch('/api/quotes/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Quote: newQuote,
          Personage: newPersonage,
          Film: newFilm,
          Datum: newDatum
        })
      })
      .then(res => res.json())
      .then(result => {
        if (result.success) loadQuotes();
      });
    }

    loadQuotes();
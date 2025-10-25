    fetch('/api/quotes')
      .then(res => res.json())
      .then(data => {
        const list = document.getElementById('quotes');
        data.forEach(q => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${q.Personage}</strong> uit <em>${q.Film}</em>:<br>"${q.Quote}"<br><small>(${q.Datum})</small>`;
          list.appendChild(li);
        });
      })
      .catch(err => console.error('Fout bij ophalen van quotes:', err));
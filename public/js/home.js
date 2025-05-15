fetch('/api/monsters')
  .then(res => res.json())
  .then(monsters => {
    const randomIndex = Math.floor(Math.random() * monsters.length);
    const motd = monsters[randomIndex];

    const motdCard = document.getElementById("motd-card");
    motdCard.innerHTML = `
      <h3>${motd.name}</h3>
      <p><strong>Type:</strong> ${motd.type}</p>
      <p><strong>Description:</strong> ${motd.description || 'No description available.'}</p>
    `;
  })
  .catch(err => {
    console.error("Failed to fetch Monster of the Day", err);
    document.getElementById("motd-card").textContent = "Failed to load Monster of the Day.";
  });

  const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  window.addEventListener('DOMContentLoaded', () => {
  fetch('/quotes.json')
    .then(res => res.json())
    .then(data => {
      const random = data[Math.floor(Math.random() * data.length)];
      document.getElementById('quote-box').textContent = `${random.character}: "${random.quote}"`;
    })
    .catch(err => {
      console.error('Failed to load quotes:', err);
      document.getElementById('quote-box').textContent = 'Could not load quote.';
    });
});
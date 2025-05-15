fetch("https://mhw-db.com/monsters")
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
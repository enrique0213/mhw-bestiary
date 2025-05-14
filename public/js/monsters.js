document.addEventListener("DOMContentLoaded", () => {
  const monsterList = document.getElementById("monster-list");
  const searchInput = document.getElementById("monster-search");
  const chartCanvas = document.getElementById("monster-chart");

  let allMonsters = [];
  let monsterChart = null;

  // Render visible monster cards
  function renderMonsters(monsters) {
    monsterList.innerHTML = "";

    if (monsters.length === 0) {
      monsterList.innerHTML = "<p>No monsters found.</p>";
      return;
    }

    monsters.forEach((monster) => {
      const card = document.createElement("div");
      card.className = "monster-card";
      card.innerHTML = `
        <h3>${monster.name}</h3>
        <p><strong>Type:</strong> ${monster.type}</p>
        <p><strong>Description:</strong> ${monster.description || "N/A"}</p>
      `;
      monsterList.appendChild(card);
    });
  }

  // Filter the list based on search input
  function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    const filtered = allMonsters.filter((m) =>
      m.name.toLowerCase().includes(query)
    );
    renderMonsters(filtered);
  }

  // Generate Chart.js bar chart based on monster types
  function generateChart(monsters) {
  const locationCounts = {};

  monsters.forEach((monster) => {
    if (Array.isArray(monster.locations)) {
      monster.locations.forEach((loc) => {
        const name = loc.name || "Unknown";
        locationCounts[name] = (locationCounts[name] || 0) + 1;
      });
    }
  });

  const labels = Object.keys(locationCounts);
  const data = Object.values(locationCounts);

  const ctx = chartCanvas.getContext("2d");

  if (monsterChart) {
    monsterChart.destroy();
  }

  monsterChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Number of Monsters by Location",
          data: data,
          backgroundColor: "rgba(255, 159, 64, 0.6)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.parsed.y} monster(s)`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
        x: {
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45,
          },
        },
      },
    },
  });
}


  // Fetch monsters from the API and initialize page
  if (monsterList) {
    fetch("https://mhw-db.com/monsters")
      .then((res) => res.json())
      .then((monsters) => {
        allMonsters = monsters;
        renderMonsters(allMonsters);
        generateChart(allMonsters);
      })
      .catch((err) => {
        console.error("Error fetching monsters:", err);
        monsterList.innerHTML = "<p>Failed to load monsters.</p>";
      });

    if (searchInput) {
      searchInput.addEventListener("input", handleSearch);
    }
  }
});

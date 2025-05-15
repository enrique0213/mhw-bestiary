document.addEventListener("DOMContentLoaded", () => {
  const monsterList = document.getElementById("monster-list");
  const searchInput = document.getElementById("monster-search");
  const typeFilter = document.getElementById("type-filter");
  const chartCanvas = document.getElementById("monster-chart");

  let allMonsters = [];
  let monsterChart = null;

  function renderMonsters(monsters) {
    monsterList.innerHTML = "";

    if (monsters.length === 0) {
      monsterList.innerHTML = "<p>No monsters found.</p>";
      return;
    }

    monsters.forEach((monster) => {
      const weaknessesHtml =
        monster.weaknesses && monster.weaknesses.length > 0
          ? `<ul class="weakness-list">
              ${monster.weaknesses
                .map(
                  (w) => `
                <li>
                  <strong>${w.element.charAt(0).toUpperCase() + w.element.slice(1)}</strong>: ${w.stars} star${w.stars > 1 ? "s" : ""}
                  ${w.condition ? ` (${w.condition})` : ""}
                </li>
              `
                )
                .join("")}
            </ul>`
          : "<p>No weaknesses listed.</p>";

      const card = document.createElement("div");
      card.className = "monster-card";
      card.innerHTML = `
        <h3>${monster.name}</h3>
        <p><strong>Type:</strong> ${monster.type}</p>
        <p><strong>Description:</strong> ${monster.description || "N/A"}</p>
        <div class="weakness-container"><strong>Weaknesses:</strong> ${weaknessesHtml}</div>
      `;

      monsterList.appendChild(card);
    });
  }

  function filterMonsters() {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedWeakness = typeFilter.value;

    const filtered = allMonsters.filter((monster) => {
      const matchesSearch = monster.name.toLowerCase().includes(searchQuery);
      if (selectedWeakness === "all") return matchesSearch;

      const hasWeakness =
        monster.weaknesses &&
        monster.weaknesses.some((w) => w.element === selectedWeakness);

      return matchesSearch && hasWeakness;
    });

    renderMonsters(filtered);
  }

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
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.parsed.y} monster(s)`,
            },
          },
        },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } },
          x: {
            ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 },
          },
        },
      },
    });
  }

  fetch('/api/monsters')
    .then((res) => res.json())
    .then((monsters) => {
      allMonsters = monsters;
      renderMonsters(allMonsters);
      generateChart(allMonsters);

      // Build weakness filter dropdown
      const weaknessSet = new Set();

      monsters.forEach((monster) => {
        if (monster.weaknesses && monster.weaknesses.length > 0) {
          monster.weaknesses.forEach((w) => {
            weaknessSet.add(w.element);
          });
        }
      });

      // Clear existing options and add "all"
      typeFilter.innerHTML = `<option value="all">All Weaknesses</option>`;

      weaknessSet.forEach((element) => {
        const option = document.createElement("option");
        option.value = element;
        option.textContent = element.charAt(0).toUpperCase() + element.slice(1);
        typeFilter.appendChild(option);
      });
    })
    .catch((err) => {
      console.error("Error fetching monsters:", err);
      monsterList.innerHTML = "<p>Failed to load monsters.</p>";
    });

  if (searchInput) searchInput.addEventListener("input", filterMonsters);
  if (typeFilter) typeFilter.addEventListener("change", filterMonsters);
});

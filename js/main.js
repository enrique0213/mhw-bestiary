// Import Supabase
const { createClient } = supabase;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// DOM Elements
const monsterContainer = document.getElementById("monster-container");
const searchInput = document.getElementById("search");
const chartCanvas = document.getElementById("location-chart").getContext("2d");

// Global
let allMonsters = [];
let chartInstance = null;

// Fetch Monster Data
async function fetchMonsters() {
  const res = await fetch("https://mhw-db.com/monsters");
  const data = await res.json();
  allMonsters = data;
  renderMonsters(data);
  renderChart(data);
}

// Render Monsters
async function renderMonsters(monsters) {
  const favorites = await getFavorites();
  monsterContainer.innerHTML = "";

  monsters.forEach(monster => {
    const isFavorite = favorites.includes(monster.id);
    const card = document.createElement("div");
    card.classList.add("monster-card");

    card.innerHTML = `
      <h3>${monster.name}</h3>
      <p><strong>Type:</strong> ${monster.type}</p>
      <p><strong>Locations:</strong> ${monster.locations?.map(loc => loc.name).join(", ") || "Unknown"}</p>
      <button onclick="toggleFavorite(${monster.id})">
        ${isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
      </button>
    `;

    monsterContainer.appendChild(card);
  });
}

// Search Filter
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allMonsters.filter(m =>
    m.name.toLowerCase().includes(query)
  );
  renderMonsters(filtered);
  renderChart(filtered);
});

// Chart.js - Monsters by Location
function renderChart(monsters) {
  const locationCounts = {};

  monsters.forEach(monster => {
    monster.locations?.forEach(loc => {
      const name = loc.name;
      locationCounts[name] = (locationCounts[name] || 0) + 1;
    });
  });

  const labels = Object.keys(locationCounts);
  const data = Object.values(locationCounts);

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Number of Monsters",
        data,
        backgroundColor: "rgba(255, 99, 132, 0.6)"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { title: { display: true, text: "Location" }},
        y: { title: { display: true, text: "Monsters" }, beginAtZero: true }
      }
    }
  });
}

// Supabase Favorites
async function getFavorites() {
  const { data, error } = await supabaseClient
    .from("favorites")
    .select("monster_id");

  if (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }

  return data.map(f => f.monster_id);
}

async function toggleFavorite(monsterId) {
  const { data: existing, error: fetchError } = await supabaseClient
    .from("favorites")
    .select("*")
    .eq("monster_id", monsterId)
    .maybeSingle();

  if (fetchError) {
    console.error("Fetch error:", fetchError);
    return;
  }

  if (existing) {
    // Remove favorite
    const { error: deleteError } = await supabaseClient
      .from("favorites")
      .delete()
      .eq("monster_id", monsterId);
    if (deleteError) console.error("Delete error:", deleteError);
  } else {
    // Add favorite
    const { error: insertError } = await supabaseClient
      .from("favorites")
      .insert([{ monster_id: monsterId, user_id: "demo-user" }]); // Hardcoded user_id for class demo
    if (insertError) console.error("Insert error:", insertError);
  }

  renderMonsters(allMonsters);
}

// Load everything
windows.onload.fetchMonsters();

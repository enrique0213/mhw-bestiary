// index.js
require('dotenv').config();

const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json()); // Parse JSON bodies

// GET monsters API
app.get('/api/monsters', async (req, res) => {
  try {
    const { data, error } = await supabase.from('monsters').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new monster API
app.post('/api/monsters', async (req, res) => {
  const { name, type, description } = req.body; // destructure expected fields
  const newMonster = { name, type, description };

  try {
    const { data, error } = await supabase.from('monsters').insert([newMonster]);
    console.log('Supabase insert data:', data);
    console.log('Supabase insert error:', error);

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json({ message: 'Monster added!', monster: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all to serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');

const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// API route must be before the wildcard route
app.get('/api/monsters', async (req, res) => {
  try {
    const { data, error } = await supabase.from('monsters').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve index.html for client-side routing (like SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

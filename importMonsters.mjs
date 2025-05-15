import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your keys
const supabaseUrl = 'https://rmhrwqogoslqwjerfktw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtaHJ3cW9nb3NscXdqZXJma3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMDI5ODUsImV4cCI6MjA2Mjc3ODk4NX0.Zp5_10v-SdExL9BuorH8hWw-SlkvAanp2eh4UPRokZc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function importMonsters() {
  try {
    // Fetch from public API
    const response = await fetch('https://mhw-db.com/monsters');
    const monsters = await response.json();

    // Insert monsters into Supabase (adjust keys if needed)
    for (const monster of monsters) {
      const { data, error } = await supabase.from('monsters').insert([monster]);
      if (error) {
        console.error('Error inserting monster:', monster.name, error);
      } else {
        console.log('Inserted monster:', monster.name);
      }
    }
    console.log('Finished importing monsters!');
  } catch (err) {
    console.error('Error fetching monsters:', err);
  }
}

importMonsters();

// public/login.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://lvobywbpmssawuukzskm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2b2J5d2JwbXNzYXd1dWt6c2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMTc4MDAsImV4cCI6MjA2NjY5MzgwMH0.Uk4RXPnrQq5wagaBzfPGH3Tf5qexktRIbHs0ovfXWxE'
);

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert('Login gagal: ' + error.message);
  } else {
    window.location.href = 'admin.html';
  }
});

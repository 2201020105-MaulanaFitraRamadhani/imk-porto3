// public/input.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://lvobywbpmssawuukzskm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2b2J5d2JwbXNzYXd1dWt6c2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMTc4MDAsImV4cCI6MjA2NjY5MzgwMH0.Uk4RXPnrQq5wagaBzfPGH3Tf5qexktRIbHs0ovfXWxE'
);

const articleForm = document.getElementById('article-form');
const logoutBtn = document.getElementById('logout');

async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = 'login.html';
  }
}

checkAuth();

articleForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const image_url = document.getElementById('image_url').value;

  const { error } = await supabase.from('articles').insert([{ title, content, image_url }]);
  if (error) {
    alert('Gagal menambahkan artikel: ' + error.message);
  } else {
    alert('Artikel berhasil ditambahkan!');
    articleForm.reset();
  }
});

logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
});

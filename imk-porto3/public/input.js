// public/input.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://your-project-id.supabase.co',
  'your-anon-key'
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

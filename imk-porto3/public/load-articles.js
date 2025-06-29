// js/load-articles.js
import { supabase } from './supabase-client.js';

async function fetchArticles() {
  const { data, error } = await supabase
    .from('articles') // ganti sesuai nama tabel kamu
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Gagal mengambil artikel:', error.message);
    return;
  }

  const container = document.getElementById('article-list');
  container.innerHTML = ''; // clear sebelum render

  if (data.length === 0) {
    container.innerHTML = '<p>Tidak ada artikel untuk ditampilkan.</p>';
    return;
  }

  data.forEach(article => {
    const card = document.createElement('div');
    card.className = 'article-card';

    card.innerHTML = `
      ${article.image_url ? `<img src="${article.image_url}" alt="${article.title}">` : ''}
      <h3>${article.title}</h3>
      <p>${article.content}</p>
    `;

    container.appendChild(card);
  });
}

fetchArticles();

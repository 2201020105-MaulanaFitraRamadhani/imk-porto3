import { supabase } from './supabase-client.js';

// === PROFILE SECTION ===
const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(profileForm);
  const profileData = {
    id: 1, // diasumsikan hanya satu profil
    photo_url: formData.get('photo_url'),
    biodata: formData.get('biodata'),
    skills: formData.get('skills').split(',').map(s => s.trim()),
    experience: formData.get('experience'),
    organization: formData.get('organization'),
    activity: formData.get('activity'),
    education: formData.get('education').split(',').map(e => e.trim()),
    projects: formData.get('projects').split(',').map(p => p.trim()),
  };

  // Pakai upsert yang valid TANPA on_conflict di URL
  const { error } = await supabase
    .from('profile_data')
    .upsert(profileData); // onConflict diatur otomatis oleh Supabase melalui primary key

  if (error) {
    console.error('Gagal menyimpan profil:', error);
    alert('❌ Gagal menyimpan profil. Silakan periksa console.');
  } else {
    alert('✅ Profil berhasil disimpan');
  }
});

// === ARTICLE SECTION ===
const articleList = document.getElementById('article-list');
const editArticleForm = document.getElementById('edit-article-form');

async function loadArticles() {
  const { data, error } = await supabase.from('articles').select('*');
  if (data) {
    articleList.innerHTML = data.map(article => `
      <div>
        <h4>${article.title}</h4>
        <button onclick="fillArticleForm('${article.id}', \`${article.title}\`, \`${article.content}\`, '${article.image_url}')">Edit</button>
      </div>
    `).join('');
  } else {
    console.error('Gagal memuat artikel:', error);
  }
}

window.fillArticleForm = (id, title, content, image_url) => {
  editArticleForm.id.value = id;
  editArticleForm.title.value = title;
  editArticleForm.content.value = content;
  editArticleForm.image_url.value = image_url;
};

editArticleForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(editArticleForm);
  const { id, title, content, image_url } = Object.fromEntries(formData);

  const { error } = await supabase.from('articles').update({
    title,
    content,
    image_url,
  }).eq('id', id);

  if (error) alert('Gagal mengupdate artikel');
  else {
    alert('Artikel diperbarui');
    loadArticles();
  }
});

// === CONTACTS SECTION ===
async function loadContacts() {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (data) {
    const tbody = document.querySelector('#contact-table tbody');
    tbody.innerHTML = data.map(c => `
      <tr>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.message}</td>
        <td>${new Date(c.created_at).toLocaleString()}</td>
      </tr>
    `).join('');
  } else {
    console.error('Gagal memuat kontak:', error);
  }
}

// Inisialisasi saat halaman dimuat
loadArticles();
loadContacts();

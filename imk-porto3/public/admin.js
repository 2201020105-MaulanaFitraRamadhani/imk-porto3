// ./admin.js
import { supabase } from './supabase-client.js';

// === Simpan Profil ===
const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const biodata = document.getElementById('biodata').value;
  const skills = document.getElementById('skills').value.split(',').map(s => s.trim());
  const experience = document.getElementById('experience').value;
  const organization = document.getElementById('organization').value;
  const activity = document.getElementById('activity').value;
  const education = document.getElementById('education').value.split(',').map(e => e.trim());
  const projects = document.getElementById('projects').value.split(',').map(p => p.trim());

  // Upload image jika ada
  const photoInput = document.getElementById('profilePhoto');
  let photoUrl = '';
  if (photoInput.files.length > 0) {
    const file = photoInput.files[0];
    const { data, error } = await supabase.storage.from('profile_data').upload(`foto_${Date.now()}`, file, {
      cacheControl: '3600',
      upsert: false
    });
    if (!error) {
      const { data: publicUrl } = supabase.storage.from('profile_data').getPublicUrl(data.path);
      photoUrl = publicUrl.publicUrl;
    }
  }

  const { error } = await supabase.from('profile_data').upsert({
    id: 1, // asumsi hanya satu data profil
    photo_url: photoUrl,
    biodata,
    skills,
    experience,
    organization,
    activity,
    education,
    projects
  });

  if (error) alert('Gagal menyimpan profil');
  else alert('Profil berhasil disimpan');
});

// === Tambah Artikel ===
document.getElementById('article-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('articleTitle').value;
  const image = document.getElementById('articleImage').value;
  const content = document.getElementById('articleContent').value;

  const { error } = await supabase.from('articles').insert({
    title,
    image_url: image,
    content,
    created_at: new Date().toISOString()
  });

  if (error) alert('Gagal menambahkan artikel');
  else {
    alert('Artikel berhasil ditambahkan');
    e.target.reset();
  }
});

// === Tampilkan Data dari Tabel Kontak ===
// Tampilkan kontak dari tabel 'contacts'
async function loadContacts() {
  const { data: contacts, error } = await supabase
    .from('contacts')
    .select('*');

  if (error) {
    console.error('Gagal mengambil kontak:', error);
    return;
  }

  const tableBody = document.getElementById('contact-table-body');
  tableBody.innerHTML = '';

  contacts.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>${item.message}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Pastikan dipanggil saat berada di halaman admin
if (window.location.pathname.includes('admin.html')) {
  loadContacts();
}


loadContacts();

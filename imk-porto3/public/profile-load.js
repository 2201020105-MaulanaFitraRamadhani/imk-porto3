// profile-load.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Ganti dengan URL dan anon key Supabase kamu
const supabase = createClient('https://lvobywbpmssawuukzskm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');

export async function loadProfileData() {
  const { data, error } = await supabase.from('profile').select('*').single();
  if (error || !data) return console.error('Gagal mengambil data profil:', error);

  document.getElementById('profile-img').src = data.photo_url || 'https://via.placeholder.com/150';
  document.getElementById('bio-text').innerText = data.bio || '';

  const listIds = {
    'skill-list': data.skills,
    'education-list': data.education,
    'project-list': data.project,
  };

  for (const [id, items] of Object.entries(listIds)) {
    const ul = document.getElementById(id);
    ul.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
  }

  const sectionData = [
    { id: 'experience-timeline', data: data.experience },
    { id: 'organization-timeline', data: data.organization },
    { id: 'activity-timeline', data: data.activity }
  ];

  sectionData.forEach(({ id, data }) => {
    const container = document.getElementById(id);
    container.innerHTML = '';
    data.forEach(item => {
      container.innerHTML += `<div class="timeline-item"><h4>${item.title}</h4><p>${item.desc}</p></div>`;
    });
  });
}

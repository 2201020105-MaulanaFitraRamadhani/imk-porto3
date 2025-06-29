import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://lvobywbpmssawuukzskm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2b2J5d2JwbXNzYXd1dWt6c2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMTc4MDAsImV4cCI6MjA2NjY5MzgwMH0.Uk4RXPnrQq5wagaBzfPGH3Tf5qexktRIbHs0ovfXWxE'
);

export async function loadProfileData() {
  const { data, error } = await supabase.from('profile_data').select('*').limit(1).single();

  if (error) {
    console.error('Gagal memuat data profil:', error.message);
    return;
  }

  // Update foto dan biodata
  document.getElementById('profile-img').src = data.photo_url || 'https://via.placeholder.com/150';
  document.getElementById('bio-text').textContent = data.biodata || '';

  // Update skill list
  const skillList = document.getElementById('skill-list');
  skillList.innerHTML = '';
  data.skills?.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    skillList.appendChild(li);
  });

  // Update experience
  document.getElementById('experience-timeline').innerHTML = data.experience || '';

  // Update organization
  document.getElementById('organization-timeline').innerHTML = data.organization || '';

  // Update activity
  document.getElementById('activity-timeline').innerHTML = data.activity || '';

  // Update education
  const educationList = document.getElementById('education-list');
  educationList.innerHTML = '';
  data.education?.forEach(edu => {
    const li = document.createElement('li');
    li.textContent = edu;
    educationList.appendChild(li);
  });

  // Update projects
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = '';
  data.projects?.forEach(proj => {
    const li = document.createElement('li');
    li.textContent = proj;
    projectList.appendChild(li);
  });
}

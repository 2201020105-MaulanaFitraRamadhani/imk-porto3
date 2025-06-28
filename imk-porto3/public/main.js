// public/main.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://your-project-id.supabase.co', // Ganti dengan project URL kamu
  'your-anon-key' // Ganti dengan anon key Supabase kamu
);

const skillsEl = document.getElementById('skills');
const experienceEl = document.getElementById('experience');
const organizationEl = document.getElementById('organization');
const activityEl = document.getElementById('activity');
const educationEl = document.getElementById('education');
const projectsEl = document.getElementById('projects');
const articlesContainer = document.getElementById('articles-container');
const serviceFeeEl = document.getElementById('service-fee');
const socialMediaEl = document.getElementById('social-media');

async function loadPortfolio() {
  const { data: bio } = await supabase.from('profile').select('*').single();
  if (!bio) return;

  bio.skills?.forEach(s => skillsEl.innerHTML += `<li>${s}</li>`);
  bio.experience?.forEach(e => experienceEl.innerHTML += `<li>${e}</li>`);
  bio.organization?.forEach(o => organizationEl.innerHTML += `<li>${o}</li>`);
  bio.activity?.forEach(a => activityEl.innerHTML += `<li>${a}</li>`);
  bio.education?.forEach(e => educationEl.innerHTML += `<li>${e}</li>`);
  bio.projects?.forEach(p => projectsEl.innerHTML += `<li>${p}</li>`);
  bio.social?.forEach(s => socialMediaEl.innerHTML += `<li><a href="${s.link}" target="_blank">${s.platform}</a></li>`);
  serviceFeeEl.textContent = bio.service_fee;
}

async function loadArticles() {
  const { data: articles } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
  articles?.forEach(article => {
    articlesContainer.innerHTML += `
      <article>
        <h3>${article.title}</h3>
        ${article.image_url ? `<img src="${article.image_url}" alt="${article.title}" style="max-width:100%;">` : ''}
        <p>${article.content}</p>
      </article>
    `;
  });
}

loadPortfolio();
loadArticles();

// public/register.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://your-project-id.supabase.co',
  'your-anon-key'
);

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    alert('Registrasi gagal: ' + error.message);
  } else {
    alert('Registrasi berhasil. Silakan login.');
    window.location.href = 'login.html';
  }
});

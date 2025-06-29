// js/contact-submit.js
import { supabase } from './supabase-client.js';

document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const { error } = await supabase.from('contacts').insert([{ name, email, message }]);

  if (error) {
    alert('Gagal mengirim pesan.');
    console.error(error);
  } else {
    alert('Pesan berhasil dikirim!');
    this.reset();
  }
});

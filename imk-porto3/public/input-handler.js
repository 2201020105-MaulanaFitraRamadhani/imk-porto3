// public/input-handler.js

const supabase = supabaseClient(); // gunakan fungsi client global

async function submitForm(event) {
  event.preventDefault();
  const title = event.target.title.value;
  const content = event.target.content.value;
  const image_url = event.target.image_url.value;

  const { data, error } = await supabase
    .from('articles')
    .insert([{ title, content, image_url }]);

  if (error) {
    alert('Gagal simpan artikel: ' + error.message);
  } else {
    alert('Artikel berhasil disimpan!');
    event.target.reset();
  }
}

const SUBMIT_URL = 'https://admin.da.live/sheet/niveditanadkarni/wknd-site/register-submission';

function createField(label) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('form-field');

  const id = label.toLowerCase().replace(/\s+/g, '-');
  const labelEl = document.createElement('label');
  labelEl.setAttribute('for', id);
  labelEl.textContent = label;

  let input;
  if (label.toLowerCase() === 'interests') {
    input = document.createElement('select');
    input.id = id;
    input.name = id;
    ['Hiking', 'Surfing', 'Skiing', 'Cycling', 'Travel', 'Photography'].forEach((opt) => {
      const option = document.createElement('option');
      option.value = opt.toLowerCase();
      option.textContent = opt;
      input.append(option);
    });
  } else {
    input = document.createElement('input');
    input.id = id;
    input.name = id;
    input.type = label.toLowerCase() === 'email' ? 'email' : 'text';
    input.placeholder = label;
    if (label.toLowerCase() !== 'interests') input.required = true;
  }

  wrapper.append(labelEl, input);
  return wrapper;
}

export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div > div')];
  const fields = rows.map((r) => r.textContent.trim()).filter(Boolean);

  block.textContent = '';

  const form = document.createElement('form');

  fields.forEach((field) => {
    if (field.toLowerCase() === 'submit') {
      const btn = document.createElement('button');
      btn.type = 'submit';
      btn.classList.add('button', 'primary');
      btn.textContent = 'Join the Waiting List';
      form.append(btn);
    } else {
      form.append(createField(field));
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.timestamp = new Date().toISOString();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    fetch(SUBMIT_URL, { method: 'POST', body: formData, credentials: 'include' }).catch(() => {});
    form.innerHTML = '<p class="form-success">Thanks for registering! We\'ll be in touch.</p>';
  });

  block.append(form);
}

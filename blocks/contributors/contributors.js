export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';

  const grid = document.createElement('ul');
  grid.classList.add('contributors-grid');

  // rows come in pairs: image+name row, then title row
  for (let i = 0; i < rows.length; i += 2) {
    const mainRow = rows[i];
    const titleRow = rows[i + 1];
    const cols = [...mainRow.querySelectorAll(':scope > div')];

    const li = document.createElement('li');
    li.classList.add('contributors-card');

    const avatar = document.createElement('div');
    avatar.classList.add('contributors-avatar');
    const img = cols[0]?.querySelector('img, picture');
    if (img) {
      avatar.append(img.closest('picture') || img);
    } else {
      avatar.innerHTML = '<div class="contributors-avatar-placeholder"></div>';
    }

    const info = document.createElement('div');
    info.classList.add('contributors-info');

    const nameEl = document.createElement('p');
    nameEl.classList.add('contributors-name');
    nameEl.textContent = cols[1]?.textContent.trim() || '';

    const titleEl = document.createElement('p');
    titleEl.classList.add('contributors-title');
    if (titleRow) {
      const titleCols = [...titleRow.querySelectorAll(':scope > div')];
      titleEl.textContent = titleCols[1]?.textContent.trim() || '';
    }

    info.append(nameEl, titleEl);
    li.append(avatar, info);
    grid.append(li);
  }

  block.append(grid);
}

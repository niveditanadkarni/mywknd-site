import SOCIAL_ICONS, { getSocialIconName } from '../../scripts/social-icons.js';

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  block.textContent = '';

  const card = document.createElement('div');
  card.classList.add('writer-card');

  // First row: image (col 1) + name/title (col 2)
  const firstRow = rows[0];
  if (firstRow) {
    const cols = [...firstRow.querySelectorAll(':scope > div')];

    const avatar = document.createElement('div');
    avatar.classList.add('writer-avatar');
    const img = cols[0]?.querySelector('img, picture');
    if (img) {
      avatar.append(img.closest('picture') || img);
    } else {
      avatar.innerHTML = '<div class="writer-avatar-placeholder"></div>';
    }

    const info = document.createElement('div');
    info.classList.add('writer-info');

    // name from row 1 col 2
    const nameText = cols[1]?.textContent.trim();
    if (nameText) {
      const nameEl = document.createElement('p');
      nameEl.classList.add('writer-name');
      nameEl.textContent = nameText;
      info.append(nameEl);
    }

    // title from row 2 col 2
    const secondRow = rows[1];
    if (secondRow) {
      const titleText = [...secondRow.querySelectorAll(':scope > div')][1]?.textContent.trim();
      if (titleText) {
        const titleEl = document.createElement('p');
        titleEl.classList.add('writer-title');
        titleEl.textContent = titleText;
        info.append(titleEl);
      }
    }

    // social links from row 3 col 2 (fall back to col 1 if empty col is omitted)
    const thirdRow = rows[2];
    if (thirdRow) {
      const thirdRowCols = [...thirdRow.querySelectorAll(':scope > div')];
      const socialCol = thirdRowCols[1] || thirdRowCols[0];
      if (socialCol) {
        const hrefs = [...socialCol.querySelectorAll('a')].map((a) => a.href);
        if (!hrefs.length) {
          socialCol.querySelectorAll('p').forEach((p) => {
            const text = p.textContent.trim();
            if (text.startsWith('http')) hrefs.push(text);
          });
        }
        if (hrefs.length) {
          const ul = document.createElement('ul');
          ul.classList.add('writer-social');
          hrefs.forEach((href) => {
            const iconName = getSocialIconName(href);
            if (!iconName) return;
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.setAttribute('aria-label', iconName.charAt(0).toUpperCase() + iconName.slice(1));
            a.innerHTML = SOCIAL_ICONS[iconName];
            li.append(a);
            ul.append(li);
          });
          if (ul.children.length) info.append(ul);
        }
      }
    }

    card.append(avatar, info);
  }

  block.append(card);
}

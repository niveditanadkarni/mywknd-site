export default async function decorate(block) {
  let json;
  try {
    const response = await fetch('/magazine/query-index.json');
    if (!response.ok) return;
    json = await response.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to load article index', e);
    return;
  }
  const isFeatured = block.classList.contains('featured');
  const all = json.data.filter((a) => a.title && a.path !== '/magazine/');
  const articles = isFeatured ? all.slice(0, 2) : all;

  block.textContent = '';

  const ul = document.createElement('ul');
  articles.forEach((article, i) => {
    const li = document.createElement('li');

    const image = article.image && article.image !== 'about:error'
      ? `<img src="${article.image}" alt="${article.imageAlt || article.title}" loading="lazy">`
      : '<div class="article-list-no-image"></div>';

    if (isFeatured && i === 0) li.classList.add('article-list-hero');

    li.innerHTML = `
      <a href="${article.path}">
        <div class="article-list-image">${image}</div>
        <div class="article-list-body">
          <h3>${article.title}</h3>
          <p>${article.description || ''}</p>
          <span class="article-list-cta">Read More</span>
        </div>
      </a>
    `;
    ul.append(li);
  });

  block.append(ul);
}

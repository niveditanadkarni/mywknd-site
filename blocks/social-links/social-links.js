import SOCIAL_ICONS, { getSocialIconName } from '../../scripts/social-icons.js';

export default function decorate(block) {
  const links = [...block.querySelectorAll('a')];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.classList.add('social-links-wrapper');

  const label = document.createElement('span');
  label.classList.add('social-links-label');
  label.textContent = 'Follow Us';

  const ul = document.createElement('ul');
  ul.classList.add('social-links-list');

  links.forEach((link) => {
    const iconName = getSocialIconName(link.href) || getSocialIconName(link.textContent);
    if (!iconName) return;

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', iconName.charAt(0).toUpperCase() + iconName.slice(1));
    a.innerHTML = SOCIAL_ICONS[iconName];
    li.append(a);
    ul.append(li);
  });

  wrapper.append(label, ul);
  block.append(wrapper);
}

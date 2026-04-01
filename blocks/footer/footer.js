import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // build top row: brand + nav links + social links block
  const top = document.createElement('div');
  top.classList.add('footer-top');

  // brand logo — read from first heading in fragment
  const brandHeading = footer.querySelector('h1, h2, h3');
  const brand = document.createElement('a');
  brand.href = '/';
  brand.classList.add('footer-brand');
  brand.textContent = brandHeading ? brandHeading.textContent.trim() : 'WKND';
  if (brandHeading) brandHeading.closest('p, div')?.remove();
  top.append(brand);

  // pull nav links from first <ul> in footer content
  const navUl = footer.querySelector('ul');
  if (navUl) {
    navUl.classList.add('footer-nav');
    top.append(navUl);
  }

  // move social-links block into top row
  const socialBlock = footer.querySelector('.social-links');
  if (socialBlock) {
    top.append(socialBlock);
  }

  footer.prepend(top);
  block.append(footer);
}

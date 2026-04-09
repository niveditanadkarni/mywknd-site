export default function decorate(block) {
  const picture = block.querySelector('picture');
  if (picture) {
    picture.closest('p, h1, h2, h3')?.remove();
    block.prepend(picture);
  }
}

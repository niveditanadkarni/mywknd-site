export default function decorate(block) {
  const picture = block.querySelector('picture');
  if (picture) {
    picture.closest('p')?.remove();
    block.prepend(picture);
  }
}

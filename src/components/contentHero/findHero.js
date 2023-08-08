export default function findHero(heroImages) {
  let maxWidth = 0;
  let maxHeight = 0;
  let heroImage = {};
  heroImages.map((image) => {
    if (image.width > maxWidth && image.height > maxHeight) {
      heroImage = image;
      maxHeight = image.height;
      maxWidth = image.width;
    }
  });
  return heroImage;
}

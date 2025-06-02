export function getProjectImageSrc(image?: string): string {
  if (!image) return `${import.meta.env.BASE_URL}imgs/no_image_black.jpg`;
  if (image.startsWith('data:image')) return image;
  return `${import.meta.env.BASE_URL}${image}`;
}

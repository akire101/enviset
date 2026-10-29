export const maxImageBytes = 750 * 1024;
export const uploadedImagePattern = /^\/media\/[a-f0-9]{64}$/;

// Only raster formats are served; SVG/HTML must never execute on the site's origin.
export function imageMime(bytes: Uint8Array): string | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if ([137,80,78,71,13,10,26,10].every((value, i) => bytes[i] === value)) return 'image/png';
  const text = new TextDecoder('ascii');
  if (text.decode(bytes.slice(0, 4)) === 'RIFF' && text.decode(bytes.slice(8, 12)) === 'WEBP') return 'image/webp';
  return null;
}

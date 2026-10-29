import {env} from 'cloudflare:workers';
import {api, HttpError, isAdmin, json, limit} from '../../../server';
import {sameOrigin} from '../../../validation';
import {imageMime, maxImageBytes} from '../../../article-image';

export async function POST(request: Request) {
  return api(async () => {
    if (!await isAdmin()) throw new HttpError(401, 'Najprv sa prihláste.');
    if (!sameOrigin(request)) throw new HttpError(403, 'Požiadavka pochádza z inej stránky.');
    const mime = request.headers.get('content-type');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(mime || '')) throw new HttpError(415, 'Vyberte obrázok JPG, PNG alebo WebP.');
    await limit(request, 'article-image', 60, 60 * 60 * 1000);
    const reader = request.body?.getReader();
    if (!reader) throw new HttpError(400, 'Vyberte obrázok.');
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const {value, done} = await reader.read();
      if (done) break;
      size += value.length;
      if (size > maxImageBytes) {
        await reader.cancel();
        throw new HttpError(413, 'Obrázok je príliš veľký. Vyberte menší obrázok.');
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    if (imageMime(bytes) !== mime) throw new HttpError(415, 'Súbor nie je podporovaný obrázok. Vyberte JPG, PNG alebo WebP.');
    const hash = await crypto.subtle.digest('SHA-256', bytes);
    const id = Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
    await env.DB!.prepare('INSERT OR IGNORE INTO article_images (id, mime, data, created_at) VALUES (?, ?, ?, ?)').bind(id, mime, bytes.buffer, Date.now()).run();
    return json({image: `/media/${id}`}, 201);
  });
}

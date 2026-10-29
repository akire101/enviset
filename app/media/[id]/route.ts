import {env} from 'cloudflare:workers';
import {api, isAdmin, json} from '../../server';

export const dynamic = 'force-dynamic';
export async function GET(_request: Request, {params}: {params: Promise<{id: string}>}) {
  return api(async () => {
    const {id} = await params;
    if (!/^[a-f0-9]{64}$/.test(id)) return json({error: 'Obrázok sa nenašiel.'}, 404);
    const published = await env.DB!.prepare("SELECT id FROM posts WHERE image = ? AND status = 'published' LIMIT 1").bind(`/media/${id}`).first();
    if (!published && !await isAdmin()) return json({error: 'Obrázok sa nenašiel.'}, 404);
    const row = await env.DB!.prepare('SELECT mime, data FROM article_images WHERE id = ?').bind(id).first<{mime: string; data: number[]}>();
    if (!row) return json({error: 'Obrázok sa nenašiel.'}, 404);
    return new Response(new Uint8Array(row.data), {headers: {
      'Content-Type': row.mime,
      'Content-Length': String(row.data.length),
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; sandbox",
      // Drafts and archived images must not be disclosed through a shared cache.
      'Cache-Control': 'no-store',
    }});
  });
}

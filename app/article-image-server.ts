import {env} from 'cloudflare:workers';
import {HttpError} from './server';
import {uploadedImagePattern} from './article-image';

export async function requireArticleImage(image: string) {
  if (uploadedImagePattern.test(image) && !await env.DB!.prepare('SELECT id FROM article_images WHERE id = ?').bind(image.slice('/media/'.length)).first()) {
    throw new HttpError(400, 'Obrázok sa nenašiel. Nahrajte ho znova.');
  }
}

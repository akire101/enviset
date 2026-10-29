'use client';
import {useEffect, useRef, useState} from 'react';
import {Upload} from 'lucide-react';
import {images} from '../validation';
import {maxImageBytes, uploadedImagePattern} from '../article-image';

async function prepareImage(file: File) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Vyberte obrázok JPG, PNG alebo WebP.');
  if (file.size > 10 * 1024 * 1024) throw new Error('Obrázok má viac než 10 MB. Vyberte menší súbor.');
  let bitmap: ImageBitmap;
  try { bitmap = await createImageBitmap(file); }
  catch { throw new Error('Obrázok sa nedá otvoriť. Skúste iný súbor JPG, PNG alebo WebP.'); }
  try {
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Prehliadač nedokázal spracovať obrázok. Skúste ho aktualizovať.');
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.85, 0.7, 0.55, 0.4]) {
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/webp', quality));
      if (blob && blob.size <= maxImageBytes) return blob;
    }
    throw new Error('Obrázok sa nepodarilo dostatočne zmenšiť. Vyberte menšiu fotografiu.');
  } finally { bitmap.close(); }
}

export function ArticleImageField({image, onChange, onBusyChange, disabled}: {
  image: string; onChange: (image: string) => void; onBusyChange: (busy: boolean) => void; disabled: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const controller = useRef<AbortController | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  useEffect(() => () => { controller.current?.abort(); onBusyChange(false); }, [onBusyChange]);

  async function upload(file?: File) {
    if (!file || busy || disabled) return;
    const request = new AbortController();
    controller.current = request;
    setBusy(true); onBusyChange(true); setError(''); setNotice('');
    try {
      const blob = await prepareImage(file);
      if (request.signal.aborted) return;
      const response = await fetch('/api/admin/images', {method: 'POST', headers: {'Content-Type': blob.type}, body: blob, signal: request.signal});
      const result = await response.json().catch(() => {throw new Error('Nahrávanie sa nepodarilo. Skúste to znova.');}) as {image: string; error?: string};
      if (!response.ok) throw new Error(result.error || 'Nahrávanie sa nepodarilo. Skúste to znova.');
      if (!request.signal.aborted) {
        onChange(result.image);
        setNotice('Obrázok je nahratý. Potvrďte zmenu tlačidlom Uložiť článok.');
      }
    } catch (error) {
      if (!request.signal.aborted) setError(error instanceof TypeError ? 'Spojenie sa prerušilo. Skúste obrázok nahrať znova.' : (error as Error).message);
    } finally {
      if (!request.signal.aborted) { setBusy(false); onBusyChange(false); }
    }
  }

  return <div className="article-image-field" aria-busy={busy}>
    <label className="field" htmlFor="article-image-choice">Titulný obrázok</label>
    <select id="article-image-choice" value={image} disabled={disabled || busy} onChange={e => {onChange(e.target.value); setNotice(''); setError('');}}>
      {uploadedImagePattern.test(image) && <option value={image}>Vlastný nahratý obrázok</option>}
      {images.map((value, i) => <option key={value} value={value}>{['Horský les','Rozkvitnutá lúka','Horské údolie','Zelené kopce','Lesný potok','Bukový les','Mokraď','Bukové listy','Nebezpečné odpady – dodané','Triedenie odpadov – dodané','Doklady a kalendár – dodané','Krajina – dodaná'][i]}</option>)}
    </select>
    <input ref={input} className="visually-hidden" tabIndex={-1} type="file" accept="image/jpeg,image/png,image/webp" aria-label="Obrázok z počítača" aria-describedby="article-image-help" disabled={disabled || busy} onChange={e => {const file = e.target.files?.[0]; e.target.value = ''; void upload(file);}}/>
    <button type="button" className="button secondary" disabled={disabled || busy} onClick={() => input.current?.click()}><Upload size={18}/>{busy ? 'Nahrávam obrázok…' : 'Nahrať z počítača'}</button>
    <small id="article-image-help">JPG, PNG alebo WebP do 10 MB. Obrázok automaticky zmenšíme pre web.</small>
    {busy && <p role="status">Spracúvam a nahrávam obrázok…</p>}
    {error && <p className="form-status error" role="alert">{error}</p>}
    {notice && <p className="form-status" role="status">{notice}</p>}
    <img src={image} alt="Náhľad titulného obrázka" width={480} height={270}/>
  </div>;
}

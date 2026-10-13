'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="main" className="container section"><h1>Niečo sa nepodarilo načítať.</h1><p>Skúste to ešte raz. Vaše uložené údaje zostávajú zachované.</p><button className="button" onClick={reset}>Skúsiť znova</button></main>}

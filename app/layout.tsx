import type { Metadata } from "next";
import "./globals.css";
import "./modern.css";
import { Chatbot } from './widgets';
import { Header } from './header';
import { Footer } from './components';
import { MobileContact } from './mobile-contact';
import { siteUrl } from './seo';

export const metadata: Metadata = {
  title: { default: 'ENVI set – odpadové hospodárstvo', template: '%s | ENVI set' },
  description: 'Odborné poradenstvo a manažment odpadového hospodárstva pre firmy.',
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body><a className="skip-link" href="#main">Preskočiť na obsah</a><Header/>{children}<Footer/><Chatbot/><MobileContact/>{siteUrl()&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'WebSite',name:'ENVI set',url:siteUrl(),description:'Odborné poradenstvo a manažment odpadového hospodárstva pre firmy.'}).replace(/</g,'\\u003c')}}/>}</body>
    </html>
  );
}

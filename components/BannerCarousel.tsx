'use client';
import { useEffect, useRef, useState } from 'react';

type BannerItem = { id?: string|number; href?: string; image_url: string; title?: string; alt?: string; };

export default function BannerCarousel({ items = [] as BannerItem[] }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<number | null>(null);
  const delay = 3500;

  useEffect(() => {
    if (!items.length || items.length <= 1) return;
    const start = () => { stop(); timerRef.current = window.setInterval(() => setIdx((i) => (i + 1) % items.length), delay); };
    const stop = () => { if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; } };
    start(); return stop;
  }, [items.length]);

  if (!items.length) return null;
  const it = items[idx];

  return (
    <section className="banner-carousel" role="region" aria-roledescription="carousel" aria-label="Promotions">
      <a className="banner-slide" href={it.href ?? '#'} aria-label={it.title ?? 'Advertisement'}>
        <img src={it.image_url} alt={it.alt ?? it.title ?? 'Advertisement'} />
      </a>
    </section>
  );
}

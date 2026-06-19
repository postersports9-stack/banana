'use client'

import { useState } from "react";

type Client = {
  /** Display name — also the fallback wordmark and alt text. */
  name: string;
  /** Logo file in /public/logos/. Drop a PNG, SVG or WEBP here with this exact name. */
  src: string;
  /** Site to open when the logo is clicked. */
  href: string;
};

// Real clients. Logo files live in public/logos/.
// Until a file exists, a styled wordmark of `name` shows instead.
const clients: Client[] = [
  { name: "BN Sound", src: "/logos/bn-sound.png", href: "https://www.bnsound.com/" },
  { name: "Klik Logistik", src: "/logos/klik-logistik.png", href: "https://klikgroup.mk/" },
  { name: "Eco Zone", src: "/logos/eco-zone.webp", href: "https://www.ecozone.mk/" },
];

function ClientLogo({ client }: { client: Client }) {
  const [broken, setBroken] = useState(false);

  return (
    <a
      href={client.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={client.name}
      className="flex items-center"
    >
      {broken ? (
        <span className="font-headline-lg text-xl md:text-2xl font-black tracking-tighter uppercase text-white/50 hover:text-white whitespace-nowrap transition-colors duration-300">
          {client.name}
        </span>
      ) : (
        <img
          src={client.src}
          alt={client.name}
          onError={() => setBroken(true)}
          className="h-9 md:h-11 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
        />
      )}
    </a>
  );
}

export default function ClientsMarquee() {
  return (
    <section className="w-full bg-black text-white border-y border-white/10 overflow-hidden">
      <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-10">
        <p className="text-center font-label-bold text-label-bold text-white/40 uppercase tracking-widest mb-8">
          Доверба од нашите клиенти
        </p>
        <div className="group relative flex overflow-hidden">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28 bg-gradient-to-l from-black to-transparent" />

          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[0, 1].map((track) => (
              <ul
                key={track}
                aria-hidden={track === 1}
                className="flex shrink-0 items-center gap-12 md:gap-20 pr-12 md:pr-20"
              >
                {/* repeat clients so the line stays full on wide screens */}
                {[0, 1, 2].flatMap((rep) =>
                  clients.map((c) => (
                    <li key={`${track}-${rep}-${c.name}`}><ClientLogo client={c} /></li>
                  ))
                )}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

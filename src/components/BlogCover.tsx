import { type CoverKey } from "@/lib/blog";

// File-free cover art for blog posts. One on-brand SVG per topic (banana blob +
// black line work, matching the SeoPage hero illustration style), so posts have
// distinct, consistent imagery without shipping image files. Rendered in the nav
// dropdown, the blog index cards and the post hero — the SVG scales to fill.
export default function BlogCover({
  cover,
  className = "",
}: {
  cover: CoverKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 480 320"
      preserveAspectRatio="xMidYMid slice"
      className={`w-full h-full block ${className}`}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="480" height="320" fill="#f1efe9" />
      {cover === "cost" && (
        <>
          <path
            d="M250 40c86-16 174 26 184 112 8 74-26 112 10 184H120c-44 0-92-58-100-138-7-74 26-126 100-160 50-23 88-1 130 2z"
            fill="var(--color-banana)"
          />
          {/* price tag */}
          <g transform="rotate(-12 240 165)">
            <rect x="150" y="110" width="180" height="120" rx="18" fill="#fff" stroke="#111" strokeWidth="5" />
            <circle cx="186" cy="146" r="12" fill="none" stroke="#111" strokeWidth="5" />
            <text x="252" y="200" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="84" fontWeight="700" fill="#111">€</text>
          </g>
          {/* coins */}
          <g>
            <ellipse cx="330" cy="252" rx="44" ry="16" fill="#fff" stroke="#111" strokeWidth="5" />
            <ellipse cx="330" cy="238" rx="44" ry="16" fill="var(--color-banana)" stroke="#111" strokeWidth="5" />
          </g>
        </>
      )}
      {cover === "time" && (
        <>
          <path
            d="M236 44c84-12 168 30 178 110 8 66-30 104 6 168H110c-40 0-86-54-92-130-6-72 28-122 100-156 46-22 80-2 118 8z"
            fill="var(--color-banana)"
          />
          {/* calendar */}
          <rect x="150" y="118" width="180" height="140" rx="16" fill="#fff" stroke="#111" strokeWidth="5" />
          <path d="M150 154h180" stroke="#111" strokeWidth="5" />
          <line x1="186" y1="104" x2="186" y2="134" stroke="#111" strokeWidth="7" strokeLinecap="round" />
          <line x1="294" y1="104" x2="294" y2="134" stroke="#111" strokeWidth="7" strokeLinecap="round" />
          {/* clock overlapping */}
          <circle cx="318" cy="232" r="46" fill="#FFE99A" stroke="#111" strokeWidth="6" />
          <path d="M318 232V206M318 232l20 14" stroke="#111" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {cover === "seo" && (
        <>
          <path
            d="M252 42c84-14 170 28 180 110 8 70-28 108 8 176H118c-42 0-90-56-98-134-7-74 28-124 100-158 48-22 86 0 132 6z"
            fill="var(--color-banana)"
          />
          {/* ascending bars */}
          <rect x="138" y="206" width="34" height="56" rx="5" fill="#fff" stroke="#111" strokeWidth="5" />
          <rect x="186" y="176" width="34" height="86" rx="5" fill="#fff" stroke="#111" strokeWidth="5" />
          <rect x="234" y="142" width="34" height="120" rx="5" fill="var(--color-banana)" stroke="#111" strokeWidth="5" />
          <path d="M150 196l52-28 52-34 56-30" stroke="#111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M296 92h22v22" stroke="#111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {/* magnifying glass */}
          <circle cx="332" cy="226" r="42" fill="#fff" stroke="#111" strokeWidth="6" />
          <path d="M316 226l11 11 21-23" stroke="#111" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="363" y1="257" x2="392" y2="286" stroke="#111" strokeWidth="8" strokeLinecap="round" />
        </>
      )}
      {cover === "store" && (
        <>
          <path
            d="M244 40c86-14 172 30 182 112 8 70-30 110 6 176H112c-42 0-88-56-96-134-7-74 28-124 100-158 48-22 84 0 128 4z"
            fill="var(--color-banana)"
          />
          {/* shopping bag */}
          <path d="M158 138h164l-14 124a14 14 0 0 1-14 12H186a14 14 0 0 1-14-12z" fill="#fff" stroke="#111" strokeWidth="5" strokeLinejoin="round" />
          <path d="M198 150v-14a42 42 0 0 1 84 0v14" fill="none" stroke="#111" strokeWidth="6" strokeLinecap="round" />
          {/* cart badge */}
          <circle cx="326" cy="232" r="44" fill="#FFE99A" stroke="#111" strokeWidth="6" />
          <path d="M306 222h6l5 26h22l6-18h-30" fill="none" stroke="#111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="322" cy="254" r="4" fill="#111" />
          <circle cx="338" cy="254" r="4" fill="#111" />
        </>
      )}
    </svg>
  );
}

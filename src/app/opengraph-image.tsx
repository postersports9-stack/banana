import { ImageResponse } from "next/og";

// Social share card (1200x630). Generated at build time so the OG image always
// matches the brand without shipping a static asset to keep in sync.
export const alt = "Banana — Веб дизајн студио";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#000000",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <div
            style={{
              width: 104,
              height: 104,
              borderRadius: 24,
              background: "#FFE135",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 68,
              fontWeight: 800,
              color: "#000000",
            }}
          >
            B
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              color: "#FFE135",
              letterSpacing: "-0.04em",
            }}
          >
            Banana
          </div>
        </div>
        <div style={{ marginTop: 36, fontSize: 42, color: "#ffffff", fontWeight: 600 }}>
          Веб дизајн студио
        </div>
        <div style={{ marginTop: 14, fontSize: 30, color: "rgba(255,255,255,0.7)" }}>
          Изработка на веб страни и интернет продавници · Македонија
        </div>
      </div>
    ),
    { ...size }
  );
}

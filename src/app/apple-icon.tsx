import { ImageResponse } from "next/og";

// Apple touch icon — solid banana tile with a black wordmark initial, matching
// the site's primary button (bg-banana / text-black).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFE135",
          color: "#000000",
          fontSize: 120,
          fontWeight: 800,
        }}
      >
        B
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const alt = "Yugal Agarwal — Product Manager at LetsTransport";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#f4f4f8",
          background:
            "radial-gradient(circle at 15% 10%, #2a2a6b 0%, transparent 55%), radial-gradient(circle at 90% 90%, #3b1f6b 0%, transparent 50%), #07070d",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#8b8bff", letterSpacing: 4 }}>
          YA.
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, letterSpacing: -3 }}>
            Yugal Agarwal
          </div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 16, color: "#b7b7d6" }}>
            Product Manager · 0-to-1 products, AI-enabled workflows, data platforms
          </div>
          <div style={{ display: "flex", fontSize: 28, marginTop: 12, color: "#7d7da0" }}>
            LetsTransport · ex-Media.net · Founder, Nogozo · IIT (BHU)
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, fontStyle: "italic", color: "#8a8aa8" }}>
          &ldquo;In God we trust; all others must bring data.&rdquo;
        </div>
      </div>
    ),
    { ...size },
  );
}

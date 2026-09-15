import { ImageResponse } from "next/og";

export const alt = "QR Studio — Generador de Códigos QR Gratis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function FinderSquare() {
  return (
    <div
      style={{
        display: "flex",
        width: 90,
        height: 90,
        backgroundColor: "#333333",
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: 56,
          height: 56,
          backgroundColor: "#EAFFD0",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 24,
            height: 24,
            backgroundColor: "#333333",
            borderRadius: 5,
          }}
        />
      </div>
    </div>
  );
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#EAFFD0",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 56, left: 56, display: "flex" }}>
          <FinderSquare />
        </div>
        <div style={{ position: "absolute", top: 56, right: 56, display: "flex" }}>
          <FinderSquare />
        </div>
        <div style={{ position: "absolute", bottom: 56, left: 56, display: "flex" }}>
          <FinderSquare />
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, color: "#333333" }}>
            QR Studio
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 600,
              color: "#F38181",
              marginTop: 20,
            }}
          >
            Generador de Códigos QR Gratis
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#333333",
              opacity: 0.55,
              marginTop: 14,
            }}
          >
            qrtuo.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

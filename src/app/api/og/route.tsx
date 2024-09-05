import { ImageResponse } from "next/og";

// Create the OpenGraph image for the app, found at /api/og and linked in the layout manifest
// This is used by social applications to display a preview of the app when shared
// on platforms like Twitter, Discord and WhatsApp
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          backgroundColor: "#082f49",
          fontSize: 84,
          fontWeight: 600,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="420"
          height="420"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-cloud-sun"
        >
          <path d="M12 2v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="M20 12h2" />
          <path d="m19.07 4.93-1.41 1.41" />
          <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
          <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
        </svg>

        <div style={{ marginTop: 8 }}>Weather</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

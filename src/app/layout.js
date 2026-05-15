import "./globals.css";

export const metadata = {
  title: "Stagscape",
  description: "Tabletop RPG Companion App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

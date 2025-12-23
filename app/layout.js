import "./globals.css";

export const metadata = {
  title: "Rock Almighty",
  description: "Rock solid advice.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  title: "Rock Almighty",
  description: "Rock solid advice.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/f08a128311.js" crossOrigin="anonymous"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

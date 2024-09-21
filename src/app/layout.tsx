import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// Import Roboto from Google Fonts
const roboto = Roboto({
  subsets: ["latin"], // You can adjust subsets if needed
  weight: ["100", "300", "400", "500", "700", "900"], // Define the font weights you want to use
  variable: "--font-roboto", // Custom CSS variable for the font
});

export const metadata: Metadata = {
  title: "Tanay Baswa",
  description: "Tanay Baswa's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`} // Applying Roboto font to the body
      >
        {children}
      </body>
    </html>
  );
}

import { Playfair_Display, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { AuthProvider } from "@/context/AuthContext";
import GlobalShopManager from "@/components/GlobalShopManager";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Chaman Vastra Bhandar Pipariya | Pure Silk Sarees, Bridal Lehengas & Ethnic Wear",
  description:
    "Pipariya's premier destination for pure Banarasi silk sarees, Kanjivaram, designer bridal lehengas, and festive suits. Free shipping across India and live video-call shopping.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${poppins.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-[#19181B] font-sans antialiased overflow-x-hidden selection:bg-[#A34850] selection:text-white">
        <AuthProvider>
          <ShopProvider>
            {children}
            <GlobalShopManager />
          </ShopProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

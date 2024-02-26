import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "GymTracker Home Page",
    template: "%s | GymTracker",
  },
  description: "GymTracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <ThemeProvider attribute="class" defaultTheme="system">
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}


import {Poppins, Inter} from "next/font/google"
import "./globals.css";
import { dbConnect } from "@/service/mongo";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ['latin'],
  weight: ["100", "300", "700"],
  variable: '--font-inter'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins'
})

export const metadata = {
  title: "Educonnect । world'd best learning platform",
  description: "Educonnect ।। Explore ।। Build ।। Learn",
};

export default async function  RootLayout({ children }) {
    await dbConnect()
  
   
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased`} >
        <Toaster richColors/>
        {children}
      </body>
    </html>
  );
}

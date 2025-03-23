"use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { Satisfy } from "next/font/google";
import { ThemeProvider } from "./utils/theme.provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import { useEffect } from "react";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || 'https://e-learning-server-three.vercel.app';



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400", // Only weight available for Satisfy
  variable: "--font-Satisfy",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${poppins.variable} ${josefin.variable} ${satisfy.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  useEffect(() => {
    const isSecure = ENDPOINT.startsWith('https');
const socket = socketIO(ENDPOINT, {
  transports: ['websocket'],
  secure: isSecure,  // This ensures WebSocket Secure (wss://)
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});
  
    socket.on("connection", () => {
      console.log("Socket connected with ID:", socket.id);
    });
  
    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);
  

  return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};

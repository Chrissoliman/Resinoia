import Header from "@/components/Header";
import CartContextProvider from "@/lib/cartContext";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const inter = Poppins({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <CartContextProvider>
          <main
            className={`${inter.className} min-h-screen max-w-screen-2xl bg-background`}
          >
            <Header />
            <Component {...pageProps} />
            <Toaster position="top-center" reverseOrder={false} />
          </main>
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}

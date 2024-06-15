import Header from "@/components/Header";
import CartContextProvider from "@/lib/cartContext";
import "@/styles/globals.css";

import { Poppins } from "next/font/google";

const inter = Poppins({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }) {
  return (
    <>
      <CartContextProvider>
        <main
          className={`${inter.className} min-h-screen max-w-screen-2xl mx-auto p-4 bg-background`}
        >
          <Header />
          <Component {...pageProps} />
        </main>
      </CartContextProvider>
    </>
  );
}

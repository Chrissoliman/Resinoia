import "@/styles/globals.css";

import { Poppins } from "next/font/google";

const inter = Poppins({ subsets: ["latin"], weight: '400' });

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={`${inter.className} min-h-screen p-4 bg-background`}>
        <Component {...pageProps} />;
      </main>
    </>
  );
}

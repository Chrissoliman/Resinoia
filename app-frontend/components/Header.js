import { CartContext } from "@/lib/cartContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Header() {
  const router = useRouter();
  const { pathname } = router;
  const { cartProducts } = useContext(CartContext);

  const { data: session } = useSession();

  console.log('cartProducts', cartProducts)

  let productsQuantity = 0
  for(const {quantity} of cartProducts) {
    productsQuantity += quantity
  }

  const active = "text-primary transition hover:text-secondary font-bold";
  const inactive =
    "text-gray-500 transition hover:text-gray-500/75 font-medium ";
  return (
    <>
      <header id="top" class="bg-white border-b border-primary border-opacity-50 sticky top-0 z-40">
        <div class="mx-auto flex h-14 max-w-screen-2xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link class="block text-primary" href="/">
            <span class="sr-only">Home</span>
            <img src="/Resinoia Logo.jpg" alt="logo" className="h-12 w-12" />
          </Link> 

          <div class="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" class="hidden md:block">
              <ul class="flex items-center gap-6 text-sm ">
                <li>
                  <Link class={pathname == "/" ? active : inactive} href="/">
                    {" "}
                    Home{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    class={pathname == "/products" ? active : inactive}
                    href="/products"
                  >
                    {" "}
                    Products{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    class={pathname == "/contact" ? active : inactive}
                    href="/about"
                  >
                    {" "}
                    About - Contact{" "}
                  </Link>
                </li>
              </ul>
            </nav>

            <div class="flex items-center gap-4">
              <div class="sm:flex sm:gap-4 items-center">
                {session ? (
                  <div className="sm:flex sm:gap-2 border-r pr-4">
                    <div className="h-9 w-9 ">
                      <img
                        src={session.user.image}
                        alt={session.user.image}
                        className="rounded-full h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                ) : (
                  <Link
                    class="block  px-5  text-sm font-medium transition border-r border-primary "
                    href="#"
                  >
                    Account
                  </Link>
                )}

                <Link
                  class="group rounded-md  text-sm font-medium flex  transition text-text hover:text-green-600/75"
                  href="/cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  <span className="text-primary font-bold ml-1 group-hover:text-text">
                    {productsQuantity}
                  </span>
                </Link>
              </div>

              <button class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span class="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

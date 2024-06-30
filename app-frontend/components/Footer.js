import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-100">
        <div className="relative mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8 lg:pt-8">
          <div className="lg:flex lg:items-end lg:justify-between">
            <div>
              <div className="flex justify-center lg:justify-start">
                <img src="/Resinoia Logo.jpg" className="h-24 w-24" />
              </div>

              <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Incidunt consequuntur amet culpa cum itaque neque.
              </p>
            </div>

            <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
              <li>
                <Link
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  {" "}
                  Home{" "}
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/about"
                >
                  {" "}
                  About{" "}
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/products"
                >
                  {" "}
                  Products{" "}
                </Link>
              </li>
            </ul>
          </div>

          <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

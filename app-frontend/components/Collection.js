import Link from "next/link";

export default function Collection({ product }) {
  if (product) {
    return (
      <>
        <section>
          <div className="px-4 py-8 mx-auto sm:py-12 lg:px-8 ">
            <header className="text-center">
              <h2 className="tracking-tight text-xl sm:text-3xl font-bold  text-text">
                New Collection
              </h2>
              <p className="max-w-lg mt-4 mx-auto text-gray-500">
                Explore our latest crafts and elevate your home with our
                exclusive new collection
              </p>
            </header>

            <div className="px-4 py-8 mx-auto sm:py-12 lg:px-8 ">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">


                <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                  <div className="mx-auto text-center lg:text-left">
                    <header>
                      <h2 className="tracking-tight text-xl sm:text-4xl font-bold  text-text">
                        {product.title}
                      </h2>
                      <p className="text-base mt-3 text-text max-w-md line-clamp-3  md:line-clamp-none">
                        {product.description}
                      </p>
                      <p className="text-lg mt-1 mb-8 text-primary">
                        {product.price} EGP
                      </p>
                    </header>

                    <Link
                      href={"/products"}
                      className="rounded-lg border border-gray-300 bg-white px-12 mt-8 py-2.5 text-center text-md font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 hover:border-primary focus:ring focus:ring-gray-100 "
                    >
                      Shop All
                    </Link>
                  </div>
                </div>


                <div className="grid grid-cols-2 lg:col-span-2 gap-4 my-4">
                  <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                    <img src={product.images[0]} alt="collection-img" className=" rounded-md" />
                  </div>
                  <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                    <img src={product.images[1]} alt="collection-img" className=" rounded-md" />
                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

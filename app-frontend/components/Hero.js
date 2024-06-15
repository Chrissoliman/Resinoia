import Link from "next/link";

export default function Hero({ product }) {
  if (product) {
    console.log(product)
    return (
      <>
        <div className="relative overflow-hidden my-14 md:my-10 ">
          <div className="lg:py-40 min-h-[650px]">
            <div className="relative mx-auto sm:static px-6 lg:px-8 ">
              <div className="max-w-xl text-start">
                <h1 className="text-4xl md:text-5xl max-md:mb-6 font-bold tracking-tight text-text my-3">
                  {product.title}
                </h1>
                <p className="line-clamp-3 text-lg text-gray-500">
                  {product.description}
                </p>

                <div className="flex gap-4 mt-10 items-center max-sm:justify-center max-sm:mt-6">
                  <Link
                    href={"/cart"}
                    className="rounded-lg border border-primary bg-primary px-5 py-2.5 text-center text-md font-medium text-white shadow-sm transition-all hover:border-secondary hover:bg-secondary focus:ring focus:ring-primary disabled:cursor-not-allowed disabled:border-primary disabled:bg-primary"
                  >
                    Add to cart
                  </Link>

                  <Link
                    href={"/products"}
                    className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-md font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    All Products
                  </Link>
                </div>

                <div className="hidden lg:block absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-64 h-72 overflow-hidden rounded-lg border border-secondary transform rotate-3 translate-x-4 hover:-rotate-6 hover:translate-x-8 transition-transform duration-300 ease-in-out">
                        <img
                          src={product.images[0]}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="w-64 h-72 overflow-hidden rounded-lg border border-secondary transform -rotate-2 translate-x-2 hover:rotate-4 hover:translate-x-4 transition-transform duration-300 ease-in-out">
                        <img
                          src={product.images[1]}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-64 h-72 overflow-hidden rounded-lg border border-secondary transform rotate-1 translate-x-3 hover:-rotate-2 hover:translate-x-4 transition-transform duration-300 ease-in-out">
                        <img
                          src={product.images[2]}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="w-64 h-72 overflow-hidden rounded-lg border border-secondary transform -rotate-4 translate-x-2 hover:rotate-8 hover:translate-x-3 transition-transform duration-300 ease-in-out">
                        <img
                          src={product.images[3]}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
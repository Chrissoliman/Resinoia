import { CartContext } from "@/lib/cartContext";
import Link from "next/link";
import { useContext } from "react";

export default function Products({ products }) {
  const { addProduct } = useContext(CartContext);

  return (
    <>
      <div className="mx-auto px-8 py-10">
        <h2 className=" tracking-tight text-2xl text-center font-bold text-text">
          Our Latest Products
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {products?.length > 0 &&
            products.map((product) => (
              <div className="group relative" key={product.id}>
                <div className="group block overflow-hidden border border-gray-950 rounded-xl border-opacity-10 max-sm:mb-4 max-sm:border-4">
                  <div className="">
                    <Link href={"/products/" + product._id}>
                      <div className="relative h-[300px] sm:h[300px]">
                        <img
                          src={product.images[0]}
                          alt="new-img"
                          className="absolute inset-0 h-full w-full object-contain opacity-100 group-hover:opacity-0"
                        />
                        <img
                          src={product.images[1]}
                          alt="new-img"
                          className="absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100"
                        />
                      </div>
                    </Link>

                    <div className="relative p-3 border-t">
                      <Link href={"/products/" + product._id}>
                        <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4 truncate">
                          {product.title}
                        </h3>
                      </Link>
                      <div className=" mt-1.5 flex items-center justify-between text-text">
                        <p className="tracking-wide text-primary font-extrabold font">
                          {product.price[0]} EGP
                        </p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

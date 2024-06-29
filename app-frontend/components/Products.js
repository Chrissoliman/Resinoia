import { CartContext } from "@/lib/cartContext";
import Link from "next/link";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function Products({ products }) {
  const { addProduct } = useContext(CartContext);

  return (
    <>
      <div className="mx-auto px-4 py-6">
        <h2 className=" tracking-tight text-2xl text-center font-bold text-text">
          Our Latest Products
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {products?.length > 0 &&
            products.map((product) => (
              <div className="group relative" key={product.id}>
                <div className="group block overflow-hidden border border-gray-950 rounded-xl border-opacity-10">
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
                          {product.price} EGP
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            addProduct(product._id);
                            toast.success("Item added to cart!");
                          }}
                          class="inline-flex items-center gap-1.5 rounded-lg border border-primary bg-white px-4 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-primary focus:ring focus:ring-green-100"
                        >
                          Add
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                          </svg>
                        </button>
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

import Footer from "@/components/Footer";
import { CartContext } from "@/lib/cartContext";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Link from "next/link";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function Products({ allProducts }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Products
            </h2>

            <p className="mt-4 max-w-md text-gray-500">
              Each piece is meticulously handcrafted. Discover the perfect addition to your collection or a
              unique gift for someone special.
            </p>
          </header>

          <div className="mt-8 flex items-center justify-end">

            <div>
              <label htmlFor="SortBy" className="sr-only">
                SortBy
              </label>

              <select
                id="SortBy"
                className="h-10 rounded border-gray-300 text-sm"
              >
                <option>Sort By</option>
                <option value="Title, DESC">Title, DESC</option>
                <option value="Title, ASC">Title, ASC</option>
                <option value="Price, DESC">Price, DESC</option>
                <option value="Price, ASC">Price, ASC</option>
              </select>
            </div>
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {allProducts?.length > 0 &&
              allProducts.map((product) => (
                <li key={product._id}>
                  <Link
                    href={"/products/" + product._id}
                    className="group block overflow-hidden"
                  >
                    <img
                      src={product.images[0]}
                      alt="product-img"
                      className="h-[350px] w-full object-cover rounded-lg transition duration-500 group-hover:scale-105 sm:h-[450px]"
                    />

                    <div className="relative bg-white pt-3">
                      <div className="flex justify-between">
                        <div className="flex-col">
                          <h3 className="text-sm md:text-base text-gray-700 group-hover:underline group-hover:underline-offset-4">
                            {product.title}
                          </h3>

                          <p className="mt-2">
                            <span className="sr-only"> Regular Price </span>

                            <span className="tracking-wider text-gray-900">
                              {product.price[0]} EGP
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const allProducts = await Product.find({}, null, { sort: { _id: 1 } });

  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    },
  };
}

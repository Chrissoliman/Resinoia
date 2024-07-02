import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <header>
        <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                All Products
              </h1>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-600 px-5 py-3 text-green-500 transition hover:bg-green-50 hover:text-green-700 focus:outline-none focus:ring"
                href={"/products/new"}
              >
                <span className="text-md font-medium"> Create Products </span>

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
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <hr class="my-1 h-px border-0 bg-gray-300" />

      <div className=" mx-auto max-w-screen-2xl py-6 px-4 sm:px-6 sm:py-12 lg:px-8 ">
        {products.length === 0 ? (
          <p>No Products Found</p>
        ) : (
          <div class="">
            <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Product
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Description
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Category
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Hero
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Collection
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-4 font-medium text-gray-900"
                  ></th>
                </tr>
              </thead>
              {products.map((product, index) => (
                <tbody
                  class="divide-y divide-gray-100 border-t border-gray-100"
                  key={product._id}
                >
                  <tr>
                    <th class="px-6 py-4 font-medium text-gray-900">
                      {index + 1}
                    </th>
                    <td class="px-6 py-4">{product.title}</td>
                    <td class="px-6 py-4 truncate max-w-sm ">
                      {product.description}
                    </td>
                    <td class="px-6 py-4 truncate max-w-sm ">
                      {product.category == "coaster"
                        ? "Coaster"
                        : product.category == "clock"
                        ? "Wooden Clock"
                        : product.category == "letterKeyChain"
                        ? "Letter Key Chain"
                        : ""}
                    </td>
                    <td class="px-6 py-4">{product.price[0]}</td>
                    <td class="px-6 py-4">
                      {" "}
                      {product.heroProduct == 'yes' ? (
                        <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="h-3 w-3"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          Yes
                        </span>
                      ) : (
                        <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-3 w-3"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                          No
                        </span>
                      )}
                    </td>
                    <td class="px-6 py-4">
                      {" "}
                      {product.collectionProduct == 'yes' ? (
                        <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="h-3 w-3"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          Yes
                        </span>
                      ) : (
                        <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-3 w-3"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                          No
                        </span>
                      )}
                    </td>
                    <td class="flex justify-end gap-4 px-6 py-4 font-medium">
                      <Link
                        href={"/products/delete/" + product._id}
                        className="text-red-700"
                      >
                        Delete
                      </Link>
                      <Link
                        href={"/products/edit/" + product._id}
                        class="text-green-700"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        )}
      </div>
    </>
  );
}

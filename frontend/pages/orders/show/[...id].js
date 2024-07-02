import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ShowOrder() {
  const router = useRouter();
  const { id } = router.query;

  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    console.log("idddd: ", id);
    if (!id) {
      return;
    } else {
      axios.get(`/api/orders?id=${id}`).then((res) => {
        setOrderInfo(res.data);
      });
    }
  }, []);

  console.log("orderInfo: ", orderInfo);
  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="mt-1.5 text-md text-gray-500 max-w-lg">
            Showing {orderInfo?.name} Order
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center"></div>
      </div>

      <hr class="my-8 h-px border-0 bg-gray-300" />
      <div className="md:my-10 md:mx-6">
        {orderInfo && (
          <div className="max-w-full mx-auto py-8">
            <h1 className="md:text-3xl text-xl font-bold">Order information</h1>
            <p className="text-gray-600 text-sm md:text-base">
              View all order information such as products, quantity and client
              information.
            </p>

            <div className="bg-gray-100 max-w-full p-6 rounded-lg mt-6">
              <div className="flex flex-col md:flex-row space-y-6  md:justify-between md:space-x-10 items-center">
                <div>
                  <p className="text-gray-600 font-bold">Date placed</p>
                  <p>{orderInfo.createdAt}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-bold">Order Id</p>
                  <p>{orderInfo._id}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-bold">Address</p>
                  <p>{orderInfo.address}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-bold">Email</p>
                  <p>{orderInfo.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-bold">Phone</p>
                  <p>{orderInfo.phone}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 max-w-full p-6 rounded-lg">
              <div className="flex flex-col md:flex-row space-y-6  md:justify-between md:space-x-10 items-center">
                <div>
                  <p className="text-gray-600 font-bold ">Name</p>
                  <p>{orderInfo.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-bold ">City</p>
                  <p>{orderInfo.city}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-bold ">State</p>
                  <p>{orderInfo.state}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-bold ">Zip</p>
                  <p>{orderInfo.zip}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-bold ">Status</p>
                  <p>{orderInfo.status ? 'Done' : 'Not Done'}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <table className="md:min-w-full ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-left">Product</th>
                    <th className="px-6 py-2 text-left">Price</th>
                    <th className="px-6 py-2 text-left">Size | Letter</th>
                    <th className="px-6 py-2 text-left">Quantity</th>
                    <th className="px-6 py-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderInfo?.line_items?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={item.price_data.product_data.images}
                            alt={""}
                            className="w-12 h-12 rounded mr-4"
                          />
                          <p>{item.price_data.product_data.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.price_data.product_data.size == "25 Cm"
                          ? item.price_data.product_data.price[0]
                          : item.price_data.product_data.size == "30 Cm"
                          ? item.price_data.product_data.price[1]
                          : item.price_data.product_data.size == "35 Cm"
                          ? item.price_data.product_data.price[2]
                          : item.price_data.product_data.size == "40 Cm"
                          ? item.price_data.product_data.price[3]
                          : item.price_data.product_data.price[0]} EGP
                      </td>
                      <td className="px-6 py-4">
                        {item.price_data.product_data.category == "clock"
                          ? item.price_data.product_data.size
                          : item.price_data.product_data.category == "letterKeyChain"
                          ? item.price_data.product_data.letter : "N/A"}
                      </td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">{item.notes || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link
                href={"/orders/delete/" + orderInfo._id}
                class="inline-flex items-center gap-1.5 rounded-lg mt-5 border border-red-500 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    fill="currentColor"
                    d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0Zm-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2h7.5Zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0v-10Zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1Z"
                  />
                </svg>
                Delete
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

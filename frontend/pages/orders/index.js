import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
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
                All Orders
              </h1>
            </div>
          </div>
        </div>
      </header>

      <hr class="my-1 h-px border-0 bg-gray-300" />

      <div className=" mx-auto max-w-screen-2xl py-6 px-4 sm:px-6 sm:py-12 lg:px-8 ">
        {orders.length === 0 ? (
          <p>No Orders Found</p>
        ) : (
          <div class="">
            <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Order
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Address
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Notes
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Ordered at
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Phone
                  </th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-4 font-medium text-gray-900"
                  ></th>
                </tr>
              </thead>
              {orders.map((order, index) => (
                <tbody
                  class="divide-y divide-gray-100 border-t border-gray-100"
                  key={order._id}
                >
                  <tr>
                    <th class="px-6 py-4 font-medium text-gray-900">
                      {index + 1}
                    </th>
                    <td class="px-6 py-4">{order.name}</td>
                    <td class="px-6 py-4 truncate max-w-sm ">
                      {order.address}
                    </td>
                    <td class="px-6 py-4">{order.name}</td>
                    <td class="px-6 py-4">{order.createdAt}</td>
                    <td class="px-6 py-4">{order.phone}</td>
                    <td class="px-6 py-4">
                      {" "}
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
                        Done
                      </span>
                    </td>
                    <td class="flex justify-end gap-4 px-6 py-4 font-medium">
                      <Link
                        href={"/orders/show/" + order._id}
                        class="text-blue-700"
                      >
                        View
                      </Link>
                      <Link
                        href={"/orders/delete/" + order._id}
                        className="text-green-700"
                      >
                        Done
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

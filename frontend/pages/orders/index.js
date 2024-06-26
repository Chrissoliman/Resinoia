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
                    Paid
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
                    <td class="px-6 py-4">
                      {order.paid == false ? "No" : "Yes"}
                    </td>
                    <td class="flex justify-end gap-4 px-6 py-4 font-medium">
                      <Link
                        href={"/orders/show/" + order._id}
                        class="text-green-700"
                      >
                        View
                      </Link>
                      <Link
                        href={"/orders/delete/" + order._id}
                        className="text-red-700"
                      >
                        Cancel
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

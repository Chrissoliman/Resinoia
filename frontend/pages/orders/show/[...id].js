import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ShowOrder() {
  const router = useRouter();
  const { id } = router.query;

  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    console.log('idddd: ', id);
    if (!id) {
      return;
    } else {
      axios.get(`/api/orders?id=${id}`).then(res => {
        setOrderInfo(res.data);
      });
    }
  }, []);


  console.log('orderInfo: ', orderInfo)
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
            <p className="text-gray-600 text-sm md:text-base">View all order information such as products, quantity and client information.</p>
      
            <div className="bg-gray-100 max-w-full p-6 rounded-lg mt-6">
              <div className="flex flex-col md:flex-row space-y-6  md:justify-between md:space-x-10 items-center">
                <div>
                  <p className="text-gray-600">Date placed</p>
                  <p>{orderInfo.createdAt}</p>
                </div>
                <div>
                  <p className="text-gray-600">Order number</p>
                  <p>{orderInfo._id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Address</p>
                  <p>{orderInfo.address}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p>{orderInfo.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p>{orderInfo.phone}</p>
                </div>
              </div>
            </div>
      
            <div className="mt-8">
              <table className="md:min-w-full ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-left">Product</th>
                    <th className="px-6 py-2 text-left">Price</th>
                    <th className="px-6 py-2 text-left">Size</th>
                    <th className="px-6 py-2 text-left">Quantity</th>
                    <th className="px-6 py-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderInfo?.line_items?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img src={item.price_data.product_data.images} alt={''} className="w-12 h-12 rounded mr-4"/>
                          <p>{item.price_data.product_data.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">{item.price_data.product_data.price} EGP</td>
                      <td className="px-6 py-4">{item.size || 'N/A'}</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">
                        {item.notes || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
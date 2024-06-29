import Success from "@/components/Success";
import { CartContext } from "@/lib/cartContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cartProducts } = useContext(CartContext);

  const { data: session } = useSession();

  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [name, setName] = useState(session?.user?.name || "");
  const [phone, setPhone] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post("/api/cart", { ids: cartProducts.map((item) => item.productId) })
        .then((response) => {
          setProducts(response.data);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  let total = 0;

  for (const { productId, quantity, letter, size } of cartProducts) {
    const product = products.find((p) => p._id === productId);
    const price = product ? product.price : 0;
    total += price * quantity;
  }

  async function stripeCheckout() {
    const response = await axios.post("/api/checkout", {
      email: session.user.email,
      name: session.user.name,
      address,
      phone,
      zip,
      city,
      cartProducts,
    });

    if (response.data.url) {
      setIsSuccess(true)
    } else {
      toast.error("An error occurred!!");
    }
  }

  if (isSuccess) {
    return (
      <>
        <Success />
      </>
    );
  }

  console.log("products", total);

  return (
    <>
      <div className="font-[sans-serif] bg-white">
        <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
          <div className="bg-gradient-to-r from-primary/60 via-primary/80 to-primary sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
            <div className="relative h-full">
              <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                <div className="space-y-4">
                  {products?.length > 0 &&
                    products.map((product) => {
                      const cartItem = cartProducts.find(
                        (item) => item.productId === product._id
                      );
                      const { letter, size, quantity } = cartItem || {};
                      return (
                        <div
                          className="flex items-start gap-4"
                          key={product._id}
                        >
                          <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-primary/100 shadow-md shadow-gray-700 rounded-md">
                            <img
                              src={product.images[0]}
                              className="w-full object-contain"
                            />
                          </div>
                          <div className="w-full">
                            <h3 className="text-base text-text">
                              {product.title}
                            </h3>
                            <ul className="text-xs text-gray-800 space-y-2 mt-2">
                              {product.category == "clock" && (
                                <li className="flex flex-wrap gap-4">
                                  Size <span className="ml-auto">{size}</span>
                                </li>
                              )}
                              {product.category == "letterKeyChain" && (
                                <li className="flex flex-wrap gap-4">
                                  Letter{" "}
                                  <span className="ml-auto">{letter}</span>
                                </li>
                              )}
                              <li className="flex flex-wrap gap-4">
                                Quantity{" "}
                                <span className="ml-auto">{quantity}</span>
                              </li>
                              <li className="flex flex-wrap gap-4">
                                Total Price{" "}
                                <span className="ml-auto">
                                  {quantity * product.price[0]} EGP
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="md:absolute md:left-0 md:bottom-0 bg-primary w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-base text-text">
                  Total <span className="ml-auto">{total} EGP</span>
                </h4>
              </div>
            </div>
          </div>

          <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
            <h2 className="text-2xl font-bold text-gray-800">
              Complete your order
            </h2>
            <form className="mt-8">
              <div>
                <h3 className="text-base font-bold text-gray-800 mb-4">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="px-4 py-3 bg-gray-50 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="px-4 py-3 bg-gray-50 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="px-4 py-3 bg-gray-50 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-base font-bold text-gray-800 mb-4">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="1864 Main Street"
                      className="px-4 py-3 bg-gray-50 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      className="px-4 py-3 bg-gray-50 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="State"
                      className="px-4 py-3 bg-gray-50 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={state}
                      onChange={(event) => setState(event.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Zip Code"
                      className="px-4 py-3 bg-gray-50 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={zip}
                      onChange={(event) => setZip(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4 max-md:flex-col mt-8">
                  <button
                    type="button"
                    className="rounded-md px-6 py-3 w-full text-sm md:text-base tracking-wide bg-green-600 hover:bg-green-700 text-white"
                    onClick={stripeCheckout}
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

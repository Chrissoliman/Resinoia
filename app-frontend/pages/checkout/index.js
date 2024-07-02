import Success from "@/components/Success";
import { CartContext } from "@/lib/cartContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cartProducts, clearCart } = useContext(CartContext);
  const { data: session } = useSession();

  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [name, setName] = useState(session?.user?.name || "");
  const [phone, setPhone] = useState("");
  const [shipping, setShipping] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation states
  const [errors, setErrors] = useState({});

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
    let price = 0;
    if (product?.category == "clock") {
      price =
        size == "25 Cm"
          ? product.price[0]
          : size == "30 Cm"
          ? product.price[1]
          : size == "35 Cm"
          ? product.price[2]
          : size == "40 Cm"
          ? product.price[3]
          : product.price[0];
    } else {
      price = product ? product.price[0] : 0;
    }
    total = total + price * quantity;
  }

  function changingCity(event) {
    setCalculating(false);
    setCity(event.target.value);

    if (event.target.value == "Alexandria") {
      setShipping(35);
    } else if (event.target.value == "Cairo") {
      setShipping(60);
    } else if (
      event.target.value == "Sharqia" ||
      event.target.value == "Gharbia" ||
      event.target.value == "Monufia" ||
      event.target.value == "Damietta" ||
      event.target.value == "Kafr El Sheikh" ||
      event.target.value == "Dakahlia" ||
      event.target.value == "Qalyubia" ||
      event.target.value == "Ismailia" ||
      event.target.value == "Suez" ||
      event.target.value == "Port Said"
    ) {
      setShipping(70);
    } else if (
      event.target.value == "Faiyum" ||
      event.target.value == "Beni Suef" ||
      event.target.value == "Asyut" ||
      event.target.value == "Minya" ||
      event.target.value == "Sohag"
    ) {
      setShipping(90);
    } else if (
      event.target.value == "Red Sea" ||
      event.target.value == "Qena" ||
      event.target.value == "Luxor" ||
      event.target.value == "Aswan"
    ) {
      setShipping(100);
    }
    setCalculating(true);
  }

  function validateForm() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function stripeCheckout() {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const response = await axios.post("/api/checkout", {
      email: session.user.email,
      name: session.user.name,
      address,
      phone,
      zip,
      city,
      state,
      cartProducts,
    });

    clearCart()

    if (response.data.url) {
      setIsSuccess(true);
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

  return (
    <>
      <div className="font-[sans-serif] bg-white">
        <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
          <div className="bg-gradient-to-r from-primary/60 via-primary/80 to-primary sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
            <div className="relative h-full">
              <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                <div className="space-y-4">
                  {products?.length > 0 &&
                    cartProducts.map((product) => {
                      const cartItem = products.find(
                        (item) => item._id === product.productId
                      );
                      const { letter, size, quantity } = product || {};

                      return (
                        <div
                          className="flex items-start gap-4"
                          key={product._id}
                        >
                          <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-primary/100 shadow-md shadow-gray-700 rounded-md">
                            <img
                              src={cartItem.images[0]}
                              className="w-full object-contain"
                            />
                          </div>
                          <div className="w-full">
                            <h3 className="text-base text-text">
                              {cartItem.title}
                            </h3>
                            <ul className="text-xs text-gray-800 space-y-2 mt-2">
                              {cartItem.category == "clock" && (
                                <li className="flex flex-wrap gap-4">
                                  Size <span className="ml-auto">{size}</span>
                                </li>
                              )}
                              {cartItem.category == "letterKeyChain" && (
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
                                  {size == "25 Cm"
                                    ? cartItem.price[0] * quantity
                                    : size == "30 Cm"
                                    ? cartItem.price[1] * quantity
                                    : size == "35 Cm"
                                    ? cartItem.price[2] * quantity
                                    : size == "40 Cm"
                                    ? cartItem.price[3] * quantity
                                    : cartItem.price[0] * quantity}{" "}
                                  EGP
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
                <h3 className="flex flex-wrap gap-4 text-base text-text">
                  Shipping{" "}
                  <span className="ml-auto">
                    {calculating ? `${shipping} EGP` : "Calculating..."}
                  </span>
                </h3>
                <h4 className="flex flex-wrap gap-4 text-base text-text">
                  Total <span className="ml-auto">{total + shipping} EGP</span>
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
                      className="px-4 py-3 border-2 border-gray-200 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                    {errors.name && name == ''  && (
                      <p className="text-red-500 text-xs mt-1 font-bold">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="px-4 py-3  border-2 border-gray-200 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    {errors.email && email == ''  && (
                      <p className="text-red-500 text-xs mt-1 font-bold">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="px-4 py-3  border-2 border-gray-200 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                    {errors.phone && phone == ''  && (
                      <p className="text-red-500 text-xs mt-1 font-bold">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-base font-bold text-gray-800 mb-1">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="1864 Main Street"
                      className="mt-6 px-4 py-3  border-2 border-gray-200 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                    {errors.address && address == ''  && (
                      <p className="text-red-500 text-xs mt-1 font-bold">{errors.address}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="example2"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Governorate
                    </label>
                    <select
                      id="example2"
                      className="px-4 py-3  border-2 border-gray-200 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={city}
                      onChange={changingCity}
                    >
                      <option value="">Please Select</option>
                      <option value="Alexandria">Alexandria</option>
                      <option value="Aswan">Aswan</option>
                      <option value="Asyut">Asyut</option>
                      <option value="Beni Suef">Beni Suef</option>
                      <option value="Cairo">Cairo</option>
                      <option value="Dakahlia">Dakahlia</option>
                      <option value="Damietta">Damietta</option>
                      <option value="Faiyum">Faiyum</option>
                      <option value="Gharbia">Gharbia</option>
                      <option value="Ismailia">Ismailia</option>
                      <option value="Kafr El Sheikh">Kafr El Sheikh</option>
                      <option value="Luxor">Luxor</option>
                      <option value="Minya">Minya</option>
                      <option value="Monufia">Monufia</option>
                      <option value="Port Said">Port Said</option>
                      <option value="Qalyubia">Qalyubia</option>
                      <option value="Qena">Qena</option>
                      <option value="Red Sea">Red Sea</option>
                      <option value="Sharqia">Sharqia</option>
                      <option value="Sohag">Sohag</option>
                      <option value="Suez">Suez</option>
                    </select>
                    {errors.city && city == ''  && (
                      <p className="text-red-500 text-xs mt-1 font-bold">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="State"
                      className="px-4 py-3  border-2 border-gray-200 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={state}
                      onChange={(event) => setState(event.target.value)}
                    />
                    {errors.state && state == '' && (
                      <p className="text-red-500 text-xs mt-1 font-bold">{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Zip Code (Optional)"
                      className="px-4 py-3  border-2 border-gray-200 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary"
                      value={zip}
                      onChange={(event) => setZip(event.target.value)}
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

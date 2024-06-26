import Success from "@/components/Success";
import { CartContext } from "@/lib/cartContext";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Cart() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);

  const { data: session } = useSession();

  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState(session.user?.email || '');
  const [name, setName] = useState(session.user?.name || '');
  const [phone, setPhone] = useState("");

  const [isSuccess, setIsSuccess] = useState(false)


  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function increaseProduct(id) {
    addProduct(id);
  }

  function decreaseProduct(id) {
    removeProduct(id);
    toast.success("Removed product!!");
  }

  function deleteCart(id) {
    clearCart();
    toast.success("Cart cleared!");
  }

  let total = 0;

  for (const productId of cartProducts) {
    const price = parseFloat(
      products.find((product) => product._id === productId)?.price || 0
    );

    total += price;
  }

  async function stripeCheckout() {
    const response = await axios.post('/api/checkout', {
      email: session.user.email, name: session.user.name, address, phone, zip, city, cartProducts
    });

    if (response.data.url) {
      window.location = response.data.url
    } else {
      toast.error('An error occured!!')
    }
  }

  if (isSuccess) {
    return <>
      <Success />
    </>
  }


  if (session) {
    return (
      <>
        <section className="flex justify-between space-x-4 max-md:flex-col ">
          <div className="md:w-2/3 px-4">
            <div className="md:mt-6 mt-16">
              <header className="flex text-center justify-between w-full">
                <h1 className="font-bold text-xl text-gray-900 sm:text-3xl">
                  Your Cart
                </h1>
              </header>
              {!products?.length ? (
                <p className="my-6 text-center ">Your cart is empty</p>
              ) : (
                <>
                  {products?.length > 0 &&
                    products.map((product) => (
                      <div className="mt-8" key={product._id}>
                        <ul className="space-y-4">
                          <li className="flex items-center gap-4 justify-between">
                            <img
                              src={product.images[0]}
                              alt="cart-image"
                              className="h-16 w-16 object-cover"
                            />

                            <div>
                              <h3 className="text-md text-text max-w-md">
                                {product.title}
                              </h3>
                              <dl className="mt-1 space-y-px text-sm text-text">
                                <p>
                                  {cartProducts.filter(
                                    (id) => id === product._id
                                  ).length * product.price}{" "}
                                  EGP
                                </p>
                              </dl>
                            </div>

                            <div>
                              <label htmlFor="Quantity" className="sr-only">
                                Quantity
                              </label>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border "
                                  onClick={() => decreaseProduct(product._id)}
                                >
                                  -
                                </button>

                                <input
                                  type="number"
                                  id="Quantity"
                                  value={
                                    cartProducts.filter(
                                      (id) => id === product._id
                                    ).length
                                  }
                                  className="h-10 w-16 rounded border border-secondary text-primary font-bold text-center [-moz-appearance:_textfield] sm:text-md [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                />

                                <button
                                  type="button"
                                  className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border"
                                  onClick={() => increaseProduct(product._id)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    ))}
                </>
              )}

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className=" max-w-md space-y-4">
                  <dl className="space-y-0.5 text-md text-gray-700">
                    <div className="flex justify-end text-red-400 border-b mb-3">
                      <button onClick={deleteCart}>Clear Cart</button>
                    </div>
                    <div className="flex justify-between">
                      <dt>Total </dt>
                      <dd> {total} EGP</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <Link
                      className="inline-flex items-center gap-2 rounded border border-primary bg-primary px-8 py-3 text-white hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-primary"
                      href="/"
                    >
                      <span className="text-sm font-medium">
                        {" "}
                        Continue Shopping{" "}
                      </span>

                      <svg
                        className="size-5 rtl:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!products?.length ? (
            ""
          ) : (
            <div className="md:w-1/3 md:mt-6 mt-16">
              <header className="flex text-center justify-between w-full">
                <h1 className="font-bold text-xl text-gray-900 sm:text-3xl">
                  Shipping Details
                </h1>
                <p className="text-base text-gray-600 sm:text-xl"></p>
              </header>{" "}
              <div class="mx-auto my-4 max-w-xl p-4 border shadow-lg h-[400px]">
                <div class="space-y-5">
                  <div class="grid grid-cols-12 gap-5">
                    <div class="col-span-6">
                      <label
                        for="example7"
                        class="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="example7"
                        class="block w-full p-2 border rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div class="col-span-6">
                      <label
                        for="example8"
                        class="mb-1 block text-md font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="example8"
                        class="block w-full p-2 border rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>
                    <div class="col-span-12">
                      <label
                        for="example9"
                        class="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="example9"
                        class="block w-full p-2 border rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="1864 Main Street"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                      />
                    </div>
                    <div class="col-span-6">
                      <label
                        for="example10"
                        class="mb-1 block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="example10"
                        class="block w-full p-2 border rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                      />
                    </div>
                    <div class="col-span-3">
                      <label
                        for="example11"
                        class="mb-1 block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="example12"
                        class="block w-full p-2 border rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                      />
                    </div>
                    <div class="col-span-3">
                      <label
                        for="example12"
                        class="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Zip
                      </label>
                      <input
                        type="text"
                        id="example12"
                        class="block w-full p-2 border rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={zip}
                        onChange={(event) => setZip(event.target.value)}
                      />
                    </div>
                    <div class="col-span-3">
                      <label
                        for="example12"
                        class="mb-1 block text-sm font-medium text-gray-700"
                      >
                        phone
                      </label>
                      <input
                        type="text"
                        id="example12"
                        class="block w-full p-2 border rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </div>
                    <div class="col-span-12  text-center">
                      <button onClick={stripeCheckout} className="block w-full rounded border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </>
    );
  }

  return (
    <>
      <div className="grid h-screen px-4 bg-white place-content-center">
        <div className="text-center">
          <p className="mt-4 text-text text-2xl">
            You should sign up to view cart
          </p>
          <button
            className="inline-block rounded border border-primary bg-primary px-6 py-4 text-sm font-medium text-white hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-primary"
            onClick={() => signIn('google')}
          >
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
}

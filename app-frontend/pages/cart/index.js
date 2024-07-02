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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function increaseProduct(productId, letter = "", size = "", notes = "") {
    addProduct(productId, letter, size, notes);
  }

  function decreaseProduct(productId, letter = "", size = "", notes = "") {
    removeProduct(productId, letter, size, notes);
  }

  function deleteCart(id) {
    clearCart();
    toast.success("Cart cleared!");
  }

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
      window.location = response.data.url;
    } else {
      toast.error("An error occured!!");
    }
  }

  if (isSuccess) {
    return (
      <>
        <Success />
      </>
    );
  }

  console.log("Cart info: ", cartProducts);
  console.log("products info: ", products);

  if (session) {
    return (
      <>
        <section className="flex justify-between space-x-4 max-md:flex-col ">
          <div className="md:w-2/3 mx-auto px-4">
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
                    cartProducts.map((product) => {
                      const cartItem = products.find(
                        (item) => item._id === product.productId
                      );
                      const { letter, size, quantity, notes } = product || {};

                      console.log("specs: ", product);

                      return (
                        <div
                          className="mt-8"
                          key={`${product.productId}-${letter}-${size}-${notes}`}
                        >
                          <ul className="space-y-4">
                            <li className="flex items-center gap-4 justify-between">
                              <img
                                src={cartItem.images[0]}
                                alt="cart-image"
                                className="h-16 w-16 object-cover"
                              />

                              <div>
                                <h3 className="text-md text-text max-w-md">
                                  {cartItem.title}
                                </h3>
                                <dl className="mt-1 space-y-px text-sm text-text">
                                  <p>{quantity * cartItem.price[0]} EGP</p>
                                </dl>
                              </div>

                              {cartItem.category == "clock" && (
                                <div>
                                  <h3 className="text-md text-text max-w-md">
                                    Size
                                  </h3>
                                  <dl className="mt-1 space-y-px text-sm text-text">
                                    <p>
                                      <p>{size}</p>
                                    </p>
                                  </dl>
                                </div>
                              )}

                              {cartItem.category == "letterKeyChain" && (
                                <div>
                                  <h3 className="text-md text-text max-w-md">
                                    Letter
                                  </h3>
                                  <dl className="mt-1 space-y-px text-sm text-text">
                                    <p>
                                      <p>{letter}</p>
                                    </p>
                                  </dl>
                                </div>
                              )}

                              <div>
                                <label htmlFor="Quantity" className="sr-only">
                                  Quantity
                                </label>

                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border "
                                    onClick={() =>
                                      decreaseProduct(
                                        cartItem._id,
                                        letter,
                                        size,
                                        notes
                                      )
                                    }
                                  >
                                    -
                                  </button>

                                  <input
                                    type="number"
                                    id="Quantity"
                                    value={quantity}
                                    className="h-10 w-16 rounded border border-secondary text-primary font-bold text-center [-moz-appearance:_textfield] sm:text-md [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                  />

                                  <button
                                    type="button"
                                    className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border"
                                    onClick={() =>
                                      increaseProduct(
                                        cartItem._id,
                                        letter,
                                        size,
                                        notes
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      );
                    })}
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

                  <div className="flex justify-between space-x-2">
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
                    <Link
                      className="inline-block rounded border border-green-600 px-12 py-3 text-sm font-medium text-green-600 hover:bg-green-600 hover:text-white focus:outline-none focus:ring active:bg-green-500"
                      href="/checkout"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            onClick={() => signIn("google")}
          >
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
}

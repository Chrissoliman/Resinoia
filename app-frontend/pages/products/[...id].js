import { CartContext } from "@/lib/cartContext";
import { Product } from "@/models/Product";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function ProductPage({ product }) {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [letter, setLetter] = useState('');

  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);

  function changeMainImage(image) {
    setMainImage(image);
  }

  function addToCart() {
    let i = 0;

    while (i < quantity) {
      addProduct(product._id, letter, size);
      i++;
    }
    toast.success("Items added to cart!");
  }

  function decreaseQuantity() {
    setQuantity((prev) => prev - 1);
  }

  function increaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  return (
    <>
      <div className="mx-auto md:my-4 my-2 min-h-full">
        <div className="flex flex-col md:flex-row lg:space-x-20 px-4 md:py-6 py-3">
          <div className="flex flex-col lg:ml-16 px-4 py-6">
            <div className="flex overflow-hidden h-[300px] w-[300px] md:h-[600px] md:w-[600px] ">
              <img
                src={mainImage}
                alt="main-img"
                className="h-full w-full object-contain rounded-lg"
              />
            </div>
            <div className="flex flex-row mt-3 space-x-5 rounded-lg">
              {product.images.map((image, index) => (
                <button onClick={() => changeMainImage(image)}>
                  <img
                    key={index}
                    src={image}
                    className={`md:h-32 md:w-32 h-20 w-20 rounded-md cursor-pointer ${
                      mainImage === image ? "border-4 border-gray-700" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="max-w-full px-4 py-6">
            <h2 className="md:text-3xl text-2xl text-text font-bold tracking-wide">
              {product.title}
            </h2>

            <h3 className="text-primary my-4 font-bold md:text-2xl text-xl">
              {product.price[0]} EGP
            </h3>

            <p className="text-gray-900 my-4 max-w-lg">{product.description}</p>

            {product.category == "letterKeyChain" && (
              <div>
                <label
                  htmlFor="HeadlineAct"
                  className="block md:text-base text-sm font-bold text-gray-900"
                >
                  {" "}
                  Choose Letter{" "}
                </label>

                <select
                  name="HeadlineAct"
                  id="HeadlineAct"
                  onChange={(event) => setLetter(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border-2 border-black/10 text-gray-700 sm:text-sm"
                >
                  <option value="">Please select</option>
                  <option value="a">A</option>
                  <option value="b">B</option>
                  <option value="c">C</option>
                  <option value="d">D</option>
                  <option value="e">E</option>
                  <option value="f">F</option>
                  <option value="g">G</option>
                  <option value="h">H</option>
                  <option value="i">I</option>
                  <option value="j">J</option>
                  <option value="k">K</option>
                  <option value="l">L</option>
                  <option value="m">M</option>
                  <option value="n">N</option>
                  <option value="o">O</option>
                  <option value="p">P</option>
                  <option value="q">Q</option>
                  <option value="r">R</option>
                  <option value="s">S</option>
                  <option value="t">T</option>
                  <option value="u">U</option>
                  <option value="v">V</option>
                  <option value="w">W</option>
                  <option value="x">X</option>
                  <option value="y">Y</option>
                  <option value="z">Z</option>
                </select>
              </div>
            )}

            {product.category == "clock" && (
              <>
                <label
                  htmlFor="HeadlineAct"
                  className="block md:text-base my-4 text-sm font-bold text-gray-900"
                >
                  {" "}
                  Select Size{" "}
                </label>
                <fieldset className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="25 Cm"
                      className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                    >
                      <div>
                        <p className="text-gray-700">25 Cm</p>

                        <p className="mt-1 text-gray-900">
                          {product.price[0]
                            ? `${product.price[0]} EGP`
                            : "Not Available"}
                        </p>
                      </div>

                      <input
                        type="radio"
                        name="DeliveryOption"
                        value='25 Cm'
                        id="25 Cm"
                        className="sr-only"
                        disabled={product.price[0] == ''}
                        checked={size == '25 Cm'}
                        onChange={(event) => setSize('25 Cm')}
                      />
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="30 Cm"
                      className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                    >
                      <div>
                        <p className="text-gray-700">30 Cm</p>

                        <p className="mt-1 text-gray-900">
                          {product.price[1]
                            ? `${product.price[1]} EGP`
                            : "Not Available"}
                        </p>
                      </div>

                      <input
                        type="radio"
                        name="DeliveryOption"
                        value='30 Cm'
                        id='30 Cm'
                        className="sr-only"
                        disabled={product.price[1] == ''}
                        checked={size == '30 Cm'}
                        onChange={() => setSize('30 Cm')}
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="35 Cm"
                      className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                    >
                      <div>
                        <p className="text-gray-700">35 Cm</p>

                        <p className="mt-1 text-gray-900">
                          {product.price[2]
                            ? `${product.price[2]} EGP`
                            : "Not Available"}
                        </p>
                      </div>

                      <input
                        type="radio"
                        name="DeliveryOption"
                        value='35 Cm'
                        id='35 Cm'
                        className="sr-only"
                        disabled={product.price[2] == ''}
                        checked={size == '35 Cm'}
                        onChange={() => setSize('35 Cm')}
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="40 Cm"
                      className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                    >
                      <div>
                        <p className="text-gray-700">40 Cm</p>

                        <p className="mt-1 text-gray-900">
                          {product.price[3]
                            ? `${product.price[3]} EGP`
                            : "Not Available"}
                        </p>
                      </div>

                      <input
                        type="radio"
                        name="DeliveryOption"
                        value='40 Cm'
                        id='40 Cm'
                        className="sr-only"
                        disabled={product.price[3] == ''}
                        checked={size == '40 Cm'}
                        onChange={() => setSize('40 Cm')}
                      />
                    </label>
                  </div>
                </fieldset>
              </>
            )}

            <div className="my-4 md:mt-12">
              <div className="flex justify-between rounded border border-gray-200">
                <button
                  type="button"
                  className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                  onClick={decreaseQuantity}
                >
                  &minus;
                </button>

                <input
                  type="number"
                  id="Quantity"
                  value={quantity}
                  className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />

                <button
                  type="button"
                  className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                  onClick={increaseQuantity}
                >
                  &#43;
                </button>
              </div>
            </div>

            <button
              onClick={addToCart}
              className="rounded-lg border w-full border-primary bg-primary px-5 py-2.5 text-center text-md font-medium text-white shadow-sm transition-all hover:border-secondary hover:bg-secondary "
            >
              Add to cart
            </button>

            <div class="mx-auto max-w-lg my-8">
              <div class="divide-y divide-gray-100">
                <details class="group">
                  <summary class="flex cursor-pointer list-none items-center justify-between py-4 md:text-lg text-base font-sm text-gray-900 group-open:text-black group-open:font-bold">
                    Items Details
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="block h-5 w-5 group-open:hidden"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="hidden h-5 w-5 group-open:block"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 12h-15"
                        />
                      </svg>
                    </div>
                  </summary>
                  <div class="pb-4 text-sm md:text-base text-secondary-500">
                    Tarshhhh
                  </div>
                </details>
                <details class="group">
                  <summary class="flex cursor-pointer list-none items-center justify-between py-4 md:text-lg text-base font-sm text-gray-900 group-open:text-black group-open:font-bold">
                    Shipping & Delivery
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="block h-5 w-5 group-open:hidden"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="hidden h-5 w-5 group-open:block"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 12h-15"
                        />
                      </svg>
                    </div>
                  </summary>
                  <div class="pb-4 text-sm md:text-base text-secondary-500">
                    Gamadan
                  </div>
                </details>
                <details class="group">
                  <summary class="flex cursor-pointer list-none items-center justify-between py-4 md:text-lg text-base font-sm text-gray-900 group-open:text-black group-open:font-bold">
                    Return Policy
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="block h-5 w-5 group-open:hidden"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="hidden h-5 w-5 group-open:block"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 12h-15"
                        />
                      </svg>
                    </div>
                  </summary>
                  <div class="pb-4 text-sm md:text-base text-secondary-500">
                    fokak msh benraga3 7aga
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

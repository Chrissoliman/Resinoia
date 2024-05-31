import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Product() {
    const [redirect, setRedirect] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [images, setImages] = useState([])

    const router = useRouter()


    async function createProduct(event) {
        event.preventDefault()

        const data = {title, description, price}
        await axios.post('/api/products', data)

        setRedirect(true)
    }

    if(redirect) {
        router.push('/products')
    }

  return (
    <>
      <form onSubmit={createProduct} className=" mx-auto max-w-screen-sm ">
        <div class="mx-auto my-4">
          <div>
            <label
              for="example1"
              class="mb-1 block text-lg font-medium text-gray-700 py-2"
            >
              Title
            </label>
            <input
              type="text"
              id="example1"
              class="block w-full rounded-md border-gray-300 shadow-sm border focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3"
              placeholder="Enter product title"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </div>
        </div>

        <div class="mx-auto my-4">
          <div>
            <label
              for="example1"
              class="mb-1 block text-lg font-medium text-gray-700 py-2"
            >
              Select Category
            </label>

            <select
              id="example1"
              class="block w-full rounded-md border-gray-300 shadow-sm border focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3"
            >
              <option value="">No category selected</option>
              <option value="">Option02</option>
              <option value="">Option03</option>
            </select>
          </div>
        </div>

        <div class="mx-auto my-4">
          <div class="mx-auto">
          <label
              for="example1"
              class="mb-1 block text-lg font-medium text-gray-700 py-2"
            >
              Images
            </label>
            <label class="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-blue-200 p-6 transition-all hover:border-primary-300">
              <div class="space-y-1 text-center">
                <div class="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6 text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </div>
                <div class="text-gray-600">
                  <a
                    href="#"
                    class="font-medium text-primary-500 hover:text-primary-700"
                  >
                    Click to upload
                  </a>{" "}
                  or drag and drop
                </div>
                <p class="text-sm text-gray-500">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
              <input id="example5" type="file" class="sr-only" />
            </label>
          </div>
        </div>

        <div class="mx-auto my-4">
          <div>
            <label
              for="example1"
              class="mb-1 block text-lg font-medium text-gray-700 py-2"
            >
              Description
            </label>
            <textarea
              rows={5}
              class="block w-full rounded-md border-gray-300 shadow-sm border focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3"
              placeholder="Enter product description"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </div>
        </div>

        <div class="mx-auto my-4">
          <div>
            <label
              for="example1"
              class="mb-1 block text-lg font-medium text-gray-700 py-2"
            >
              Price
            </label>
            <input
              type="number"
              id="example1"
              class="block w-full rounded-md border-gray-300 shadow-sm border focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3"
              placeholder="Enter product price"
              value={price}
              onChange={event => setPrice(event.target.value)}
            />
          </div>
        </div>

        <div class="mx-auto my-4">
          <button
            className="inline-block rounded bg-green-600 px-8 py-3 text-sm font-medium w-full text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-green-500"
            type="submit"
          >
            Save Product
          </button>
        </div>
      </form>
    </>
  );
}

import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import toast from "react-hot-toast";

export default function Product({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  heroProduct: existingHeroProduct,
  collectionProduct: existingCollectionProduct,
}) {
  const [redirect, setRedirect] = useState(false);

  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || Array(4).fill(''));
  const [images, setImages] = useState(existingImages || []);
  const [category, setCategory] = useState(existingCategory || "");
  const [heroProduct, setHeroProduct] = useState(existingHeroProduct || "");
  const [collectionProduct, setCollectionProduct] = useState(existingCollectionProduct || "");
  const [isuploading, setIsUploading] = useState(false);

  console.log("Prices: ", price);

  const uploadImagesQueue = [];

  const router = useRouter();

  async function createProduct(event) {
    event.preventDefault();

    if (isuploading) {
      await Promise.all(uploadImagesQueue);
    }

    const flatImages = images.flat();
    const data = {
      title,
      description,
      price,
      images: flatImages,
      category,
      heroProduct,
      collectionProduct,
    };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
      toast.success("Product Updated!");
    } else {
      await axios.post("/api/products", data);
      toast.success("Product Created!");
    }

    setRedirect(true);
  }

  async function uploadImage(event) {
    const files = event.target?.files;

    if (files?.length > 0) {
      setIsUploading(true);
      for (const file of files) {
        const data = new FormData();

        data.append("file", file);

        uploadImagesQueue.push(
          axios.post("/api/upload", data).then((res) => {
            setImages((oldImage) => [...oldImage, res.data.links]);
          })
        );
      }

      await Promise.all(uploadImagesQueue);
      console.log("images: ", images);
      setIsUploading(false);
    } else {
      return "error has occured";
    }
  }

  if (redirect) {
    router.push("/products");
    return null;
  }

  function uploadImageOrder(images) {
    setImages(images);
  }

  function handleDeleteImage(index) {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  }

  const handlePriceChange = (index, value) => {
    setPrice((oldPrice) => {
      const newPrice = [...oldPrice];
      newPrice[index] = value;
      return newPrice;
    });
  };

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
              class="block w-full rounded-md border-gray-300 shadow-sm border   p-3"
              placeholder="Enter product title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
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
              class="block w-full rounded-md border-gray-300 shadow-sm border   p-3"
              onChange={(event) => setCategory(event.target.value)}
              value={category}
            >
              <option value="">No category selected</option>
              <option value="coaster">Coaster</option>
              <option value="letterKeyChain">Letter Key Chain</option>
              <option value="clock">Wooden Clock</option>
            </select>

            {category == "clock" && (
              <div className="flex justify-between space-x-4 my-4">
                <div className="flex-col">
                  <label
                    for="example1"
                    class="mb-1 block text-lg font-medium text-gray-700 py-2"
                  >
                    25 Cm
                  </label>
                  <input
                    type="text"
                    id="example1"
                    class=" w-24 rounded-md border-gray-300 shadow-sm border   p-3"
                    placeholder="price"
                    value={price[0]}
                    onChange={(event) =>
                      handlePriceChange(0, event.target.value)
                    }
                  />
                </div>
                <div className="flex-col">
                  <label
                    for="example1"
                    class="mb-1 block text-lg font-medium text-gray-700 py-2"
                  >
                    30 Cm
                  </label>
                  <input
                    type="text"
                    id="example1"
                    class=" w-24 rounded-md border-gray-300 shadow-sm border   p-3"
                    placeholder="price"
                    value={price[1]}
                    onChange={(event) =>
                      handlePriceChange(1, event.target.value)
                    }
                  />
                </div>
                <div className="flex-col">
                  <label
                    for="example1"
                    class="mb-1 block text-lg font-medium text-gray-700 py-2"
                  >
                    35 Cm
                  </label>
                  <input
                    type="text"
                    id="example1"
                    class=" w-24 rounded-md border-gray-300 shadow-sm border   p-3"
                    placeholder="price"
                    value={price[2]}
                    onChange={(event) =>
                      handlePriceChange(2, event.target.value)
                    }
                  />
                </div>
                <div className="flex-col">
                  <label
                    for="example1"
                    class="mb-1 block text-lg font-medium text-gray-700 py-2"
                  >
                    40 Cm
                  </label>
                  <input
                    type="text"
                    id="example1"
                    class=" w-24 rounded-md border-gray-300 shadow-sm border   p-3"
                    placeholder="price"
                    value={price[3]}
                    onChange={(event) =>
                      handlePriceChange(3, event.target.value)
                    }
                  />
                </div>
              </div>
            )}
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
              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={uploadImage}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center rounded">
          {isuploading && (
            <Spinner className=" p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>

        {!isuploading && (
          <div className=" grid grid-cols-2 gap-4 ">
            <ReactSortable
              list={Array.isArray(images) ? images : []}
              setList={uploadImageOrder}
              animation={200}
              className=" grid grid-cols-2 gap-4 "
            >
              {Array.isArray(images) &&
                images.map((link, index) => (
                  <div key={link} className="relative group">
                    <img
                      src={link}
                      alt="image"
                      className="object-cover w-44 h-32 rounded-md p-2"
                    />

                    <div className="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100">
                      <button onClick={() => handleDeleteImage(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-red-600 bg-white rounded-full"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
            </ReactSortable>
          </div>
        )}

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
              class="block w-full rounded-md border-gray-300 shadow-sm border   p-3"
              placeholder="Enter product description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>

        {category !== "clock" && (
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
                class="block w-full rounded-md border-gray-300 shadow-sm border   p-3"
                placeholder="Enter product price"
                value={price[0]}
                onChange={(event) =>
                  handlePriceChange(0, event.target.value)
                }
              />
            </div>
          </div>
        )}

        <div class="mx-auto my-4">
          <div>
            <label
              for="example1"
              class="mb-1 block text-lg font-medium text-gray-700 py-2"
            >
              Hero Section
            </label>

            <div class="mx-auto space-y-3">
              <div class="flex items-center space-x-2">
                <input
                  type="radio"
                  id="heroYes"
                  name="radioGroup1"
                  checked={heroProduct == "yes"}
                  class="h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  onChange={(event) => setHeroProduct("yes")}
                  value="yes"
                />
                <label for="heroYes" class="text-sm font-medium text-gray-700">
                  Yes
                </label>
              </div>
              <div class="flex items-center space-x-2">
                <input
                  type="radio"
                  id="heroNo"
                  checked={heroProduct == "no"}
                  name="radioGroup2"
                  class="h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  onChange={(event) => setHeroProduct("no")}
                  value="no"
                />
                <label for="heroNo" class="text-sm font-medium text-gray-700">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>


        <div class="mx-auto my-4">
          <div>
            <label
              for="example2"
              class="mb-1 block text-lg font-medium text-gray-700 py-2"
            >
              Collection Section
            </label>

            <div class="mx-auto space-y-3">
              <div class="flex items-center space-x-2">
                <input
                  type="radio"
                  id="collectionyes"
                  name="radioGroup3"
                  checked={collectionProduct == "yes"}
                  class="h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  onChange={(event) => setCollectionProduct("yes")}
                  value="yes"
                />
                <label for="collectionyes" class="text-sm font-medium text-gray-700">
                  Yes
                </label>
              </div>
              <div class="flex items-center space-x-2">
                <input
                  type="radio"
                  id="collectionno"
                  checked={collectionProduct == "no"}
                  name="radioGroup4"
                  class="h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                  onChange={(event) => setCollectionProduct("no")}
                  value="no"
                />
                <label for="collectionno" class="text-sm font-medium text-gray-700">
                  No
                </label>
              </div>
            </div>
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

import Product from "@/components/Product";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get(`/api/products?id=${id}`).then(res => {
        setProductInfo(res.data);
      });
    }
  }, []);


  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="mt-1.5 text-md text-gray-500 max-w-lg">
            Editing {productInfo?.title}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center"></div>
      </div>

      <hr class="my-8 h-px border-0 bg-gray-300" />
      <div className="my-10">
        {productInfo && (
            <Product {...productInfo} />
        )}
      </div>
    </>
  );
}
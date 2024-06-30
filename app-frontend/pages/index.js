import Collection from "@/components/Collection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home({featureProduct, newProducts, collectionProduct}) {
  // featureProduct, newProducts, collectionProduct
  const products = [{

      id: 1,
      title: "Beach Coasters",
      description:
        "Sed pretium pellentesque eros, sit amet ultricies arcu malesuada in. Morbi nec venenatis lectus. Proin ultricies sed magna nec condimentum. Maecenas eu mauris et ante viverra ornare. Nunc sagittis erat eget dui rutrum, vel tempus sem mollis. Aenean hendrerit vitae lorem nec maximus. Aliquam vitae justo nisl. Nulla ex nisl, tincidunt in leo non, dapibus pretium libero. Quisque tincidunt sollicitudin suscipit.",
      images: [
        "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207417/Resinoia/file_1718207409747.jpg",
        "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
        "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
        "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
      ],
      price: 1234,
  },{

    id: 1,
    title: "Beach Coasters",
    description:
      "Sed pretium pellentesque eros, sit amet ultricies arcu malesuada in. Morbi nec venenatis lectus. Proin ultricies sed magna nec condimentum. Maecenas eu mauris et ante viverra ornare. Nunc sagittis erat eget dui rutrum, vel tempus sem mollis. Aenean hendrerit vitae lorem nec maximus. Aliquam vitae justo nisl. Nulla ex nisl, tincidunt in leo non, dapibus pretium libero. Quisque tincidunt sollicitudin suscipit.",
    images: [
      "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207417/Resinoia/file_1718207409747.jpg",
      "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
      "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
      "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
    ],
    price: 1234,
},{

  id: 1,
  title: "Beach Coasters",
  description:
    "Sed pretium pellentesque eros, sit amet ultricies arcu malesuada in. Morbi nec venenatis lectus. Proin ultricies sed magna nec condimentum. Maecenas eu mauris et ante viverra ornare. Nunc sagittis erat eget dui rutrum, vel tempus sem mollis. Aenean hendrerit vitae lorem nec maximus. Aliquam vitae justo nisl. Nulla ex nisl, tincidunt in leo non, dapibus pretium libero. Quisque tincidunt sollicitudin suscipit.",
  images: [
    "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207417/Resinoia/file_1718207409747.jpg",
    "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
    "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
    "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
  ],
  price: 1234,
},{

  id: 1,
  title: "Beach Coasters",
  description:
    "Sed pretium pellentesque eros, sit amet ultricies arcu malesuada in. Morbi nec venenatis lectus. Proin ultricies sed magna nec condimentum. Maecenas eu mauris et ante viverra ornare. Nunc sagittis erat eget dui rutrum, vel tempus sem mollis. Aenean hendrerit vitae lorem nec maximus. Aliquam vitae justo nisl. Nulla ex nisl, tincidunt in leo non, dapibus pretium libero. Quisque tincidunt sollicitudin suscipit.",
  images: [
    "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207417/Resinoia/file_1718207409747.jpg",
    "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
    "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
    "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
  ],
  price: 1234,
},{

  id: 1,
  title: "Beach Coasters",
  description:
    "Sed pretium pellentesque eros, sit amet ultricies arcu malesuada in. Morbi nec venenatis lectus. Proin ultricies sed magna nec condimentum. Maecenas eu mauris et ante viverra ornare. Nunc sagittis erat eget dui rutrum, vel tempus sem mollis. Aenean hendrerit vitae lorem nec maximus. Aliquam vitae justo nisl. Nulla ex nisl, tincidunt in leo non, dapibus pretium libero. Quisque tincidunt sollicitudin suscipit.",
  images: [
    "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207417/Resinoia/file_1718207409747.jpg",
    "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
    "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
    "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
  ],
  price: 1234,
},];
  const product = {

      id: 1,
      title: "Beach Coasters",
      description:
        "Sed pretium pellentesque eros, sit amet ultricies arcu malesuada in. Morbi nec venenatis lectus. Proin ultricies sed magna nec condimentum. Maecenas eu mauris et ante viverra ornare. Nunc sagittis erat eget dui rutrum, vel tempus sem mollis. Aenean hendrerit vitae lorem nec maximus. Aliquam vitae justo nisl. Nulla ex nisl, tincidunt in leo non, dapibus pretium libero. Quisque tincidunt sollicitudin suscipit.",
      images: [
        "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207417/Resinoia/file_1718207409747.jpg",
        "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
        "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
        "https://res.cloudinary.com/dxmmprgaa/image/upload/v1718207414/Resinoia/file_1718207409721.jpg",
      ],
      price: 1234,
  };
  return (
    <>
      <Hero product={featureProduct} />

      <hr class="my-8 h-px border-0 bg-gray-300" />

      <Products products={newProducts} />

      <hr class="my-8 h-px border-0 bg-gray-300" />

      <Collection product={collectionProduct} />

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const featureId = "6669c3c6363f7b9b3a09b571";
  const collectionId = "6669c3c6363f7b9b3a09b571";

  const featureProduct = await Product.findById(featureId);
  const collectionProduct = await Product.findById(collectionId);
  const newProducts = await Product.find({}, null, {sort: {'_id': 1}, limit: 5})

  return {
    props: {
      featureProduct: JSON.parse(JSON.stringify(featureProduct)),
      collectionProduct: JSON.parse(JSON.stringify(collectionProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}

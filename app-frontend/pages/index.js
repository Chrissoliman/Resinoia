import Hero from "@/components/Hero";
import Products from "@/components/Products";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home({ featureProduct, newProducts }) {
  return (
    <>
      <Hero product={featureProduct} />

      <hr class="my-8 h-px border-0 bg-gray-300" />

      <Products products={newProducts} />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const featureId = "6669c3c6363f7b9b3a09b571";

  const featureProduct = await Product.findById(featureId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: 1 },
    limit: 5,
  });

  return {
    props: {
      featureProduct: JSON.parse(JSON.stringify(featureProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}

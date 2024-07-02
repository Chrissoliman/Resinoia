import Collection from "@/components/Collection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home({featureProduct, newProducts, collectionProduct}) {

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

  const featureProduct = await Product.findOne({heroProduct: 'yes'});
  const collectionProduct = await Product.findOne({collectionProduct: 'yes'});
  const newProducts = await Product.find({}, null, {sort: {'_id': 1}, limit: 5})

  return {
    props: {
      featureProduct: JSON.parse(JSON.stringify(featureProduct)),
      collectionProduct: JSON.parse(JSON.stringify(collectionProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}

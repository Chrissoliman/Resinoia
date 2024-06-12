import Hero from "@/components/Hero";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";




export default function Home({featureProduct}) {
  return <>
  <Hero product={featureProduct} />
  </>
}

export async function getServerSideProps() {
  await mongooseConnect()

  const featureId = '6669c3c6363f7b9b3a09b571'

  const featureProduct = await Product.findById(featureId)

  return {
    props: {
      featureProduct: JSON.parse(JSON.stringify(featureProduct))
    }
  }
}

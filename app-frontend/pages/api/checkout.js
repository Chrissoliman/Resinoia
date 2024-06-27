import mongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('Should be a post request');
    return;
  }


  const { email, name, address, city, zip, phone, letter, size, notes, cartProducts } = req.body;

  console.log('req.body info: ', req.body)

  await mongooseConnect();

  const productIds = cartProducts;
  const uniqueIds = [... new Set(productIds)];
  const productsInfo = await Product.find({ _id: uniqueIds });

  let line_items = [];

  for (const productId of uniqueIds) {
    const productInfo = productsInfo.find(p => p._id.toString() === productId);

    const quantity = productIds.filter(id => id === productId)?.length || 0;

    if (quantity > 0 && productInfo) {
      line_items.push(
        {
          quantity,
          price_data: {
            currency: 'egp',
            product_data: { name: productInfo.title, price: productInfo.price, images: productInfo.images[0], letter, size, notes },
            total_unit_amount: quantity * productInfo.price,
          },

        }
      )
    }
  }

  const orderDoc = await Order.create({
    line_items, email, name, address, city, zip, phone, letter, size, notes, paid: false
  })

  console.log('orderDoc', orderDoc)



  res.json({
    url: 'http://localhost:3000/',
  })

}
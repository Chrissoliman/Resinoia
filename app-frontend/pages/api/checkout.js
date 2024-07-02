import mongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { ObjectId } from "mongodb"; // Import ObjectId from mongodb

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("Should be a post request");
    return;
  }

  const {
    email,
    name,
    address,
    city,
    state,
    zip,
    phone,
    cartProducts,
  } = req.body;

  console.log("req.body info: ", req.body);

  

  await mongooseConnect();

  // Convert productIds to ObjectId
  const productIds = cartProducts.map((item) => new Object(item.productId));
  const uniqueIds = [...new Set(productIds)];
  const productsInfo = await Product.find({ _id: { $in: uniqueIds } });

  console.log('productIDS', productIds)
  console.log('uniqueIds', uniqueIds)
  console.log('productsInfo', productsInfo)

  let line_items = [];

  for (const product of cartProducts) {
    const productInfo = productsInfo.find(
      (p) => p._id.toString() === product.productId.toString()
    );
    const { letter, size, quantity, notes } = product || {};

    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "egp",
          product_data: {
            name: productInfo.title,
            price: productInfo.price,
            images: productInfo.images[0],
            category: productInfo.category,
            letter,
            size,
            notes,
          },
          total_unit_amount:
            size == "25 Cm"
              ? productInfo.price[0] * quantity
              : size == "30 Cm"
              ? productInfo.price[1] * quantity
              : size == "35 Cm"
              ? productInfo.price[2] * quantity
              : size == "40 Cm"
              ? productInfo.price[3] * quantity
              : productInfo.price[0] * quantity,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    email,
    name,
    address,
    city,
    state,
    zip,
    phone,
    status: false,
  });

  res.json({
    url: "http://localhost:3000/",
  });
}

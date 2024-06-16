import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {

    await mongooseConnect()
    const ids = req.body.ids

    try {
        const products = await Product.find({_id: {$in: ids}})
        res.json(products)
    } catch (err) {
        console.log("Error : ", err)
        res.status(500).json({error : "Internet Server Error"})
    }

    
}
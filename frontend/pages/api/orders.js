import mongooseConnect from "@/lib/mongoose"
import { Order } from "@/models/Order"


export default async function handle(req, res) {

    const { method } = req

    await mongooseConnect()

    if( method == 'GET') {
        if(req.query?.id) {
            res.json(await Order.findOne({_id: req.query.id}))
        }
        else{
            res.json(await Order.find())
        }
    }

    if( method == 'PUT') {
        const { line_items, name, email, city, zip, state, address, phone, _id } = req.body
        let { status } = req.body

        status = !status

        await Order.updateOne({_id}, { line_items, name, email, city, zip, state, address, phone, status})
        res.json(true)
    }


    if( method == 'DELETE' ) {
        if(req.query.id) {
            await Order.deleteOne({_id: req.query.id})
            res.json(true)
        }
    }
}
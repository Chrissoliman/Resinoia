import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    city: String,
    zip: String,
    state: String,
    address: String,
    phone: String,
    totalPrice: Number,
    status: Boolean,
}, { timestamps: true})

export const Order = models?.Order || model('Order', OrderSchema)
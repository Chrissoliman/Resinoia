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
    letter: String,
    size: String,
    notes: String,
    paid: Boolean,
}, { timestamps: true})

export const Order = models?.Order || model('Order', OrderSchema)
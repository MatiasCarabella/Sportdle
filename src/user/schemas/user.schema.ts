import { Schema } from "mongoose";

export const UserSchema = new Schema({
    email:  { type: String, required: true, unique: true },
    source: { type: String,  enum: ["web", "google"], required: true},
    password: { type: String }
},{
    collection: 'Users'
})
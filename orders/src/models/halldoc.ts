import mongoose from "mongoose"

export interface HallDoc extends mongoose.Document {
  name: string
  address: string
  seatsNumber: Number
  version: number
}
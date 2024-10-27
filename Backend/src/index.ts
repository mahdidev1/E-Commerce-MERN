import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRoute";
import cartRouter from "./routers/cartRoute";
import cors from "cors";
import { Iproducts } from "./services/productService";

dotenv.config();

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("faild to connect", err));

Iproducts();
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.listen(port, () => {
  console.log(`connected in port ${port}`);
});

import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter";

const app = express();
const port = 3001;
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("faild to connect", err));

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`connected in port ${port}`);
});

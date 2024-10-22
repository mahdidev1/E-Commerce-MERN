import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const Iproducts = async () => {
  const products = [
    { title: "laptob", image: "image 1", price: 400, stock: 20 },
    { title: "laptob 1", image: "image 2", price: 500, stock: 10 },
  ];

  const EProdects = await getAllProducts();

  if (EProdects.length === 0) {
    await productModel.insertMany(products);
  }
};

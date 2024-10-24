import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const Iproducts = async () => {
  try {
    const products = [
      { title: "laptob", image: "image 1", price: 400, stock: 20 },
    ];

    const EProdects = await getAllProducts();

    if (EProdects.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("cannot see database", err);
  }
};

import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const Iproducts = async () => {
  try {
    const products = [
      {
        title: "Dell laptob",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG2PIT2xb90enfkWTibnBy3bQgmtPgdUIQHQ&s",
        price: 2400,
        stock: 20,
      },
      {
        title: "Asus laptob",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFVgBYYTnLSnOKKQnLwOl9f4NQGnO3zfz6Q&s",
        price: 3000,
        stock: 20,
      },
      {
        title: "HP laptob",
        image:
          "https://tdiscount.tn/53053-large_default/hp-pc-15-dw3015nk-i5-1135g7-156p-16gb-256gb-w10.webp",
        price: 2800,
        stock: 20,
      },
    ];

    const EProdects = await getAllProducts();

    if (EProdects.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("cannot see database", err);
  }
};

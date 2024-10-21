import { productModel } from "./../models/productModel";
import { cartModel } from "./../models/cartModel";
interface IcreateCartForUder {
  userId: string;
}

const createCartForUser = async ({ userId }: IcreateCartForUder) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface IgetCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({ userId }: IgetCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return cart;
};

interface AddItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.item.find(
    (p) => p.product.toString() === productId
  );

  if (existsInCart) {
    return { data: "Item alredy exist in cart", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "Low stock for item ", statusCode: 400 };
  }

  cart.item.push({
    product: productId,
    unitPrice: product.price,
    quantity,
  });

  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

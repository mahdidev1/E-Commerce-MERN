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

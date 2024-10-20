import { IUser, userModel } from "./../models/userModel";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "user already used", statusCode: 400 };
  }

  const hachPassword = await bycrpt.hash(password, 10);

  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hachPassword,
  });
  await newUser.save();

  return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return { data: "Incorrect email", statusCode: 400 };
  }

  const passwordMatch = await bycrpt.compare(password, findUser.password);

  if (passwordMatch) {
    return {
      data: generateJWT({
        email,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
      }),
      statusCode: 200,
    };
  }

  return { data: "incorrect password", statusCode: 400 };
};

export const getAllUsers = async () => {
  return await userModel.find();
};

const generateJWT = (data: any) => {
  return jwt.sign(data, "3pPWVOGlkg6P1rHqBiMZnNrcty2DvBt8");
};

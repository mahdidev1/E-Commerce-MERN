import express from "express";
import { register, login, getAllUsers } from "../services/userServices";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { data, statusCode } = await register({
    firstName,
    lastName,
    email,
    password,
  });
  res.status(statusCode).send(data);
});

router.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.status(200).send(users);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, statusCode } = await login({ email, password });
  res.status(statusCode).send(data);
});

export default router;

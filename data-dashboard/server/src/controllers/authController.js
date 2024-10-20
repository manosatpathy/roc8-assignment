import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { userAuthenticateSchema } from "../schemas/userSchemas.js";

const prisma = new PrismaClient();

export const signup = async (req, res) => {
  const parsedData = userAuthenticateSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({ errors: parsedData.error.issues });
  }
  const { username, password } = parsedData.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res
      .status(201)
      .json({ userId: user.id, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const parsedData = userAuthenticateSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({ errors: parsedData.error.issues });
  }
  const { username, password } = parsedData.data;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ userId: user.id, message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to Log in", error });
  }
};


import connectDB from "@/lib/db";
import User from "@/models/User";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { name, email } = req.body;
    try {
      const user = await User.create({ name, email });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: "User creation failed" });
    }
  }

  if (req.method === "GET") {
    const users = await User.find();
    res.status(200).json(users);
  }
}

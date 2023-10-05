import { NextApiRequest, NextApiResponse } from "next";
import db from "./db"; // Adjust the path as needed
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = JSON.parse(req.body);
  try {
    const tools = await db.many("SELECT * FROM tools where user_id = $1", [
      email,
    ]);
    res.status(200).json({ tools });
  } catch (error) {
    console.error("Error retrieving data: ", error);
    res
      .status(505)
      .json({ message: "An error occurred while retrieving the data." });
  }
}

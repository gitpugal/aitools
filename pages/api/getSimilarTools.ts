import { NextApiRequest, NextApiResponse } from "next";
import db from "./db"; // Adjust the path as needed
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { toolId, category } = JSON.parse(req.body);
    const tools = await db.many(
      "SELECT * FROM tools where primarycategory = $1 AND id != $2 limit 6",
      [category, toolId]
    );
    res.status(200).json({ tools });
  } catch (error) {
    console.error("Error retrieving data: ", error);
    res
      .status(505)
      .json({ message: "An error occurred while retrieving the data." });
  }
}

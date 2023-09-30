import { NextApiRequest, NextApiResponse } from "next";
import db from "./db"; // Adjust the path as needed
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method !== 'GET') {
  //   return res.status(405).end(); // Method Not Allowed
  // }

  try {
    const { currentIndex, itemCount } = JSON.parse(req.body);
    console.log(currentIndex);
    const tools = await db.any(
      `SELECT * FROM tools LIMIT ${itemCount} offset ${currentIndex}`
    );
    const toolCount = await db.any(`SELECT COUNT(*) FROM tools`);

    res.status(200).json({ tools, toolCount });
  } catch (error) {
    console.error("Error retrieving data: ", error);
    res
      .status(400)
      .json({ message: "An error occurred while retrieving the data." });
  }
}

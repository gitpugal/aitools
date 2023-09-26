import { NextApiRequest, NextApiResponse } from "next";
import db from "./db";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { toolsIds, currentIndex, itemCount } = JSON.parse(req.body);
  try {
    const result = await db.any(
      `SELECT * FROM tools where id in (${toolsIds}) limit ${itemCount} offset ${currentIndex}`
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error getting data: ", error);
    return res
      .status(500)
      .json({ message: "An error occurred while getting the data." });
  }
}

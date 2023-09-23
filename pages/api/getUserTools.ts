import { NextApiRequest, NextApiResponse } from "next";
import db from "./db"; // Adjust the path as needed
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   if (req.method !== "GET") {
  //     return res.status(405).end(); // Method Not Allowed
  //   }

  try {
    console.log("hih")
    const tools = await db.many("SELECT * FROM drafttools where user_id = $1", [
      "pugalarasan2014@gmail.com",
    ]);
    res.status(200).json({ tools });
  } catch (error) {
    console.error("Error retrieving data: ", error);
    res
      .status(505)
      .json({ message: "An error occurred while retrieving the data." });
  }
}

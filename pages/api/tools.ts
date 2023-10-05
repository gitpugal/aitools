import { NextApiRequest, NextApiResponse } from "next";
import db from "./db"; // Adjust the path as needed
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const tools = await db.any(
      "SELECT tools.*, seotools.title as seotitle, seotools.description as seodescription, seotools.keywords as seokeywords FROM tools JOIN seotools ON tools.id = seotools.id "
    );
    res.status(200).json({ tools });
  } catch (error) {
    console.error("Error retrieving data: ", error);
    res
      .status(505)
      .json({ message: "An error occurred while retrieving the data." });
  }
}

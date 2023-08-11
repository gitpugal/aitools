import pgp from "pg-promise";
import { NextApiRequest, NextApiResponse } from "next";

const connectionString =
  "postgres://sourcefreeze:k2NuUA4SsFMb@ep-divine-sound-318147-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require";

const db = pgp()(connectionString);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await db.any(
      "UPDATE tools SET upvotes = upvotes + 1 WHERE id = $1 returning upvotes",
      [req.body.id]
    )
    res.status(200).json({message: result});
  } catch (error) {
    console.error("Error getting data: ", error);
    return res.status(500).json({ message: error });
  }
}

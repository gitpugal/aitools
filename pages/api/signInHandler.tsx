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
      "SELECT * FROM users WHERE email = $1 LIMIT 1",
      [req.body.email]
    );
    if (result.length == 0) {
      return res
        .status(201)
        .json({ message: "No account exists, Sign up and try again" });
    }
    if (result[0].password == req.body.password) {
      return res.status(200).json({ message: "Successfullly signed in", data:result });
    } else {
      return res.status(202).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.error("Error getting data: ", error);
    return res.status(500).json({ message: error });
  }
}

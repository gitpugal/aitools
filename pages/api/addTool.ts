import db from "./db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      name,
      description,
      features,
      upvotes,
      imageURL,
      slug,
      pricing,
      user,
    } = req.body;
    const result = await db
      .none(
        "INSERT INTO drafttools(name, short_description, description, alternative_description, features, faq, upvotes, image, seo_title, seo_description, slug, pricing, user_id, approved) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
        [
          name,
          description,
          "This is the full description of the dummy tool.",
          "Alternative description for the dummy tool.",
          features || "Features of the dummy tool.",
          "Frequently asked questions about the dummy tool.",
          upvotes || 0,
          imageURL || "Unkwon.jpg",
          "Dummy Tool SEO Title",
          "SEO description for the dummy tool.",
          slug,
          pricing || "Not Specified",
          user,
          false,
        ]
      )
      .then(async () => {
        await db.one("SELECT * FROM drafttools where slug = $1", [slug]);
      });

    return res.status(200).json({ message: "sucess" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.detail });
  }
}

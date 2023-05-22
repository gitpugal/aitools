import pgp from 'pg-promise';

const connectionString = 'postgres://sourcefreeze:k2NuUA4SsFMb@ep-divine-sound-318147-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require';

const db = pgp()(connectionString);

export default async function handler(req, res) {
  try {
    const result = await db.any('SELECT * FROM categories ORDER BY id ASC');
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error getting data: ', error);
    return res.status(500).json({ message: 'An error occurred while getting the data.' });
  }
}

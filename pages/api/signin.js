// pages/api/signin.js
import clientPromise from '../../lib/mongodb'; // Adjust the path as necessary
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const { id, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("blogDB");

    // Find the admin user in the database
    const user = await db.collection("admin").findOne({ id });

    console.log(user);

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the submitted password with the one stored in the database
    const match = await bcrypt.compare(password, user.passwordHash);

    if (match) {
      // Credentials are correct
      return res.status(200).json({ message: 'Authenticated successfully' });
    } else {
      // Authentication failed
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

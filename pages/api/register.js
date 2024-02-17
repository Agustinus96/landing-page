import clientPromise from '../../lib/mongodb'; // Adjust the path as necessary
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { id, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10); // Hash password

  try {
    const client = await clientPromise;
    const db = client.db("blogDB");

    // Check if the user already exists
    const existingUser = await db.collection("admins").findOne({ id });
    if (existingUser) {
      return res.status(409).json({ message: 'Admin already exists' });
    }

    // Store the new admin in the database
    await db.collection("admin").insertOne({
      id,
      passwordHash,
    });

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

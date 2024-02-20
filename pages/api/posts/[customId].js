// pages/api/posts/[customId].js
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { customId } = req.query;
  const client = await clientPromise;
  const db = client.db('blogDB');

  try {
    const post = await db.collection('posts').findOne({ customId });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  } finally {
    console.log("ok");
  }
}

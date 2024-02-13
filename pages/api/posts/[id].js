// pages/api/posts/[id].js

import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('blogDB');
  const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.status(200).json(post);
}

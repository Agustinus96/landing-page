import clientPromise from '../../../lib/mongodb';
import sanitizeHtml from 'sanitize-html';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("blogDB");
  const postsCollection = db.collection("posts");

  if (req.method === 'GET') {
    try {
      const posts = await postsCollection.find({}).toArray();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
  } else if (req.method === 'POST') {
    const { title, content } = req.body;

    // Generate a unique identifier for the new post
    const customId = uuidv4();

    try {
      const postData = { customId, title, content }; // Include customId in the post data
      const result = await postsCollection.insertOne(postData);
      return res.status(201).json({ message: 'Post created successfully', id: customId });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create the post', error: error.message });
    }
} else if (req.method === 'PUT') {
    console.log("PUT request received", req.query, req.body);
    try {
      const { customId } = req.query; // Use customId to identify the post
      const { title, content } = req.body;
      console.log(`Updating post with customId: ${customId}`);

      // Validate input
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }

      // Sanitize content
      const sanitizedContent = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: false,
        allowedIframeHostnames: ['www.youtube.com'],
      });

      // Update the post by customId
      const result = await postsCollection.updateOne(
        { customId }, // Query document by customId
        { $set: { title, content: sanitizedContent } } // Update title and content
      );

      // Check if the document was found and updated
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
      // Respond with success message
      res.json({ message: 'Post updated successfully', customId });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update the post', error: error.message });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

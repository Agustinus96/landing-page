// import clientPromise from '../../../lib/mongodb';

// export default async function handler(req, res) {
//   const client = await clientPromise;
//   const db = client.db("blogDB");

//   const posts = await db.collection("posts").find({}).toArray();
//   res.json(posts);
// }

// import clientPromise from '../../../lib/mongodb';

// export default async function handler(req, res) {
//   const client = await clientPromise;
//   const db = client.db("blogDB");

//   if (req.method === 'GET') {
//     // Fetch and return the posts for a GET request
//     const posts = await db.collection("posts").find({}).toArray();
//     res.json(posts);
//   } else if (req.method === 'POST') {
//     // Add a new post for a POST request
//     try {
//       // Extract post data from the request body
//       const postData = req.body;
      
//       // Simple validation
//       if (!postData.title || !postData.introduction || !postData.subtitle || !postData.content) {
//         return res.status(400).json({ message: 'Title and content are required' });
//       }

//       // Insert the new post into the database
//       const result = await db.collection("posts").insertOne(postData);

//       // Respond with the created post
//       res.status(201).json(result.ops[0]);
//     } catch (error) {
//       // Handle any errors that occur during the insert
//       res.status(500).json({ message: 'Failed to add the post', error: error.message });
//     }
//   } else {
//     // Respond with method not allowed if not GET or POST
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


import clientPromise from '../../../lib/mongodb';
import sanitizeHtml from 'sanitize-html';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("blogDB");
  const { id } = req.query; // Extract the document ID from the query parameters

  if (req.method === 'GET') {
    const posts = await db.collection("posts").find({}).toArray();
    res.json(posts);
  } else if (req.method === 'POST') {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const sanitizedContent = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
        allowedAttributes: false,
        allowedIframeHostnames: ['www.youtube.com'],
      });
      const postData = {
        title,
        content: sanitizedContent,
      };
      const result = await db.collection("posts").insertOne(postData);
      res.status(201).json(result.ops[0]);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add the post', error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, content } = req.body;
      const sanitizedContent = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
        allowedAttributes: false,
        allowedIframeHostnames: ['www.youtube.com'],
      });
      const result = await db.collection('posts').updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, content: sanitizedContent } }
      );
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json({ message: 'Post updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update the post', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']); // Ensure to include 'PUT' in the 'Allow' header
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


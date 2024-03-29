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
        const { title, content, tags } = req.body; // Include tags in the destructured request body

        // Generate a unique identifier for the new post
        const customId = uuidv4();

        try {
            // Process and include tags array in the post data
            const postData = { 
                customId, 
                title, 
                content: sanitizeHtml(content, {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                    allowedAttributes: false,
                    allowedIframeHostnames: ['www.youtube.com'],
                }), 
                tags // Directly save the tags array received from the request
            };
            const result = await postsCollection.insertOne(postData);
            return res.status(201).json({ message: 'Post created successfully', customId });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to create the post', error: error.message });
        }
    } else if (req.method === 'PUT') {
        try {
            const { customId } = req.query;
            const { title, content, tags } = req.body; // Assume tags are also updated

            const sanitizedContent = sanitizeHtml(content, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                allowedAttributes: false,
                allowedIframeHostnames: ['www.youtube.com'],
            });

            const updateDoc = {
                $set: { 
                    title, 
                    content: sanitizedContent,
                    tags // Update tags along with title and content
                }
            };

            const result = await postsCollection.updateOne({ customId }, updateDoc);

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.json({ message: 'Post updated successfully', customId });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update the post', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

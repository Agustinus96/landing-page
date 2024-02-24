// pages/api/chat.js
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Replace with your desired model
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ answer: reply });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res
      .status(500)
      .json({
        error: "Failed to fetch response from OpenAI",
        details: error.message,
      });
  }
}

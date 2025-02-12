const express = require('express');
const router = express.Router();
const { OpenAI } = require("openai");


//Routes/Endpoints:

router.post('/', async (req, res) => {
    const { message } = req.body;

    const openai = new OpenAI({
        apiKey: process.env.OPEN_API_KEY, // API key is in .env file
    });

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // the model name
            messages: [
                {
                    role: 'system', // Sets the system message that defines the assistant's behavior
                    content: 'You are a mental health chatbot. Offer advice, emotional support, and mindfulness techniques. Be empathetic and encouraging.',
                },
                {
                    role: 'user', // User's input message
                    content: message, // the users extracted message from the frontend
                },
            ],
        });

        // Extract reply from OpenAI response
        const assistantReply = response.choices[0].message.content;

        // Send the  reply as JSON response
        return res.json({
            success: true,
            reply: assistantReply, // Return response in JSON format
        });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return res.status(500).json({ success: false, error: 'An error occurred while processing your request' });
    }

});



module.exports = router;

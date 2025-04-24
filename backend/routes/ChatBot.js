const express = require('express');
const router = express.Router();
const { OpenAI } = require("openai");
const connection = require('../database/DBconnection');

//Initializing connecting to openai:

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY, // API key is in .env file
});

//Routes/Endpoints:
router.post('/', async (req, res) => {
    let { message, context } = req.body; // Expecting message and optional context array
    const userId = req.session?.userId; // Retrieve userID for their past memory/conversation

    // Initialize system message
    const systemMessage = {
        role: 'system',
        content: `You are a compassionate and supportive mental health chatbot designed to offer emotional support, mindfulness techniques, and helpful insights. Be empathetic, non-judgmental, and encouraging at all times.
        Only provide mindfulness exercises or detailed advice when clearly relevant or requested—avoid offering these unsolicited. Keep all responses as concise as possible without sacrificing warmth or usefulness. Prioritize clarity, empathy, and brevity to ensure a smooth experience for users relying on voice-based output.
        If a conversation indicates signs of severe distress (e.g. suicidal thoughts or crisis situations), gently recommend contacting real-life mental health resources such as suicide prevention hotlines or local support lines. Only bring up these resources when it is contextually appropriate, never by default.
        Avoid giving medical or clinical diagnoses. You are not a substitute for professional therapy. Encourage users to seek help from licensed mental health professionals when needed.`,
    };

    // Fetch user memory from database if available
    let userMemory = '';
    console.log("Session userId:", userId);
    if (userId) {
        try {
            const [rows] = await connection.promise().query(
                'SELECT MEMORY FROM USER WHERE ID = ?',
                [userId]
            );
            userMemory = rows[0]?.MEMORY || '';
        } catch (err) {
            console.error('Failed to fetch memory:', err);
        }
    }

    // Logging context for testing purposes
    console.log('Received context 1:', context);

    // Ensure context is an array and limit its size
    if (!Array.isArray(context)) {
        context = [];
    }
    const maxContextMessages = 3; // Keep only the last 3 messages to save tokens
    const shortContext = context.slice(-maxContextMessages);

    const messages = [systemMessage];
    if (userMemory) {
        messages.push({ role: 'system', content: `Summary of past session: ${userMemory}` });
    }
    messages.push(...shortContext, { role: 'user', content: message });
    
    console.log("Memory retrieved from DB:", userMemory);
    console.log("Messages sent to OpenAI:", messages);

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: messages,
        });

        // Extract assistant reply
        const assistantReply = response.choices[0].message.content;

        // Update context with the latest interaction
        const updatedContext = [...shortContext, { role: 'user', content: message }, { role: 'assistant', content: assistantReply }];

        // Summarize session for memory
        let sessionSummary = '';
        try {
            const summaryResponse = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'Summarize this conversation in 2-4 short sentences, focusing on the emotional themes or useful info a future assistant should remember.' },
                    ...updatedContext
                ],
                max_tokens: 1000,
            });
            sessionSummary = summaryResponse.choices[0].message.content;

            if (userId) {
                console.log("Trying to save memory for userId:", userId);
                console.log("Memory being saved:", sessionSummary);

                await connection.promise().query(
                    'UPDATE USER SET MEMORY = ? WHERE ID = ?',
                    [sessionSummary, userId]
                );

                // Testing purpose only, to see immediately if MEMORY was saved
                const [verifyRows] = await connection.promise().query(
                    'SELECT MEMORY FROM USER WHERE ID = ?',
                    [userId]
                );
                console.log("Memory in DB after saving:", verifyRows[0]?.MEMORY);
            }


        } catch (summaryErr) {
            console.error('Failed to update session memory:', summaryErr);
        }

        // Send the updated context back to the frontend
        return res.json({
            success: true,
            reply: assistantReply,
            context: updatedContext, // Frontend must store this and send it in future requests
        });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            error: 'An error occurred while processing your request',
        });
    }
});


router.get('/generate-affirmation', async (req, res) => {

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // the model name
            messages: [
                {
                    role: 'system', // Sets the system message that defines the assistant's behavior
                    content: 'You are a mental health chatbot. Offer advice, emotional support, and mindfulness techniques. Be empathetic and encouraging.',
                },
                {
                    role: 'user', // User's input message
                    content: 'Generate a one sentence daily affirmation for a mental health website.', // the users extracted message from the frontend
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




router.get('/generate-tip', async (req, res) => {

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // the model name
            messages: [
                {
                    role: 'system', // Sets the system message that defines the assistant's behavior
                    content: 'You are a mental health chatbot. Offer advice, emotional support, and mindfulness techniques. Be empathetic and encouraging.',
                },
                {
                    role: 'user', // User's input message
                    content: 'Generate a one sentence daily mental health tip for a mental health website.', // the users extracted message from the frontend
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

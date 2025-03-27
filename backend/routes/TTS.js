const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { text, voice } = req.body;
  const chosenVoice = voice || "alloy"; // default voice, we could always change it up

  try {
    // Use fetch to call OpenAI's TTS endpoint
    const apiResponse = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPEN_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text,
        voice: chosenVoice
      })
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error("TTS API error:", errorData);
      return res.status(apiResponse.status).json({ error: "TTS API request failed", details: errorData });
    }

    // Get binary data from the response
    const audioBuffer = await apiResponse.arrayBuffer();

    // Set content type to audio/mpeg and send back the audio buffer
    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioBuffer));
  } catch (error) {
    console.error("Error in TTS route:", error.message);
    res.status(500).json({ error: "TTS request failed", details: error.message });
  }
});

module.exports = router;

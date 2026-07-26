export const handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const API_KEY = process.env.GEMINI_API_KEY;
        
        // Use the correct generateContent endpoint that matches the frontend payload structure
        const IMAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${API_KEY}`;
        
        // Read the request sent from the frontend
        const payload = JSON.parse(event.body);

        // Forward the request to Google
        const response = await fetch(IMAGE_MODEL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        // Pass the response and the actual HTTP status code back to the frontend
        return {
            statusCode: response.status,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
};

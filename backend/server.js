const express = require('express')
const axios = require('axios')
const cors = require('cors');

const app = express()


require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Enable CORS to allow requests from the frontend
app.use(cors());

app.get('/api/weather', async (req, res) => {
    const location = req.query.location

    if (!location) {
        return res.status(400).json({ error: 'You entered no location!' })
    }

    const settings = {
        method: 'GET',
        url: `https://open-weather13.p.rapidapi.com/city/${location}/EN`,
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
        }
    }

    try {
        const response = await axios.request(settings)
        res.status(200).json(response.data)
        console.log('successful')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
})

app.listen(PORT, () => {
    console.log(`up and running on port ${PORT}`)
})
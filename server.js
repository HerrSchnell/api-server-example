
const express = require('express');
const cors = require('cors');
const data = require('./data.json');

const app = express();
app.use(cors());

// Health check / Root
app.get("/", (req, res) => res.send("Sometimes the smallest hello can make the biggest difference."));

// Data Route - Get most recent year
app.get('/data', (req, res) => {
    const years = Object.keys(data).map(Number).sort((a, b) => b - a);
    const mostRecentYear = years[0];
    const yearData = data[mostRecentYear];

    res.json(yearData);
});

// Data Route - Get specific year
app.get('/data/:year', (req, res) => {
    const yearData = data[req.params.year];

    if (!yearData) {
        return res.status(404).json({ error: 'No Data Found for that year' });
    }

    res.json(yearData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
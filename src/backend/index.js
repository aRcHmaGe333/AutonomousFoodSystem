// Lightweight Express server entrypoint for telemetry/demo
const express = require('express');
const app = express();
app.use(express.json());

const apiKeyAuth = require('./middleware/apiKeyAuth');
const telemetry = require('./controllers/telemetryController');

const API_KEY = process.env.TELEMETRY_API_KEY || 'dev-key';
app.use('/api/telemetry', apiKeyAuth(API_KEY), telemetry);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Telemetry demo listening on ${port}`));

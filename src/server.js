import express from 'express';
import scraperRouter from './routes/scraper.route';

const app = express();
const port = 3000;

// Define a route
app.get('/health', (req, res) => {
  res.send('Hello World!');
});

app.use(scraperRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

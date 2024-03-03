import express from 'express';
import { scraper } from '../controllers/scraper.controller';

const scraperRouter = express.Router();

scraperRouter.get('/scraper', async (req, res) => await scraper(req, res));

export default scraperRouter;

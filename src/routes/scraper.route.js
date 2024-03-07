import express from 'express';
import { scraper, scraperSite } from '../controllers/scraper.controller';

const scraperRouter = express.Router();

scraperRouter.get('/scraper', async (req, res) => await scraper(req, res));

// scraperRouter.get(
//   '/scraper/site',
//   async (req, res) => await scraperSite(req, res)
// );

export default scraperRouter;

import { gptQuery } from '../services/gpt';
import { basicScraper, siteScraper } from '../services/webScraper';
import 'dotenv/config';

export const scraper = async (req, res) => {
  const url = req.query.url;

  try {
    /**scrape url */
    const content = await basicScraper(url);
    /**send to gpt */
    const gpt = await gptQuery(content);
    return res.status(200).send(gpt);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const scraperSite = async (req, res) => {
  const url = req.query.url;
  const domain = req.query.domain;
  const visited = new Set();
  try {
    await siteScraper(url, domain, visited);

    return res.status(200).send(visited);
  } catch (err) {
    return res.status(500).send(err);
  }
};

import { basicScraper } from '../services/webScraper';

export const scraper = async (req, res) => {
  const url = req.query.url;

  try {
    const content = await basicScraper(url);
    return res.status(200).send(content);
  } catch (err) {
    return res.status(500).send(err);
  }
};

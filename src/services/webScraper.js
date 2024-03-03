import * as cheerio from 'cheerio';
import axios from 'axios';
import randomUseragent from 'random-useragent';

export const basicScraper = async (url) => {
  const response = await axios
    .get(url, {
      headers: {
        'User-Agent': randomUseragent.getRandom(),
      },
    })
    .catch((err) => {
      throw err;
    });

  const $ = cheerio.load(response.data);
  const $body = $('body');

  $body
    .find(
      'script, style, link, img, iframe, video, audio, noscript, nav, menu, meta, footer, button'
    )
    .remove();

  return $body
    .text()
    .replace(/[ \t\n]+/g, ' ')
    .trim();
};

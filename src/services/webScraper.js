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

export const siteScraper = async (url, domain, visited) => {
  if (visited.has(url) || !url.includes(domain)) return; // Avoid infinite loops

  visited.add(url); // Mark the current URL as visited

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': randomUseragent.getRandom(),
      },
    });

    const $ = cheerio.load(response.data);
    const $body = $('body');

    $body
      .find(
        'script, style, link, img, iframe, video, audio, noscript, nav, menu, meta, footer, button'
      )
      .remove();

    let textContent = $body
      .text()
      .replace(/[ \t\n]+/g, ' ')
      .trim();

    // Extract all anchor tags and visit each link
    const anchorTags = $body.find('a');
    for (let i = 0; i < anchorTags.length; i++) {
      const href = $(anchorTags[i]).attr('href');
      if (href && href.startsWith('http')) {
        // If the link is absolute (starts with http), visit it
        textContent += await siteScraper(href, domain, visited);
      } else if (href && href.startsWith('/')) {
        // If the link is relative (starts with /), construct full URL and visit it
        const absoluteUrl = new URL(href, url).toString();
        textContent += await siteScraper(absoluteUrl, domain, visited);
      }
      // Ignore other types of links (e.g., #links, mailto:, javascript:, etc.)
    }

    return;
  } catch (error) {
    console.error(`Error scraping ${url}: ${error}`);
    return; // Return empty string in case of errors
  }
};

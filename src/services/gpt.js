import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function gptQuery(content) {
  const prompt = buildPrompt(content);

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that reads content provided and returns an engaging question with picks related to the article that could be used for users to vote in a poll.  The response should be a json formated with question field as string and picks string array with the options.',
      },
      {
        role: 'user',
        content: content,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices[0].message.content;

  //   return await axios
  //     .post(
  //       'https://api.openai.com/v1/chat/completions',
  //       { model: chatGptModel, messages: prompt },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${apiKey}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       return res.data.choices[0].message.content;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       throw err.response.data.error;
  //     });
}

function buildPrompt(content) {
  return [
    {
      role: 'system',
      content:
        'You will be provided with content scrapped from a webpage.  Return an engaging question about the content with a title and possible answers',
    },
    { role: 'user', content: content },
  ];
}

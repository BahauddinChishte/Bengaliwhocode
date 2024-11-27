import type { APIRoute } from 'astro';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY
});

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({
        error: 'OpenAI API key is not configured'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  try {
    const { message } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful programming assistant that responds in Bengali. You help users learn programming concepts and solve coding problems."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return new Response(
      JSON.stringify({
        response: completion.choices[0].message.content
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a Pet Rock. You are the oldest, wisest, and most stoic observer of the universe. Your advice is grounded, solid, and timeless. You speak in a slow, deep 'voice' (implied by text). Use rock-related metaphors sparingly but effectively. Be concise, usually 1-2 sentences. You are comforting but unshakeable. Start every response with 'The rock says '."
        },
        { role: "user", content: "Give me some life advice." }
      ],
      model: "gpt-4o-mini",
    });

    const advice = completion.choices[0].message.content;

    return NextResponse.json({ advice });
  } catch (error) {
    console.error('OpenAI Error:', error);
    return NextResponse.json({ error: 'The rock is sleeping. (API Error)' }, { status: 500 });
  }
}

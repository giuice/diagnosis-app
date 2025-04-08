import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { classifyError, NetworkError, ValidationError, QuotaError, APIError } from '@/lib/errors/apiErrors';

const apiKey = process.env.DEEPSEEK_API_KEY;
const apiUrl = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com';

if (!apiKey) {
  console.warn('DeepSeek API key is missing. Set DEEPSEEK_API_KEY in environment variables.');
}

const openai = new OpenAI({
  baseURL: apiUrl,
  apiKey,
});

export async function POST(req: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    const body = await req.json();
    const { messages, systemPrompt } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400, headers: corsHeaders });
    }

    if (!apiKey) {
      return NextResponse.json({ error: 'Server misconfiguration: missing API key' }, { status: 500, headers: corsHeaders });
    }

    // Placeholder: Implement rate limiting here

    const completion = await openai.chat.completions.create({
      messages,
      model: 'deepseek-chat',
    });

    return NextResponse.json({ response: completion.choices[0].message }, { headers: corsHeaders });
  } catch (error: any) {
    const classified = classifyError(error);
    let status = 500;
    let message = 'Internal Server Error';

    if (classified instanceof ValidationError) {
      status = 400;
      message = classified.message;
    } else if (classified instanceof NetworkError) {
      status = 503;
      message = 'Network error, please try again later.';
    } else if (classified instanceof QuotaError) {
      status = 429;
      message = 'API quota exceeded. Please wait and try again.';
    } else if (classified instanceof APIError) {
      status = classified.statusCode || 500;
      message = classified.message;
    } else {
      message = classified.message;
    }

    console.error('DeepSeek API error:', {
      type: classified.name,
      message: classified.message,
      original: error,
    });

    return NextResponse.json({ error: message, type: classified.name }, { status, headers: corsHeaders });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

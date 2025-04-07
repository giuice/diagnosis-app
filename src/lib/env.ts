import { z } from 'zod';

const envSchema = z.object({
  OPENAI_API_KEY: z.string().optional(),
  DEEPSEEK_API_KEY: z.string().min(1, 'Missing DEEPSEEK_API_KEY'),
  DEEPSEEK_API_URL: z.string().url('Invalid DEEPSEEK_API_URL'),
  // Add other environment variables here as needed
});

const parsedEnv = envSchema.safeParse({
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
  DEEPSEEK_API_URL: process.env.DEEPSEEK_API_URL,
  // Add other environment variables here
});

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables. See errors above.');
}

export const env = parsedEnv.data;

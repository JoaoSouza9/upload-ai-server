import "dotenv/config";
import { OpenAI } from "openai";

export const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

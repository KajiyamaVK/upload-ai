import { OpenAI } from 'openai'
import * as dotenv from 'dotenv'

dotenv.config()

console.log(process.env.DATABASE_URL)
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
})

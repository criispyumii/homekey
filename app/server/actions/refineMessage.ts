"use server";

import { PROMPT_REFINE_SUMMARY } from "../constants";
import { OpenAIResponse } from "../types";

export const getRefinedMessage = async (
  originalMessage: string
): Promise<string> => {
  try {
    const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_PROJECT_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0125",
        messages: [
          {
            role: "system",
            content: PROMPT_REFINE_SUMMARY,
          },
          {
            role: "user",
            content: originalMessage,
          },
        ],
        temperature: 0.2,
      }),
    });

    const { choices } = (await res.json()) as OpenAIResponse;

    return choices[0].message.content;
  } catch (error) {
    throw new Error(
      `Could not properly get a human readable message from OpenAI with this originalMessage: ${originalMessage}`
    );
  }
};

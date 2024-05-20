"use server";

import { PROMPT_REFINE_PARAMS } from "../constants";
import { GetHomesParams, OpenAIResponse } from "../types";

export const getParams = async (
  searchQuery: string
): Promise<GetHomesParams> => {
  try {
    const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_PROJECT_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: PROMPT_REFINE_PARAMS,
          },
          {
            role: "user",
            content: searchQuery,
          },
        ],
        temperature: 0.2,
      }),
    });

    const { choices } = (await res.json()) as OpenAIResponse;
    const params = JSON.parse(choices[0].message.content) as GetHomesParams;
    params.home_type = "House";
    params.page = 1;

    return params;
  } catch (error) {
    throw new Error(
      `Could not properly get params from OpenAI with this searchQuery: ${searchQuery}`
    );
  }
};

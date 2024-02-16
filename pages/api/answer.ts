import { OpenAIStream } from "@/utils/answer";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { prompt, apiURL, apiKey } = (await req.json()) as {
      prompt: string;
      apiURL: string;
      apiKey: string;
    };

    const stream = await OpenAIStream(prompt, apiURL, apiKey);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;

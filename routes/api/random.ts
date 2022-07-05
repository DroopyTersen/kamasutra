import { HandlerContext } from "$fresh/server.ts";
import { generateRandomSexMove } from "../../generators/generators.ts";

export const handler = async (_req: Request, _ctx: HandlerContext) => {
  const body = await generateRandomSexMove();
  return new Response(body);
};

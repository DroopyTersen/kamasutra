/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { generateRandomSexMove } from "../generators/generators.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const name = await generateRandomSexMove();
    return ctx.render({ name });
  },
};

export default function Home({ data }: PageProps<{ name: string }>) {
  return (
    <div id="root">
      <link href="/styles.css" rel="stylesheet" />
      <div>
        <h1 class="move-name">{data.name}</h1>
        <form>
          <button>Again!</button>
        </form>
      </div>
    </div>
  );
}

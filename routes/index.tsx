/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { generateRandomSexMove, getRandom } from "../generators/generators.ts";
import GenerateButton, { sounds } from "../islands/GenerateButton.tsx";
export const handler: Handlers = {
  async GET(_, ctx) {
    const name = await generateRandomSexMove();
    return ctx.render({ name });
  },
};

export default function Home({ data }: PageProps<{ name: string }>) {
  return (
    <div id="root">
      {sounds.map((sound) => (
        <link rel="prefetch" href={`/sounds/${sound}`} />
      ))}
      <link href="/styles.css" rel="stylesheet" />
      <GenerateButton name={data.name}></GenerateButton>
    </div>
  );
}

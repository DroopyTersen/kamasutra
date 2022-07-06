/** @jsx h */
import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import { getRandom } from "../generators/generators.ts";

const buttonLabels = [
  "Hit me baby one more time!",
  "May I have another?",
  "Again!",
  "More!",
];
export const sounds = [
  "glug-b.mp3",
  "glug-b.mp3",
  "pop-down.mp3",
  "pop.mp3",
  "pop.mp3",
  "ooh.mp3",
  "man-moan.mp3",
  "karate.mp3",
  "creaky2.mp3",
];
// The target date is passed as a string instead of as a `Date`, because the
// props to island components need to be JSON (de)serializable.
export default function GenerateButton({ name }: { name: string }) {
  const [move, setMove] = useState(name);
  const [buttonLabel, setButtonLabel] = useState(() => getRandom(buttonLabels));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    audioRef.current = new Audio("/sounds/" + getRandom(sounds));
    audioRef.current.onended = () => {
      const sound = "/sounds/" + getRandom(sounds);
      (audioRef.current as any).src = sound;
    };
  }, []);
  return (
    <div class="main-layout">
      <h1 class="move-name">{move}</h1>
      {/* <form> */}
      <div style={{ width: "100%" }}>
        <button
          class="pushable"
          onClick={async () => {
            audioRef?.current?.play();

            const newMove = await fetch("/api/random").then((r) => r.text());
            setMove(newMove);
            setButtonLabel(getRandom(buttonLabels));
          }}
        >
          <span class="shadow"></span>
          <span class="edge"></span>
          <span class="front">{buttonLabel}</span>
        </button>
      </div>
      {/* </form> */}
    </div>
  );
}

const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
  const [isPlaying, setPlaying] = useState(false);

  const toggle = () => setPlaying(!isPlaying);

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [isPlaying, toggle];
};

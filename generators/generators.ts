type WordType = "adjectives" | "animals" | "food" | "verbs";

const getWords = async (wordType: WordType): Promise<string[]> => {
  const text = await Deno.readTextFile(`./resources/${wordType}.txt`);
  return text.split("\n").filter(Boolean);
};

const getRandomWord = async (wordType: WordType): Promise<string> => {
  const words = await getWords(wordType);
  return getRandom(words);
};

const adjectivePlusAnimal = async () => {
  const [adjective, noun] = await Promise.all([
    getRandomWord("adjectives"),
    getRandomWord("animals"),
  ]);
  return `The ${adjective} ${noun}`;
};

const gerundPlusFood = async () => {
  const [verb, noun] = await Promise.all([
    getRandomWord("verbs"),
    getRandomWord("food"),
  ]);
  return `${gerundize(verb)} the ${noun}`;
};

const gerundPlusAnimal = async () => {
  const [verb, noun] = await Promise.all([
    getRandomWord("verbs"),
    getRandomWord("animals"),
  ]);
  const gerund = gerundize(verb);
  const whereThe = getRandom(["first", "middle"]);
  return whereThe === "first"
    ? `The ${gerund} ${noun}`
    : `${gerund} the ${noun}`;
};

const generators = [
  gerundPlusAnimal,
  adjectivePlusAnimal,
  gerundPlusFood,
  gerundPlusAnimal,
];

export function getRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function gerundize(word: string) {
  if (word.match(/[^aeiou]e$/i)) {
    word = word.slice(0, word.length - 1);
  } else if (word.match(/[^aeiou][aeiou][^aeiou]$/i)) {
    word = word + word.slice(word.length - 1, word.length);
  }

  return word + "ing";
}

export const generateRandomSexMove = async (): Promise<string> => {
  const generator = getRandom(generators);
  return await generator();
};

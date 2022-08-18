const trimWords = (words: string) =>
  words
    .split(" ")
    .map((word) => word.trim())
    .join(" ");

export const cx = (...classNames: Array<string | undefined>) => {
  return classNames
    .filter(Boolean)
    .map((className) => trimWords(className!))
    .join(" ");
};

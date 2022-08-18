import { Color } from "./color";

export const returnFileSize = (number: number) => {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + "MB";
  }
};

export const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomColor = (): Color => {
  const colors: Color[] = [
    Color.Blue,
    Color.Green,
    Color.Red,
    Color.Purple,
    Color.Yellow,
    Color.Pink,
  ];
  return colors[random(0, colors.length)];
};

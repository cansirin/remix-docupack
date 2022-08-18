import { NextRouter } from "next/dist/client/router";

export const changeURLto = async (router: NextRouter, url: string) => {
  await router.push(url, undefined, { shallow: true });
};

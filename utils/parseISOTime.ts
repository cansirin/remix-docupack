import { formatDistance, parseISO } from "date-fns";

export const parseISOTime = (time: string): string => {
  const parsed = parseISO(time);
  return formatDistance(parsed, Date.now(), {
    addSuffix: true,
    includeSeconds: true,
  });
};

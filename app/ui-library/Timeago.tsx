import type { FC } from "react";
import { useEffect, useState } from "react";
import { formatTimeAgo } from "../../utils/format-time-ago";

export const Timeago: FC<{ date: Date }> = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState(formatTimeAgo(date));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeAgo(formatTimeAgo(date));
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return <>{timeAgo}</>;
};

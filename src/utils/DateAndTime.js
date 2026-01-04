export default function formatDateTime(unixTime, timezoneOffset) {
  const date = new Date((unixTime + timezoneOffset) * 1000);

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const fullDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return {
    time,
    day,
    date: fullDate,
  };
}

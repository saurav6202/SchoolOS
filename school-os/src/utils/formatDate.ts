export const today = new Intl.DateTimeFormat("en-GB").format(new Date());

export const formatDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/");

  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  return `${date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })} • ${date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;
};

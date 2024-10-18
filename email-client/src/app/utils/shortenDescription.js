export const shortenDescription = (description) => {
  const words = description.split(" ");
  if (words.length <= 6) {
    return description;
  }
  return words.slice(0, 6).join(" ") + " ...";
};

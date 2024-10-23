const capitalize = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const uppercase = (str) => {
  if (!str) return "";
  return str.toUpperCase();
};

export { capitalize, uppercase };

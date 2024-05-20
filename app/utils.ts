export const decodeHtmlEntities = (str: string): string => {
  if (!str || str === "") return str;

  const entities: { [key: string]: string } = {
    "&quot;": '"',
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&#39;": "'",
    "&reg;": "®",
  };

  return str.replace(
    /&quot;|&amp;|&lt;|&gt;|&reg;|&#39;/g,
    (match) => entities[match]
  );
};

export const createRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => start + idx);
};

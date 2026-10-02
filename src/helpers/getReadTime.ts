export const getReadTime = (content: unknown) => {
  return Math.max(2, Math.ceil(JSON.stringify(content ?? "").length / 850));
};

export const getImage = (url: String) => {
  return new URL(`/src/assets/images/${url}`, import.meta.url).href;
};

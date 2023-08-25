export const checkMoviePoster = (source: string) => {
  if (source === 'N/A' || source === '') {
    return 'https://via.placeholder.com/300x420?text=No+Poster';
  }
  return source;
};

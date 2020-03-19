export const getUrl = (url) => {
  url = url.split('/');
  return url[url.length - 2];

}
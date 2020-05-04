export const getUrl = (url) => {
  url = url.split('/');
  return url[url.length - 2];
}

export const changeHttpToHttps = (urls) => {
  return urls.map(url => url.replace("http", "https"))
}
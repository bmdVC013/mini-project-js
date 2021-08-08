export const getSearchTerm = () => {
  const rawSearchTerm = document.getElementById("search").value.trim();
  const regex = /[ ]{2,}/gi;
  const searchTerm = rawSearchTerm.replaceAll(regex, " ");
  return searchTerm;
};

export const retrieveSearchResults = async (searchTerm) => {
  const wikipediaSearchString = getWikipediaSearchString(searchTerm);
  const wikiSearchResults = await requestData(wikipediaSearchString);
  let resultArray = [];
  if (wikiSearchResults.hasOwnProperty("query")) {
    resultArray = processWikiResults(wikiSearchResults.query.pages);
  }
  return resultArray;
};

const getWikipediaSearchString = (searchTerm) => {
  const maxChars = getMaxChars();
  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
  const searchString = encodeURI(rawSearchString);
  return searchString
}

const getMaxChars = () => {
  const width = window.innerWidth || document.body.clientWidth;
  const SMALL_WIDTH = 414;
  const MEDIUM_WIDTH = 1400;
  if (width < SMALL_WIDTH) {
    return 65
  } else if (width < MEDIUM_WIDTH) {
    return 100;
  } else {
    return 130;
  }
}

const requestData = async (searchString) => {
  try {
    const response = await fetch(searchString);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

const processWikiResults = (results) => {
  return Object.values(results).map(item => ({
    id: item.pageid,
    title: item.title,
    image: item.hasOwnProperty("thumbnail") ? item.thumbnail: null,
    description: item.extract,
  }))
}
import { setSearchFocus, clearSearchText, clearPushListener, showClearTextButton } from "./search-bar.js";
import { deleteSearchResults, buildSearchResults, clearStatsLine, setStatsLine } from "./search-results.js";
import { getSearchTerm, retrieveSearchResults } from "./data-function.js";

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  // Set the focus
  setSearchFocus();
  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);
  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText)
  clear.addEventListener("keydown", clearPushListener);
  const form = document.getElementById("search-bar");
  form.addEventListener("submit", submitTheSearch);
};


// Procedural "workflow" function
const submitTheSearch = (event) => {
  event.preventDefault();
  deleteSearchResults();
  processTheSearch();
  setSearchFocus();
};

// Procedural
const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === "") return;
  const resultArray= await retrieveSearchResults(searchTerm);
  if (resultArray.length) {
    buildSearchResults(resultArray);
  }
  setStatsLine(resultArray.length);
};
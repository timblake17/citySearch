const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';   ///////cities.json API
const cities = [];////empty array for cities
fetch(endpoint)////////new api in browser that will return a promise
  .then(blob => blob.json())////blob is a parameter and the response comes with a method JSON to return json
  .then(data => cities.push(...data));////data is the parameters for the json response push into cities array/// data is a spread written in es6 which will spread our data into array
function findMatches(wordToMatch, cities) {//////takes in words to match and cities array
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');//////regex becomes whatever words are a match
    return place.city.match(regex) || place.state.match(regex)//////city match or state match in to regex
  });
}


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');///////puts commas in numbers , code taken from stack overflow
}

function displayMatches(){
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex  = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="h1"> ${this.value}</span>`); ////check city and put it in a span
    const stateName = place.state.replace(regex, `<span class="h1"> ${this.value}</span>`);///////will check the state and put it into a span
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join(''); ////map is going to try to return an array but join makes it a string
  suggestions.innerHTML = html;/////// the html const that map the place out of the array
}

const searchInput = document.querySelector('.search'); //////takes our value from searchbar
const suggestions = document.querySelector('.suggestions');/////puts the list of suggestions

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches); /////listens for keypress

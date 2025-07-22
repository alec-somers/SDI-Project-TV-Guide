// import Show from './show-info-page.js';

//Grab the selected show season that was passed from the form in show-info-page
const urlParams = new URLSearchParams(window.location.search);
const selectedSeason = urlParams.get('selected-season');
const showId = urlParams.get('showId');
console.log(selectedSeason);
console.log(showId);

//Fetch the specific season
fetch()

//Function for displaying the first five shows on the homepage
function displayTopTenShows(shows) {
  const topRatedShows = shows.filter( (show) => show.rating.average >= 8.8)
  for (let i = 0; i < topRatedShows.length; i++) {
    let showName = topRatedShows[i].name;
    let showSummary = topRatedShows[i].summary;
    let showId = topRatedShows[i].id;

    let newLi = document.createElement("li");
    newLi.innerHTML = `<a href="show-info-page.html?id=${showId}"><img class="show-image" src=${topRatedShows[i].image.medium} alt="${showName}"/></a>
    <div class="text-container"><p>Try ${showName}!</p>
    ${showSummary}</div>`;
    newLi.setAttribute("class", "top-show-item flex");
    document.querySelector(".show-list").appendChild(newLi);
  }
}

//Fetch for the top ten shows to display on the index homepage
fetch("https://api.tvmaze.com/shows")
  .then((showList) => showList.json())
  .then((jsonShowList) => {
    displayTopTenShows(jsonShowList);
  })
  .catch((error) => console.error(error));

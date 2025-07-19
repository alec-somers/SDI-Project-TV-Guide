const submitForm = document.querySelector(".main-form");
submitForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(event);
  console.log(document.querySelector(".searchbar").value);
});

//Function for displaying the first five shows on the homepage
function displayTopTenShows(shows) {
  const topRatedShows = shows.filter( (show) => show.rating.average >= 8.8)
  for (let i = 0; i < topRatedShows.length; i++) {
    let showName = topRatedShows[i].name;
    let showSummary = topRatedShows[i].summary;
    let newLi = document.createElement("li");
    newLi.innerHTML = `<img class="show-image" src=${topRatedShows[i].image.medium} alt="${showName}"/>
    <div class="text-container"><p>Try ${showName}!</p>
    ${showSummary}</div>`;
    newLi.setAttribute("class", "top-show-item flex");
    document.querySelector(".movie-list").appendChild(newLi);
  }
  console.log(topRatedShows);
}

//Fetch for the top ten shows to display on the index homepage
fetch("https://api.tvmaze.com/shows")
  .then((showList) => showList.json())
  .then((jsonShowList) => {
    displayTopTenShows(jsonShowList);
  })
  .catch((error) => console.error(error));

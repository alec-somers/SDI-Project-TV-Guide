function displayTopFiveShows(shows) {
  for (let i = 0; i < 5; i++) {
    let showName = shows[i].name;
    let newLi = document.createElement("li");
    newLi.innerHTML = `<img class="show-image" src=${shows[i].image.medium}></img><p>Try ${showName}!</p>`;
    newLi.setAttribute("class", "top-movies-item");
    document.querySelector(".movie-list").appendChild(newLi);
  }
}

fetch("https://api.tvmaze.com/shows")
  .then((showList) => showList.json())
  .then((jsonShowList) => {
    displayTopFiveShows(jsonShowList);
  })
  .catch((error) => console.error(error));

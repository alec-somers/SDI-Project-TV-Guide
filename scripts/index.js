const submitForm = document.querySelector(".main-form");
submitForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(event);
  console.log(document.querySelector(".searchbar").value);
});

function displayTopFiveShows(shows) {
  for (let i = 0; i < 5; i++) {
    let showName = shows[i].name;
    let showSummary = shows[i].summary;
    let newLi = document.createElement("li");
    newLi.innerHTML = `<img class="show-image" src=${shows[i].image.medium}></img>
    <div class="text-container"><p>Try ${showName}!</p>
    ${showSummary}</div>`;
    newLi.setAttribute("class", "top-show-item flex");
    document.querySelector(".movie-list").appendChild(newLi);
  }
}

fetch("https://api.tvmaze.com/shows")
  .then((showList) => showList.json())
  .then((jsonShowList) => {
    displayTopFiveShows(jsonShowList);
  })
  .catch((error) => console.error(error));

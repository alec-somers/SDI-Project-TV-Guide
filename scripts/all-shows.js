fetch("https://api.tvmaze.com/shows")
.then( result => result.json())
.then( shows => {
    //Order the array of shows in alphabetical order based of the name key value pain
    shows.sort((a, b) => a.name.localeCompare(b.name));
    displayShows(shows);
})

function displayShows(shows) {
    for (let i = 0; i < shows.length; i++) {
        let showName = shows[i].name;
        let showId = shows[i].id;

        let newLi = document.createElement("li");
        newLi.innerHTML = `<a href="show-info-page.html?id=${showId}"><img class="show-image" src=${shows[i].image.medium} alt="${showName}"/>`
        newLi.setAttribute("class", "search-item flex");
        document.querySelector(".search-list").appendChild(newLi);
    }
}
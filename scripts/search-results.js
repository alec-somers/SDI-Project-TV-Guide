const urlParams = new URLSearchParams(window.location.search);
const searchInput = urlParams.get('search-input');

//Start the fetch to use the API search algorithm
fetch(`https://api.tvmaze.com/search/shows?q=${searchInput}`)
    .then( result => result.json())
    .then( searchResults =>{
        displayShows(searchResults);

    })




function displayShows(shows) {
    for (let i = 0; i < shows.length; i++) {
        let showName = shows[i].show.name;
        let showId = shows[i].show.id;

        let newLi = document.createElement("li");
        newLi.innerHTML = `<a href="show-info-page.html?id=${showId}"><img class="show-image" src=${shows[i].show.image.medium} alt="${showName}"/>`
        newLi.setAttribute("class", "search-item flex");
        document.querySelector(".search-list").appendChild(newLi);
    }
}
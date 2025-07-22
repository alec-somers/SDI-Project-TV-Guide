//Grab the show id that is passed into the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const showId = urlParams.get('id');


export default class Show {
    constructor(showObject, castObjectsArray=[], crewObjectsArray=[]) {
        this.name = showObject.name;
        this.summary = showObject.summary;
        this.rating = showObject.rating.average;
        this.image = showObject.image.original;
        this.id = showObject.id;
        this.genres = showObject.genres;
        this.cast = castObjectsArray;
        this.crew = crewObjectsArray;

    }

    setCast(castObjectsArray) {
        this.cast = castObjectsArray;
    }

    setCrew(crewObjectsArray) {
        this.crew = crewObjectsArray;
    }

    displayShowInfo() {
        //set the image on display
        const imageContainer = document.querySelector(".main-image");
        imageContainer.setAttribute('src', this.image);
        imageContainer.setAttribute("alt", this.name);

        //set the genres on display
        const genreMessageContainer = document.querySelector('.genre-message');
        genreMessageContainer.innerText = this.genres.join(", ");

        //set the summary on display
        const summary = document.querySelector('.info-page-summary')
        //Get rid of the built-in <p> tags
        this.summary = this.summary.slice(3, this.summary.length - 4);
        summary.innerHTML = this.summary;

        //set the rating on display
        const ratingContainer = document.querySelector('.info-page-rating')
        ratingContainer.innerText = `${this.rating}/10`;

    }

    displayCastAndCrew() {
        const castAndCrewList = document.querySelector('.cast-and-crew-list');
        const creatorListItem = document.createElement("li")
        creatorListItem.setAttribute('class', 'info-page-list-item');
        creatorListItem.innerText = `Creator: ${this.crew[0].person.name}`

        //make and add the list item containing the stars of the show
        const starsListItem = document.createElement('li');
        starsListItem.setAttribute('class', 'info-page-list-item');
        starsListItem.innerText = `Starring: ${this.cast[0].person.name}`;

        //Add both to the html ul element
        castAndCrewList.appendChild(creatorListItem);
        castAndCrewList.appendChild(starsListItem);

    }

    //Fetches and displays the seasons list on the seasons.html page
    fetchSeasonsList() {

        //Start the fetch for the list of all season for this instance of Show
        fetch(`https://api.tvmaze.com/shows/${showId}/seasons`)
            .then( result => result.json())
            .then( seasons => {
                //Selecting the html element we want to put our seasons labels in
                const seasonsList = document.querySelector('.seasons-list');
                for(let i = 0; i < seasons.length; i++){
                    const newOption = document.createElement('option');
                    newOption.setAttribute('value', seasons[i].number)
                    newOption.innerText = "Season " + (i + 1);
                    seasonsList.appendChild(newOption);
                }


            })
    }
}


//Fetch the specific show from the API using the show's id
fetch(`https://api.tvmaze.com/shows/${showId}`)
    .then( result => result.json())
    .then( showObject => {

        //Allowing the image to display before the fetch for cast and crew is called
        const currentShow = new Show(showObject);
        currentShow.displayShowInfo();


        //Add event listener to seasons drop down menu that navigates the user to the new page with a display of all
        //episodes in that season. Had to put here for the currentShow object to be in scope
                const seasonsSelectMenu = document.querySelector('.seasons-list');
                seasonsSelectMenu.addEventListener("change", function(event) {
                    const params = new URLSearchParams();
                    params.append('showId', currentShow.id);
                    params.append('selected-season', event.target.value);
                    window.location.href = `seasons.html?${params.toString()}`;
                    event.preventDefault()

                });


        //Fetch the show's cast and crew. **Both cast and crew are different endpoints**
        fetch(`https://api.tvmaze.com/shows/${showId}/cast`)
            .then( response => response.json())
            .then( castObjects => {

                //Nested fetch to get the crew (director/writer at minimum)
                fetch(`https://api.tvmaze.com/shows/${showId}/crew`)
                    .then( response => response.json() )
                    .then( crewObjects => {
                        //Give our show object the cast and crew information
                        currentShow.setCast(castObjects);
                        currentShow.setCrew(crewObjects);

                        //Use the displayCastAndCrew function to put it onto our page
                        currentShow.displayCastAndCrew();

                        //Call the fetchSeasonsList function;
                        currentShow.fetchSeasonsList();
                    })
                    .catch(() => new Error("Could not fetch crew info"))
            })
            .catch( () => new Error("Could not fetch cast info"))

    })
    .catch( error => console.error(error));




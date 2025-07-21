//Grab the show id that is passed into the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const showId = urlParams.get('id');


class Show {
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

    }
}

//Fetch the specific show from the API using the show's id
fetch(`https://api.tvmaze.com/shows/${showId}`)
    .then( result => result.json())
    .then( showObject => {

        //Allowing the image to display before the fetch for cast and crew is called
        const currentShow = new Show(showObject);
        currentShow.displayShowInfo();

        //Fetch the show's cast and crew. **Both cast and crew are different endpoints**
        fetch(`https://api.tvmaze.com/shows/${showId}/cast`)
            .then( response => response.json())
            .then( castObjects => {

                //Nested fetch to get the crew (director/writer at minimum)
                fetch("https://api.tvmaze.com/shows/1/crew")
                    .then( response => response.json() )
                    .then( crewObjects => {
                        //Give our show object the cast and crew information
                        currentShow.setCast(castObjects);
                        currentShow.setCrew(crewObjects);



                    })
                    .catch(() => new Error("Could not fetch crew info"))
            })
            .catch( () => new Error("Could not fetch cast info"))

    })
    .catch( error => console.error(error));


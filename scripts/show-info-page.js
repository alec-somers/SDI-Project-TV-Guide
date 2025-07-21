
const urlParams = new URLSearchParams(window.location.search);
const showId = urlParams.get('id');
class Show {
    constructor(showObject) {
        this.name = showObject.name;
        this.summary = showObject.summary;
        this.rating = showObject.rating.average;
        this.image = showObject.image.original;
        this.id = showObject.id;
        this.genres = showObject.genres;

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

    displayCast() {

    }
}

//Fetch the specific show from the API using the show's id
fetch(`https://api.tvmaze.com/shows/${showId}`)
    .then( result => result.json())
    .then( showObject => {
        let show = new Show(showObject);
        show.displayShowInfo();
    })
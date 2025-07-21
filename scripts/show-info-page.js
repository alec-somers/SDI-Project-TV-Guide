
const urlParams = new URLSearchParams(window.location.search);
const showId = urlParams.get('id');
class Show {
    constructor(showObject) {
        this.name = showObject.name;
        this.summary = showObject.summary;
        this.rating = showObject.rating.average;
        this.image = showObject.image.original;
        this.id = showObject.id;

    }

    static displayShowInfo(show) {
        //set the image on display
        const imageContainer = document.querySelector(".main-image");
        imageContainer.setAttribute('src', show.image);
        imageContainer.setAttribute("alt", show.name);

        //set the summary on display
        const summary = document.querySelector('.info-page-summary')
        //Get rid of the built-in <p> tags
        show.summary = show.summary.slice(3, show.summary.length - 4);
        summary.innerHTML = show.summary;

        //set the rating on display
        const ratingContainer = document.querySelector('.info-page-rating')
        ratingContainer.innerText = `${show.rating} out of 10`;

    }
}

fetch(`https://api.tvmaze.com/shows/${showId}`)
    .then( result => result.json())
    .then( jsonResult => {
        let show = new Show(jsonResult);
        Show.displayShowInfo(show);
    })
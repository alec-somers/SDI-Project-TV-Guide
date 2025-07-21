
const urlParams = new URLSearchParams(window.location.search);
const showId = urlParams.get('id');
class Show {
    constructor(showObject) {
        this.name = showObject.name;
        this.summary = showObject.summary;
        this.rating = showObject.rating;
        this.image = showObject.image.original;
        this.id = showObject.id;

    }

    static displayShowInfo(show) {
        const mainContainer = document.querySelector('main');
        const newImage = document.createElement('img');
        newImage.setAttribute('src', show.image);
        newImage.setAttribute('class', 'main-image')
        mainContainer.appendChild(newImage);
    }
}

fetch(`https://api.tvmaze.com/shows/${showId}`)
    .then( result => result.json())
    .then( jsonResult => {
        let show = new Show(jsonResult);
        Show.displayShowInfo(show);
    })
//Getting the show id that was passed from clicking a show on the index.html page
document.addEventListener('DOMContentLoaded', function () {
    //Get show ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    let showId = urlParams.get('id');


    fetch(`https://api.tvmaze.com/shows/${showId}`)
        .then( result => result.json())
        .then( jsonResult => {
            let show = new Show(jsonResult);
            show.displayShowInfo();
        })
})


class Show {
    constructor(showObject) {
        this.name = showObject.name;
        this.summary = showObject.summary;
        this.rating = showObject.rating;
        this.image = showObject.image.medium;
        this.id = showObject.id;

    }

    displayShowInfo() {
        const mainContainer = document.querySelector('main');
        const newImage = document.createElement('img');
        newImage.setAttribute('src', this.image);
        mainContainer.appendChild(newImage);
    }
}

